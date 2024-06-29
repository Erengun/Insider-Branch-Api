import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeData } from '../../redux/dataSlice';
import { RootState } from '../../redux/store';

type BranchData = {
  branch_id: string;
  name: string;
  full_address: string;
  latitude: number;
  longtitude: number;
  phone: string;
};

const DataPage: React.FC = () => {
  const dataSlice = useSelector((state: RootState) => state.dataSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    console.table(dataSlice);
  }, [dataSlice]);

  const [data, setData] = useState<BranchData[]>(dataSlice);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleSave = () => {
    dispatch(changeData(data));
    setEditIndex(null);
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

  return (
    <div className="w-full h-[100svh] bg-[#222222] flex justify-center items-center">
      <div className="w-11/12 h-5/6 border border-white rounded-md overflow-scroll relative">
        <div className="grid grid-cols-[5%_10%_30%_10%_10%_20%_15%] w-full h-16 sticky top-0 left-0 rounded-t-md bg-[#222222] border-b border-white">
          {['ID', 'Name', 'Address', 'Latitude', 'Longtitude', 'Phone', 'Edit'].map((header, index) => (
            <div key={index} className={`flex justify-center items-center uppercase text-white ${index % 2 === 0 ? 'bg-[#444444]' : ''}`}>
              {header}
            </div>
          ))}
        </div>
        {data.map((item, index) => (
          <div key={index} className={`grid grid-cols-[5%_10%_30%_10%_10%_20%_15%] w-full h-16 ${index % 2 === 0 ? 'bg-[#444444]' : ''}`}>
            <div className="flex justify-center items-center text-white">{index}</div>
            {['name', 'full_address', 'latitude', 'longtitude', 'phone'].map((field, i) => (
              <div key={i} className="flex justify-center items-center text-white">
                {editIndex === index ? (
                  <input
                    type={field === 'latitude' || field === 'longtitude' ? 'number' : 'text'}
                    value={item[field as keyof BranchData]}
                    onChange={(e) => handleChange(index, field as keyof BranchData, field === 'latitude' || field === 'longtitude' ? parseFloat(e.target.value) : e.target.value)}
                    className="w-full bg-transparent text-white p-3 rounded-lg border border-white/30 outline-none focus:border-white/60"
                  />
                ) : (
                  item[field as keyof BranchData]
                )}
              </div>
            ))}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataPage;