import express from 'express';
import { env } from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';
import mongoose from 'mongoose';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                status: 400,
                message: `Invalid contact ID: ${contactId}`,
            });
        }

        const contact = await getContactById(contactId);

        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: `Contact with id ${contactId} not found`,
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });
    });

    app.use('*', (req, res) => {
        res.status(404).json({ message: 'Not found' });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
