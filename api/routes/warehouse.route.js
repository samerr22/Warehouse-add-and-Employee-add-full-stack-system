import  express  from "express";

import { Ecreate, Edeletehouse, Egetwarehouse, create,   deletehouse,   getwarehouse,    updatehouse } from "../controllers/warehouse.controller.js";
import { verifyToken } from "../utils/Verifytoken.js";

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/gethouse', getwarehouse);
router.delete('/deletehouse/:houseId',verifyToken,  deletehouse);
router.put('/updatehouse/:houseId',verifyToken, updatehouse);
router.post('/Ecreate', Ecreate);
router.get('/gethouse/:WareHouseId',verifyToken, Egetwarehouse);
router.delete('/deletemp/:EmployeeId',verifyToken,  Edeletehouse);


export default router;