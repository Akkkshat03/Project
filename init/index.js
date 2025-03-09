const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
 };
// const initDB = async () => {
//     try {
//       await Listing.deleteMany({});
  
//       // Transform image field to string
//       const transformedData = initData.data.map(item => {
//         if (typeof item.image === 'object' && item.image.url) {
//           item.image = item.image.url;
//         }
//         return item;
//       });
//       //adding owner
//       // initData.data= initData.data.map((obj)=>({...obj, owner: "67aee64209116278f7f05149"}));
//       await Listing.insertMany(transformedData);
//       console.log("Data added");
//     } catch (error) {
//       console.error("Validation error:", error);
//     }
//   };

initDB();