const mongoose = require("mongoose");
// const uri = `mongodb://localhost:27017/medibles`;
const uri=`mongodb+srv://pao0318:12345@ibd-a.czhh0ol.mongodb.net/medibles?retryWrites=true&w=majority`

const connectToMongo = () => {
 mongoose.connect(
    uri,
    () => {
      console.log("connection success to Mongo");
    }
  );
};
module.exports = connectToMongo;
