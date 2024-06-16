const mongoose=require("mongoose")

const connectToDb=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connected to Database successfully")
    })
    .catch((error)=>{
        console.log("Database Connection Failed")
        console.error(error);
        process.exit(1);
    })
}

module.exports=connectToDb;