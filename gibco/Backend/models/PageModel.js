const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Page name
    fields: [
      {
        type: { type: String, required: true }, // Field type (e.g., text, number, select)
        name: { type: String, required: true }, // Internal field name
        displayName: { type: String, required: true }, // User-friendly display name
        trigger: { type: String, default: null }, // Trigger event or function (if any)
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", PageSchema);
