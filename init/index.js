const mongoose = require("mongoose");
const initData = require("./data.js");
const Images = require("../models/imglisting.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/C-GamingDB";
// const dbUrl = process.env.ATLASDB_URL;
const dbUrl = "mongodb+srv://cloud-gaming:8zpZBeUEsIvXaiFO@cluster0.xkmpkk9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
.then( () => {
    console.log("Connected to DB");
})
.catch( (err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);//db
}

const initDB = async () => {
    await Images.deleteMany({});
    await Images.insertMany(initData.data);
    console.log(" Data was initialized");
}

initDB();
