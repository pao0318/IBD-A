const mongoose = require("mongoose");
const uri = `mongodb://localhost:27017/medibles`;
const connectToMongo = () => {
 mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, 
    },
    () => {
      console.log("connection success to Mongo");
    }
  );
};
module.exports = connectToMongo;
