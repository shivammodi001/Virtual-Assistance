// import React, { useContext, useRef } from "react";
// import Card from "../components/Card";
// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.png";
// import image3 from "../assets/image4.png";
// import image4 from "../assets/image5.png";
// import image5 from "../assets/image6.png";
// import image6 from "../assets/image7.png";
// import image7 from "../assets/authBg.png";
// import { RiImageAddLine } from "react-icons/ri";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { MdKeyboardBackspace } from "react-icons/md";

// function Customize() {
//   const navigate = useNavigate();
//   const {
//     frontendImage,
//     setFrontendImage,
//     backendImage,
//     setBackendImage,
//     selectedImage,
//     setSelectedImage,
//   } = useContext(userDataContext);

//   const inputImage = useRef();

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBackendImage(file);
//       setFrontendImage(URL.createObjectURL(file));
//     }
//   };

//   const cardImages = [image1, image2, image3, image4, image5, image6, image7];

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center py-10 px-4">
//       {/* Back Button */}
//             <MdKeyboardBackspace
//               onClick={() => navigate("/")}
//               className="text-white text-3xl cursor-pointer absolute top-6 left-6 hover:scale-110 transition-transform"
//             />
//       <h1 className="text-white text-3xl sm:text-2xl xs:text-xl font-bold mb-8 text-center">
//         Select Your Assistant Image
//       </h1>

//       <div className="w-full max-w-[950px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {cardImages.map((img, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedImage(img)}
//             className={`relative w-full h-[250px] sm:h-[200px] xs:h-[170px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//               selectedImage === img
//                 ? "border-4 border-white shadow-2xl shadow-blue-950"
//                 : "border-[#0000ff66] hover:border-white hover:shadow-xl hover:shadow-blue-900"
//             }`}
//           >
//             <Card image={img} />
//           </div>
//         ))}

//         {/* Add Image Card */}
//         <div
//           onClick={() => {
//             inputImage.current && inputImage.current.click();
//             setSelectedImage("input");
//           }}
//           className={`flex items-center justify-center w-full h-[250px] sm:h-[200px] xs:h-[170px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//             selectedImage === "input"
//               ? "border-4 border-white shadow-2xl shadow-blue-950"
//               : "border-[#0000ff66] hover:border-white hover:shadow-xl hover:shadow-blue-900"
//           } bg-[#020220]`}
//         >
//           {!frontendImage ? (
//             <RiImageAddLine className="text-white w-8 h-8 sm:w-6 sm:h-6 xs:w-5 xs:h-5" />
//           ) : (
//             <img
//               src={frontendImage}
//               alt="Uploaded"
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           ref={inputImage}
//           onChange={handleImage}
//         />
//       </div>

//       {selectedImage && (
//         <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg transition-all duration-300" onClick={()=>navigate("/customize2")}>
//           Next
//         </button>
//       )}
//     </div>
//   );
// }

// export default Customize;

import React, { useContext, useRef } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.png";
import image6 from "../assets/image7.png";
import image7 from "../assets/authBg.png";
import { RiImageAddLine, RiArrowRightLine } from "react-icons/ri";
import { MdKeyboardBackspace, MdOutlineCollections } from "react-icons/md";
import { FaCheck, FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Customize() {
  const navigate = useNavigate();
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const cardImages = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex flex-col items-center py-10 px-4 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg z-10"
      >
        <MdKeyboardBackspace className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 mt-4"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <MdOutlineCollections className="text-white text-3xl" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Choose Your Assistant
        </h1>
        <p className="text-gray-300 text-lg max-w-md mx-auto">
          Select an avatar that represents your AI assistant’s personality
        </p>
      </motion.div>

      {/* Image Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10"
      >
        {cardImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log("Selected image:", img);
              setSelectedImage(img);
            }}
            className={`relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 group ${
              selectedImage === img
                ? "border-blue-400 shadow-2xl shadow-blue-500/50 ring-4 ring-blue-400/30"
                : "border-gray-600 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/30"
            }`}
          >
            <Card image={img} />

            {/* Selection Tick */}
            {selectedImage === img && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <FaCheck className="text-white text-xs" />
              </motion.div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
              >
                Select
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Add Custom Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            inputImage.current && inputImage.current.click();
            setSelectedImage("input");
          }}
          className={`relative flex items-center justify-center w-full aspect-square rounded-2xl cursor-pointer border-2 border-dashed transition-all duration-300 group ${
            selectedImage === "input"
              ? "border-blue-400 bg-blue-500/20 shadow-2xl shadow-blue-500/50 ring-4 ring-blue-400/30"
              : "border-gray-500 bg-gray-800/30 hover:border-purple-400 hover:bg-purple-500/10 hover:shadow-xl hover:shadow-purple-500/30"
          }`}
        >
          {!frontendImage ? (
            <div className="text-center p-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3"
              >
                <RiImageAddLine className="text-white text-2xl" />
              </motion.div>
              <p className="text-gray-300 text-sm font-medium">Upload Custom</p>
              <p className="text-gray-400 text-xs mt-1">JPG, PNG, GIF</p>
            </div>
          ) : (
            <>
              <img
                src={frontendImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              {selectedImage === "input" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <FaCheck className="text-white text-xs" />
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputImage}
          onChange={handleImage}
        />
      </motion.div>

      {/* Next Button */}
      <AnimatePresence>
        {selectedImage && (
          <motion.button
            style={{ pointerEvents: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/customize2")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 z-10"
          >
            <FaRobot className="text-lg" />
            <span>Continue</span>
            <RiArrowRightLine className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-gray-400 text-sm max-w-md"
      >
        <p>💡 Choose an image that reflects your assistant’s personality. You can always change it later!</p>
      </motion.div>
    </div>
  );
}

export default Customize;

