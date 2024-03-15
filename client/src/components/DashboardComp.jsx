import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function DashUsers() {
  
  const [Employe, setEmploye] = useState([]);
  const [house, sethouse] = useState([]);
  const [warehouseId, setwarehouseId] = useState("");
  const [showCheckoutPopup, setShowCheckoutPopup] = useState({});
  const [filterewareHouse, setfilterewareHouse] = useState([]);
  const [query, setQuery] = useState(" ");
 
  

  console.log("house",house)
  
  
 


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
  
//get ware house
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

 
//delete warehouse
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `/api/warehouse/deletehouse/${warehouseId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        sethouse((prev) =>
          prev.filter((hous) => hous._id !== warehouseId)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add cart popup window
  const handleCheckout = (id) => {
    setShowCheckoutPopup((prev) => ({
      ...prev,
      [id]: true
    }));
    setwarehouseId(id);
  };



  //cart popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup({});
  };



//report 
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
  
    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, 'House Details:');
    yPos += 10;
  
    house.forEach((hous) => {
      doc.setFontSize(12);
    doc.text(20, yPos, `Warehouse ID: ${hous._id}`); 
    doc.text(20, yPos + 5, `Warehouse Name: ${hous.Hname}`);
    doc.text(20, yPos + 10, `Location: ${hous.Hlocation}`);
    doc.text(20, yPos + 15, `Contact Number: ${hous.Hcontact}`);
    doc.line(10, 40, 100, 40);
    yPos += 25;

    



    });
  
    
  
    // Save the PDF
    doc.save('warehouse_employees.pdf');
  };


 

//search funtion 
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilterewareHouse([...house]);
    } else {
      // If there's a query, filter the data
      const filteredData = house.filter(
        (hous) =>
          hous.Hname &&
          hous.Hname.toLowerCase().includes(query.toLowerCase())
      );
      setfilterewareHouse(filteredData);
    }
  }, [query, house]);
  
  

  return (
   
   <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     <div className="ml-8 mt-7 flex justify-center items-center">
        <form>
          <input
            type='text'
            placeholder='Search... '
            className=" w-[200px=] h-6"
            onChange={(e) => setQuery(e.target.value)}

          />
        </form>
        <button >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {house && house.length > 0 ? (
        <>
          <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  WareHose 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Add Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Download
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Edit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">



             {filterewareHouse.length > 0 ? 
               filterewareHouse.map((hous) => (
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


                  <td className="px-6 py-4 whitespace-nowrap">
                  
                  
                    <span
                     
                      
                      className="text-red-500 hover:underline cursor-pointer"
                      onClick={() => handleCheckout(hous._id)}
                    >
                      Add New member
                    </span>

                    

                    
                      
                    {showCheckoutPopup[hous._id] && (
                      <AddEmployee Id={warehouseId}  Details={Employe} onClose={handleClosePopup} />
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                  <button className="hover:underline cursor-pointer " onClick={generatePDF}>Download PDF</button>
                    </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">


                    
                    <Link
                      to={`/update-warehous/${hous._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => {
                        
                        handleDeleteUser();
                        setwarehouseId(hous._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
             
             :
             <>
             <p>No WareHose</p>
             
             </>
             }



            
  
 

            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}