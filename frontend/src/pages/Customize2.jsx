// import React, { useContext, useState } from "react";
// import { userDataContext } from "../context/UserContext";
// import axios from "axios";
// import { MdKeyboardBackspace } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// function Customize2() {
//   const navigate = useNavigate();
//   const { userData, backendImage, selectedImage, serverUrl, setUserData } =
//     useContext(userDataContext);
//   const [name, setName] = useState(userData?.assistantName || "");
//   const [loading, setLoading] = useState(false);

//   const handleUpdateAssistant = async () => {
//     if (!name) return;
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("assistantName", name);
//       if (backendImage) {
//         formData.append("assistantImage", backendImage);
//       } else {
//         formData.append("imageUrl", selectedImage);
//       }

//       const res = await axios.post(`${serverUrl}/api/user/update`, formData, {
//         withCredentials: true,
//       });

//       setUserData(res.data);
//       alert("Assistant updated successfully!");
//         navigate("/"); // or wherever
//     } catch (error) {
//       console.error(
//         "Error updating assistant:",
//         error.response?.data || error.message
//       );
//       alert("Failed to update assistant. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center px-4">
//       {/* Back Button */}
//       <MdKeyboardBackspace
//         onClick={() => navigate(-1)}
//         className="text-white text-3xl cursor-pointer absolute top-6 left-6 hover:scale-110 transition-transform"
//       />

//       <h1 className="text-white text-3xl sm:text-2xl xs:text-xl font-bold mb-8 text-center">
//         Enter Your Assistant Name
//       </h1>

//       <input
//         type="text"
//         placeholder="Assistant Name"
//         className="w-full max-w-[400px] px-4 py-2 rounded-lg border border-white/40 bg-transparent text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-all"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <button
//         className={`mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ${
//           !name ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//         }`}
//         disabled={!name || loading}
//         onClick={handleUpdateAssistant}
//       >
//         {loading ? "Updating..." : "Create Assistant"}
//       </button>
//     </div>
//   );
// }

// export default Customize2;
import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { MdKeyboardBackspace, MdPerson, MdCreate } from "react-icons/md";
import { FaRobot, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const navigate = useNavigate();
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [name, setName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);

  // Handle update assistant function
  const handleUpdateAssistant = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("assistantName", name);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const res = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
      });

      setUserData(res.data);
      alert("Assistant updated successfully!");
        navigate("/"); // or wherever
    } catch (error) {
      console.error(
        "Error updating assistant:",
        error.response?.data || error.message
      );
      alert("Failed to update assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Back Button - Enhanced */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg z-10"
      >
        <MdKeyboardBackspace className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <FaRobot className="text-white text-3xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
          >
            Name Your Assistant
          </motion.h1>
          <p className="text-gray-300 text-sm">
            Give your AI assistant a unique personality and name
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <label className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
            <MdPerson className="text-blue-400" />
            Assistant Name
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="Enter your assistant's name..."
              className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdateAssistant()}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
              <MdCreate className="text-xl" />
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
            <FaMagic className="text-purple-400 text-xs" />
            This name will be used to activate your assistant via voice commands
          </p>
        </div>

        {/* Preview Section */}
        {name && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50"
          >
            <h3 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
              <FaRobot className="text-green-400" />
              Preview
            </h3>
            <p className="text-white text-lg font-semibold">
              "Hey {name}, what's the weather today?"
            </p>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: name ? 1.02 : 1 }}
          whileTap={{ scale: name ? 0.98 : 1 }}
          onClick={handleUpdateAssistant}
          disabled={!name || loading}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            !name || loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Assistant...</span>
            </>
          ) : (
            <>
              <FaRobot className="text-lg" />
              <span>Create Assistant</span>
            </>
          )}
        </motion.button>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-700/30"
        >
          <h4 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
            💡 Pro Tip
          </h4>
          <p className="text-blue-200 text-xs">
            Choose a name that's easy to pronounce and remember. Your assistant will respond when you say "Hey {name || '[Assistant Name]'}"!
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center text-gray-400 text-sm"
      >
        <p>Your AI companion awaits! ✨</p>
      </motion.div>
    </div>
  );
}

export default Customize2;