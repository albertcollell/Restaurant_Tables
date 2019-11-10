const mongoose = require("mongoose");

const CostumerSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Costumers", CostumerSchema);
