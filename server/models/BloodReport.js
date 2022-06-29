const mongoose = require("mongoose");
const { Schema } = mongoose;

const BloodReportSchema = new Schema({
 id: {
    type: "String",
  },
  img:{
    type:"String",
  }
});
module.exports = mongoose.model("bloodreport", BloodReportSchema);

