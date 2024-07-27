import env from 'dotenv';
env.config();

import mongoose from 'mongoose';

import app from './app'

const PORT = process.env.EXPRESS_SERVER_PORT || 5000;

const MongoDBURL: string = `${process.env.MONGO_DATABASE_URI}/${process.env.MONGO_DATABASE_NAME}`;

(async () => {
        try {
            await mongoose.connect(MongoDBURL);
            console.log(`Connected to MongoDB: ${MongoDBURL}`);
            app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
        } catch(err) {
            console.log(err)
        }
})();