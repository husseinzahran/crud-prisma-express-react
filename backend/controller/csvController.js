// csvController.js
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });



export const uploadCsv = async (req, res) => {
    if (!req.file) {
        console.log(req.file)
        return res.status(400).send('No file uploaded.');
    }

    const fileRows = [];

    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
            fileRows.push(row);
        })
        .on('end', async () => {
            try {
                for (const row of fileRows) {
                    await prisma.qp_orders_full.create({
                        data: {
                            id: parseInt(row.id),
                            serial: parseInt(row.serial),
                            full_name: row['full name'],
                            phone: row.phone,
                            address: row.address,
                            total_amount: parseFloat(row['total amount']),
                            total_fees: parseFloat(row['total fees']),
                            cod: convertToBoolean(row.COD),
                            collected: convertToBoolean(row.Collected),
                            returned: convertToBoolean(row.Returned),
                            notes: row.notes,
                            order_date: row['order date'],
                            shipment_contents: row['shipment contents'],
                            weight: parseFloat(row.weight),
                            city: row.city,
                            status: row.status,
                            status_note: row['status note']
                        }
                    });
                }

                fs.unlinkSync(req.file.path); // Delete the file after processing
                res.send('CSV file successfully processed and data inserted into the database.');
            } catch (error) {
                console.error('Error inserting data into the database:', error);
                res.status(500).send('Error processing CSV file');
            }
        });
};


