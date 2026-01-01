//https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dates: {
      type: String,
      required: true,
    },
    expireDate: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    postDate: {
      type: String,
      required: true,
    },
    withNotification: {
      type: Boolean,
      required: true,
      default: false,
    },
    alertTitle: {
      type: String,
      required: false,
    },
    alertMessage: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
