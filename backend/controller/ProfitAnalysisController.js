import { PrismaClient } from '@prisma/client'
import Cors from 'cors';
import { parse, format } from 'date-fns';
//import initMiddleware from 'lib/init-middleware';

const prisma = new PrismaClient()

// export const getProfitAnalysis = async (req, res) => {
//     try {
//         const response = await prisma.product.findMany()
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(500).json({ msg: error.message })
//     }
// }


// // Initialize the cors middleware
// const cors = initMiddleware(
//   Cors({
//     // Options here: For example, allowing all origins:
//     origin: '*',
//     methods: ['GET', 'POST', 'OPTIONS'],
//   })
// );


export const getProfitAnalysis = async (req, res) =>  {
  //await cors(req, res);

  if (req.method === 'GET') {
    let { start_date, end_date } = req.query;

    // Adjust the format of start_date and end_date
    if (start_date) {
      const parsedStartDate = parse(start_date, 'MM/dd/yyyy', new Date());
      start_date = format(parsedStartDate, 'yyyy-MM-dd');
    }

    if (end_date) {
      const parsedEndDate = parse(end_date, 'MM/dd/yyyy', new Date());
      end_date = format(parsedEndDate, 'yyyy-MM-dd');
    }

    try {
      const data = await prisma.dailyProfit.findMany({
        where: {
          order_date_formatted: {
            gte: new Date(start_date).toISOString(),
            lte: new Date(end_date).toISOString()
          }
        }
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle other HTTP methods or return an error if they're not supported
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
