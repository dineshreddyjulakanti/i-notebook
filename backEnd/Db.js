const mongoose = require('mongoose');


const mongoURI = "mongodb://0.0.0.0:27017"

 function connectToMongo() {
     mongoose.connect(mongoURI).then(() => console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connectToMongo;
// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{

//         console.log("connected to mongo Successfully");
//     })
// }

// module.exports=connectToMongo
