
import {  useState } from 'react';

import jsPDF from 'jspdf';


const AddEmployee = ({ Id, Details, onClose }) => {

  const [formData, setFormData] = useState({});
  console.log(formData)
  const [errorMessage, setErrorMessage] = useState(null);
  const [EmpId, setEmpId] = useState("");
  console.log("  id",EmpId)

  console.log("Details", Details?.length);
  

 
 
  
 
  
  console.log("id", Id)


 




  //get chang every input valu
  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

//add employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {


      const allDetails = {
        ...formData,
        WareHouseId: Id
      }
      

      const res = await fetch("/api/warehouse/Ecreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allDetails),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      
      if(res.ok){
        setErrorMessage(false);
        console.log("success")
        onClose();
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage(error.message);
      
    }
  };
  

//add delete 
  const handleDeleteUser = async (empId) => {
    try {
      const res = await fetch(
        `/api/warehouse/deletemp/${empId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        onClose();
        window.location.reload();
       console.log("success")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

//report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
  
    
  
    // Add Employe details to PDF
    yPos += 10;
    doc.setFontSize(16);
    doc.text(20, yPos, 'Employee Details:');
    yPos += 10;
  
    Details.forEach((detail) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `EmployeeID: ${detail.EId}`);
      doc.text(20, yPos + 5, `Name: ${detail.EName}`);
      doc.text(20, yPos + 10, `Contact: ${detail.Econtact}`);
      yPos += 20;
    });
  
    // Save the PDF
    doc.save('warehouse_employees.pdf');
  };
  





  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>


     
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 shadow-lg rounded-lg p-4 text-white  z-50">
          <div className="overflow-y-auto max-h-[350px]">
          
            <div className="mb-4">
              
            <form  onSubmit={handleSubmit}>
              <div className='mt-4  '>

                <input
                  className=" bg-slate-100  text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="Name"
                  id="EName"
                  onChange={handlchange}

                />
                </div>

                
                <div className='mt-4  '>
                <input
                  className=" bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="Id"
                  id="EId"
                  onChange={handlchange}

                />
                </div>
                <div className='mt-4  '>
                <input
                  className=" bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="Phone Number"
                  id="Econtact"
                  onChange={handlchange}

                />
                </div>

                 <div className='flex justify-center items-center gap-6 '>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                submit
              </button>
              <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Close
              </button>

            </div>
            </form>


            
            <button onClick={generatePDF}>Download PDF</button>

                </div>
                {Details.map((detail, index) => (
        <div className='flext gap-6' key={index}>
         
            {/* Render each detail here */}
         
          <p>ID: {detail.EId}</p>
          <p>Name: {detail.EName}</p>
          <p>Phone Number: {detail.Econtact}</p>


         
          <button type='Delete' className='ml-80' 
         
                        
            onClick={() => {
              handleDeleteUser(detail._id); // Pass detail._id directly
            }}
          
          >Delete</button>
          <hr className='bg-white w-full' />

          
          
          
        </div>
      ))}



              

            </div>
          </div>

          <div className=' text-center'>


            
           
            
            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center " >
                {errorMessage}
              </p>
            )}

          </div>

        </div>
       

        
     

      
      
     

   
  );
};

export default AddEmployee;
