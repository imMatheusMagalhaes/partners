const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    cpf: {
      type: String,
      required: true,
      maxLength: 11,
      minLength: 11,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      dropDups: true,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email address.",
      ],
    },
    phone: { type: String, required: true, maxLength: 11, unique: true },
    password: { type: String, required: true, minLength: 8 },
    birth: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      uf: { type: String, required: true },
      city: { type: String, required: true },
    },
    account: { type: String, unique: true },
    permissions: [{ type: String, required: true }],
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = model("users", userSchema);
