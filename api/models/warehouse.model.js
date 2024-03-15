import mongoose from 'mongoose';



const warehouseSchema = new mongoose.Schema({
    Hname: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    Hlocation: {
        type: String,
        required: true,
    },
    Hcontact: {
        type: Number,
        required: true,
    },
   
});

const warehouse = mongoose.model('warehouse', warehouseSchema);

export default warehouse;
