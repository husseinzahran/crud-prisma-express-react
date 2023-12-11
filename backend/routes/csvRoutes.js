// csvRoutes.js
import express from 'express'
import {uploadCsv} from  '../controller/csvController.js'
const router = express.Router();


router.post('/upload-csv', uploadCsv);

export default router;
