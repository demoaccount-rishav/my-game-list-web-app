import { getDB } from "../configurations/mongodb.js";
import uniqid from 'uniqid';
import { unlink, unlinkSync } from 'node:fs';
import { resolve } from "node:path";



export default class ProductModel {
    constructor(id, name, desc, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    static async getAll() {
        try {
            // Get the database
            const db = await getDB();

            // create collection
            const collection = db.collection("inventory");

            // Insert the document.
            const res = await collection.find({}).toArray();
            return res;

        } catch (error) {
            console.log("*****Could Not Find Data*****");
        }

        // return products;
    }

    static async add(name, desc, price, imageUrl) {
        // const { name, desc, price, imageUrl } = productObj;
        try {
            // Get the database
            const db = await getDB();

            // create collection
            const collection = db.collection("inventory");

            // Insert the document.
            await collection.insertOne({ "uid": uniqid(), "name": name, "desc": desc, "price": price, "imageUrl": imageUrl })

        } catch (error) {
            console.log("*****Could Not Enter Data*****");
        }


        // products.push(new ProductModel(products.length + 1, name, desc, price, imageUrl));
    }

    // static async update(newUid, newName, desc, price, imageUrl) {
    //     // const index = products.findIndex((p) => p.id == id);
    //     // products[index] = new ProductModel(id, name, desc, price, imageUrl);

    //     try {
    //         // Get the database
    //         const db = getDB();

    //         // create collection
    //         const collection = db.collection("inventory");


    //         // Insert the document.
    //         await collection.updateOne({ uid: newUid }, { $set: { name: newName } })

    //     } catch (error) {
    //         console.log("*****Could Not Update Data*****");
    //     }
    // }

    static async update(uid, name, desc, price, imageUrl) {
        try {
            const database = getDB();
            const collection = database.collection("inventory");
            // create a filter for a movie to update
            const filter = { uid: uid };
            // this option instructs the method to create a document if no documents match the filter
            const options = {};
            // create a document that sets the plot of the movie
            const updateDoc = {
                $set: {
                    name: name,
                    uid: uid,
                    name: name,
                    desc: desc,
                    price: price,
                    imageUrl: imageUrl,
                },
            };
            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
        } catch (err) {
            console.log("*****Error Encountered while updating data*****");
        }
    }

    static async delete(uid) {
        // const index = products.findIndex((p) => p.id == id);
        // products.splice(index, 1);

        try {
            const database = getDB();
            const collection = database.collection("inventory");
            const filter = { uid: uid };

            const removeObj = await collection.findOne({ "uid": uid });
            const removePath = resolve('public', `${removeObj.imageUrl}`)

            unlink(removePath, (err) => {
                if (err) throw err;
                console.log(`Image deleted: ${removeObj.imageUrl}`);
            });

            const result = await collection.deleteOne(filter);

        } catch (err) {
            console.log("*****Error Encountered while updating data*****");
        }
    }



    static async getById(uid) {
        // return products.find((p) => p.id == id);
        try {
            // Get the database
            const db = await getDB();

            // create collection
            const collection = db.collection("inventory");

            // Insert the document.
            const res = await collection.findOne({ "uid": uid });
            return res;

        } catch (error) {
            console.log("***** Could Not Get By ID *****");
        }

    }
}

var products = [
    new ProductModel(
        1,
        'Grand Theft Auto VI',
        'Grand Theft Auto VI is an upcoming video game in development by Rockstar Games. It is due to be the eighth main Grand Theft Auto game, following Grand Theft Auto V, and the sixteenth entry overall.',
        1499,
        'https://s2-techtudo.glbimg.com/k7wz9rttItbgkatEoZ4FCKi1XII=/1361x46:2473x2030/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/9/Z/xFJps3QNqlUKAEONgRiQ/gta6.jpg'
    ),
    new ProductModel(
        2,
        'Grand Theft Auto: Vice City',
        "Grand Theft Auto: Vice City is a 2002 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the fourth main game in the Grand Theft Auto series, following 2001's Grand Theft Auto III, and the sixth entry overall",
        49,
        'https://m.media-amazon.com/images/I/81ralwlkisL.jpg'
    ),
    new ProductModel(
        3,
        'Grand Theft Auto: San Andreas',
        "Grand Theft Auto: San Andreas is a 2004 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh title in the Grand Theft Auto series, following 2002's Grand Theft Auto: Vice City.	", 199,
        'https://images-cdn.ubuy.co.in/633abd2468e87731256436d0-grand-theft-auto-san-andreas-xbox-one.jpg'
    ),
    new ProductModel(
        4,
        'Grand Theft Auto V',
        "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008's Grand Theft Auto IV, and the fifteenth instalment overall	", 599,
        'https://m.media-amazon.com/images/I/71biTWXVvGS.jpg'
    ),
    new ProductModel(
        5,
        'Grand Theft Auto IV',
        "Grand Theft Auto IV is a 2008 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the sixth main entry in the Grand Theft Auto series, following 2004's Grand Theft Auto: San Andreas, and the eleventh instalment overall.",
        899,
        "https://m.media-amazon.com/images/I/71DtdU11olL.jpg"
    ),
    new ProductModel(
        "6",
        "Battlefield: Bad Company 2",
        "Battlefield: Bad Company 2 is a first-person shooter video game developed by DICE and published by Electronic Arts for Microsoft Windows, PlayStation 3, Xbox 360, iOS, Android and Kindle Fire systems. It is a direct sequel to Battlefield: Bad Company and is part of the Battlefield game series.",
        149,
        "https://m.media-amazon.com/images/I/71Y4dtPFjtL.jpg"
    )
];
