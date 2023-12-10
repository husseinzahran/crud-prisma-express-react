import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ProductRoute from './routes/ProductRoute.js'
import ProfitAnalysisRoute from './routes/ProfitAnalysisRoute.js'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

// app.use(cors({
//     origin: '*', // Specific origin
//     methods: 'GET,POST,PUT,DELETE', // Allowed methods
//     credentials: true // Allow credentials (cookies, authentication)
//   }))
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(ProductRoute)
app.use(ProfitAnalysisRoute)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

export default app
