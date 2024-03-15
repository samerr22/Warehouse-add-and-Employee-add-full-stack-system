import mongoose from 'mongoose';



const EmployeeSchema = new mongoose.Schema({
    
    WareHouseId: {
        type: String,
        required: true,
    },
    
    EName: {
        type: String,
        required: true,
    },
    EId: {
        type: String,
        required: true
    },
    
    Econtact: {
        type: Number,
        required: true,
    },
   
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
