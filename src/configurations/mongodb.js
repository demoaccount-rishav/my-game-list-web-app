import { MongoClient } from "mongodb";

// const url = `mongodb://127.0.0.1:27017/temp_db`
const url = `mongodb+srv://rishavbhowmick2002va:nz4vxxXr72OlwspY@cluster0.jzkbztw.mongodb.net/`

var client;

export function connectToMongoDB() {
    MongoClient.connect(url)
    .then((clientInstance) => {
        client = clientInstance;
        console.log('Connected To MongoDB');
    }).catch((error) => {
        console.log("Error in connecting to MongoDB");
    })
}

export function getDB() {
    return client.db('temp_db');
}