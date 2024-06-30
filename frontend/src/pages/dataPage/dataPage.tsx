import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeData } from '../../redux/dataSlice';
import { RootState } from '../../redux/store';

type BranchData = {
  id: string;
  name: string;
  full_address: string;
  latitude: number;
  longitude: number;
  phone: string;
};

const DataPage: React.FC = () => {
  const dataSlice = useSelector((state: RootState) => state.dataSlice);
  const dispatch = useDispatch();
  const [login, setLogin] = React.useState<boolean>(false);
  const [data, setData] = useState<BranchData[]>(dataSlice);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.table(dataSlice);
    setData(dataSlice);
    setLogin(true);
  }, [dataSlice]);


  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleSave = async () => {
    const branch = data[editIndex as number]
    console.log(branch, " ", editIndex)
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE}/branches/${branch.id}`, branch, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        },
        validateStatus(status) {
          return status == 200
        },
      })
      dispatch(changeData(data));
    } catch (e) {
      setData(dataSlice);
      console.error(`Error While Save Data => ${e}`)
    } finally {
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setData(dataSlice);
    setEditIndex(null);
  };

  const handleChange = (index: number, field: keyof BranchData, value: string | number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  useEffect(() => {
    console.table(data);
  }, [data]);

  React.useEffect(() => {

    if (!localStorage.getItem('access-token')){
      navigate('/');
    }

    const fn = async () => {
      await axios.get(`${import.meta.env.VITE_API_BASE}/branches`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        }
      }).then(response => {
        dispatch(changeData(response.data));
      })
    }

    try {
      fn();
    } catch (e){
      console.error(`Error While Page Opening => ${e}`);
      navigate('/');
    }
  }, [])

  return (
    <div className="w-full h-[100svh] bg-[#222222] flex justify-center items-center relative">
      <button
              onClick={() => {
                localStorage.removeItem('access-token')
                localStorage.removeItem('role');
                navigate('/');
              }}
              className='border border-white px-8 py-2 rounded-md absolute top-0 right-0 text-white'> LOGOUT</button>
      {
        (login) &&
        <div className="w-11/12 h-5/6 border border-white rounded-md overflow-scroll relative">
          <div className={`grid ${localStorage.getItem('role') == 'OWNER' ? 'grid-cols-[5%_10%_30%_10%_10%_20%_15%]' : 'grid-cols-[5%_10%_30%_10%_10%_auto]'} w-full h-16 sticky top-0 left-0 rounded-t-md bg-[#222222] border-b border-white`}>
            {['ID', 'Name', 'Address', 'Latitude', 'longitude', 'Phone', localStorage.getItem('role') == 'OWNER' ? 'Edit' : undefined].map((header, index) => (
              header ?
                <div key={index} className={`flex justify-center items-center uppercase text-white ${index % 2 === 0 ? 'bg-[#444444]' : ''}`}>
                  {header}
                </div> : undefined
            ))}
          </div>
          {data.map((item, index) => (
            <div key={index} className={`grid ${localStorage.getItem('role') == 'OWNER' ? 'grid-cols-[5%_10%_30%_10%_10%_20%_15%]' : 'grid-cols-[5%_10%_30%_10%_10%_auto]'} w-full h-16 ${index % 2 === 0 ? 'bg-[#444444]' : ''}`}>
              <div className="flex justify-center items-center text-white">{index}</div>
              {['name', 'full_address', 'latitude', 'longitude', 'phone'].map((field, i) => (
                <div key={i} className="flex justify-center items-center text-white">
                  {editIndex === index ? (
                    <input
                      type={field === 'latitude' || field === 'longitude' ? 'number' : 'text'}
                      value={item[field as keyof BranchData]}
                      onChange={(e) => handleChange(index, field as keyof BranchData, field === 'latitude' || field === 'longitude' ? parseFloat(e.target.value) : e.target.value)}
                      className="w-full bg-transparent text-white p-3 rounded-lg border border-white/30 outline-none focus:border-white/60 text-center"
                    />
                  ) : (
                    item[field as keyof BranchData]
                  )}
                </div>
              ))}
              {
                localStorage.getItem('role') == 'OWNER' ?
                  <div className="flex justify-center items-center text-white gap-x-2">
                    {editIndex === index ? (
                      <div className="flex flex-col gap-2">
                        <button onClick={handleSave} className="text-green-500">Save</button>
                        <button onClick={handleCancel} className="text-red-500">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => handleEdit(index)} className="text-blue-500">Edit</button>
                    )}
                  </div>
                  : <></>
              }
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default DataPage;