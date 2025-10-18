const User = require("../models/user.model");
const uploadOnCloudinary = require("../config/cloudinary");
const geminiResponse = require("../gemini");
const { response } = require("express");
const moment = require("moment");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: `Error fetching current user: ${error}` });
  }
};

const updateAssistant = async (req, res) => {
  try {
    const userId = req.userId;
    const { assistantName, imageUrl } = req.body;

    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl; // use selected image URL from frontend
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating assistant:", error);
    res.status(500).json({ message: `Error updating assistant: ${error}` });
  }
};

const askToAssistant = async (req, res) => {
  try {
    const userId = req.userId;
    const {command} = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName;
    const assistantImage = user.assistantImage;

    const result = await geminiResponse(command, assistantName, userName);
    
    const jsonMatch = result.match(/{[\s\S]*}/);

  if(!jsonMatch){
    return res.status(400).json({ response: "Sorry I am unable to process your request at the moment." });
  }

  const gemResult = JSON.parse(jsonMatch[0]);

  const type = gemResult.type;

  switch(type){
    case "get_date":  
      return res.json({
        type,
        userInput: gemResult.userInput,
        response: `Today is ${moment().format("YYYY-MM-DD")}`,
      });
      case "get_time" : 
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${moment().format("hh:mm:ss A")}`
        });
      case "get_day" :
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });
      case "get_month" :
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });
        case "general":
        case "google_search":
        case "youtube_search":
        case "youtube_play":
        case "calculator_open":
        case "instagram_open":
        case "facebook_open":
        case "weather-show":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response: gemResult.response,
          });
        default:
          return res.status(400).json({ response: "Sorry I am unable to process your request at the moment." });
  }

  


  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: `Error processing request: ${error}` });
  }
}

module.exports = { getCurrentUser, updateAssistant, askToAssistant };
