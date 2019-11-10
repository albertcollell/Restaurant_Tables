const mongoose = require("mongoose");
const TableSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  chairs: {
    type: Number,
    required: true
  },
  onUse: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Tables", TableSchema);
