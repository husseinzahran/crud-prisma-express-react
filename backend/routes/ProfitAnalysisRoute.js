import express from 'express'
import { getProfitAnalysis } from '../controller/ProfitAnalysisController.js'

const router = express.Router()

router.get('/profitanalysis', getProfitAnalysis)


export default router
