import { useEffect, useState } from "react";


export default function DashUsers() {
  
  const [house, sethouse] = useState([]);
  const [warehouseId, setwarehouseId] = useState("");
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [Employe, setEmploye] = useState([]);
  
  console.log( "sameera",house)


  //get all ware house 
  useEffect(() => {
    const fetchouse  = async () => {
      try {
        const res = await fetch(`/api/warehouse/gethouse`);
        const data = await res.json();

        
        
        if (res.ok) {
          sethouse(data.house);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchouse();
  }, []);

   

  const WareHouseId = warehouseId ? warehouseId : null;
//Employe display useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/warehouse/gethouse/${WareHouseId}`);
        const data = await response.json();
        console.log(data)

        




        if (response.ok) {
          setEmploye(data.Employe);

          

        } else {
          setEmploye([]); 
         
          
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [WareHouseId]);


 





  //add popup window
  const handleCheckout = (id) => {
    setShowCheckoutPopup((prev) => ({
      ...prev,
      [id]: true
    }));
    setwarehouseId(id);
  };



  // popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup(false);
  };


  return (
    <div>
     <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {house && house.length > 0 ? (
        <>
           <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ware hose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Check
                </th>
               
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {house.map((hous) => (
                <tr
                  key={hous._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{hous.Hname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hous.Hlocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={hous.image}
                      alt={hous.Hname}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{hous.Hcontact}</td>

                  <button className="px-6 py-4 whitespace-nowrap" 
                   onClick={() => handleCheckout(hous._id)}
                  >show Employe</button>

                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>

    {showCheckoutPopup && (
      <div>
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 shadow-lg rounded-lg p-4 text-white z-50">
          <div className="overflow-y-auto max-h-[350px]">
            {/* Popup window content */}
            {Employe.map((detail, index) => (
              <div className=" gap-6" key={index}>
                <p>ID: {detail.EId}</p>
                <p>Name: {detail.EName}</p>
                <p>Phone Number: {detail.Econtact}</p>
                <hr className='bg-white w-full' />
                
              </div>
            ))}
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-16" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      </div>
    )}
   
   




    </div>
  );
}
