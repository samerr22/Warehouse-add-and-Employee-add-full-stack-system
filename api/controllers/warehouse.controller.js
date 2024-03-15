
import Employee from "../models/Employee.model.js";
import warehouse from "../models/warehouse.model.js";
import { errorHandle } from "../utils/error.js";



//add warehouse
export const create = async (req, res, next) => {
 

  const { Hname,image,Hlocation,Hcontact } = req.body;

  if (!/^\d{10}$/.test(Hcontact)) {
    return res.status(400).json({ message: 'Phone number must be 10 digits long.' });
}

  const newhouse = new warehouse({
    Hname,
    image,
    Hlocation,
    Hcontact,
  });
  try {
    const savedhouse = await newhouse.save();
    res.status(201).json(savedhouse);
  } catch (error) {
    next(error);
  }
};

//get warehouse
export const getwarehouse = async (req, res, next) => {
  try {
    

      const house = await warehouse.find();

      if (house.length > 0) {
        res.json({
          message: "house details retrieved successfully",
          house,
        });
      } else {
        return next(errorHandle(404, " house not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};


//delete warehouse
export const deletehouse = async (req, res, next) => {
  
  try {
    await warehouse.findByIdAndDelete(req.params.houseId);
    res.status(200).json("The house has been deleted");
  } catch (error) {
    next(error);
  }
};


//update warehouse
export const updatehouse = async (req, res, next) => {
  
  try {
    const updatehouse = await warehouse.findByIdAndUpdate(
      req.params.houseId,
      {
        $set: {
          Hname: req.body.Hname,
          image: req.body.image,
          Hlocation: req.body.Hlocation,
          Hcontact: req.body.Hcontact,
        },
      },
      { new: true }
    );
    res.status(200).json(updatehouse);
  } catch (error) {
    next(error);
  }
};



//create Employe
export const Ecreate = async (req, res, next) => {
 

  const { EName,EId, Econtact,WareHouseId } = req.body;

  const newEmploye = new Employee({
    EName,
    EId,
    Econtact,
    WareHouseId
  });
  try {
    const savedEmploye = await newEmploye.save();
    res.status(201).json(savedEmploye);
  } catch (error) {
    next(error);
  }
};

//getEmploye
export const Egetwarehouse = async (req, res, next) => {
  try {
    

    const {  WareHouseId } = req.params;
      console.log(WareHouseId)

      const Employe = await Employee.find({ WareHouseId });

      if (Employe.length > 0) {
        res.json({
          message: "Employe details retrieved successfully",
         Employe
        });
      } else {
        return next(errorHandle(404, " house not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};


//remove Employe
export const Edeletehouse = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.EmployeeId);
    
    if (!deletedEmployee) {
      // If the employee with the provided ID is not found, return an error response
      return res.status(404).json({ error: 'Employee not found' });
    }

    // If the employee is successfully deleted, return a success response
    res.status(200).json({ message: 'The Employee has been deleted' });
  } catch (error) {
    // If an error occurs during the deletion process, pass it to the error handler middleware
    next(error);
  }
};



