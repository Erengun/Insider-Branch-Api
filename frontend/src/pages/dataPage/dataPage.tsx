/**
 * branch_id : string,
 * name : string,
 * full_address : string,
 * latitude : float,
 * longtitude : float,
 * phone : string,
 * 
 */


const DataPage: React.FC = () => {
  return (
    <>
      <div className="w-full h-[100svh] bg-[#222222] flex justify-center items-center">
        <div className="w-11/12 h-5/6 border border-white rounded-md overflow-scroll relative">
          <div className={`grid grid-cols-[5%_10%_30%_10%_10%_20%_15%] w-full h-16 sticky top-0 left-0 rounded-t-md`}>
            <div className="border border-white flex justify-center items-center uppercase text-white">ID</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">Name</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">Address</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">Latitude</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">Longtitude</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">PHONE</div>
            <div className="border border-white flex justify-center items-center uppercase text-white">EDIT</div>
          </div>
          {
            Array(40).fill("").map((item, index) => (
              <>
                <div className={` grid grid-cols-[5%_10%_30%_10%_10%_20%_15%] w-full h-16 ${index % 2 == 0 ? 'bg-[#444444]' : ''}`}>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                  <div className="border border-white flex justify-center items-center text-white">{index}</div>
                </div>
              </>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default DataPage