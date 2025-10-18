const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assistantName: {
      type: String,
    },
    assistantImage: {
      type: String,
    },
    history: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User; 
