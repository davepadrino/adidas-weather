const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validSky = ["clear", "cloudy", "rainy", "sunny"];

const weatherSchema = new Schema({
  location: {
    city: {
      type: String
    },
    country: {
      type: String
    },
    id: Number
  },
  current: {
    sky: {
      type: String,
      enum: validSky,
      default: "clear"
    }
  },
  date: {
    type: Date,
    required: true
  },
  hourly: [Number],
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Weather", weatherSchema);
