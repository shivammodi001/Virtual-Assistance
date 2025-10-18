import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";


function Card({ image }) {
  const {
      frontendImage,
      setFrontendImage,
      backendImage,
      setBackendImage,
      selectedImage,
      setSelectedImage,
    } = useContext(userDataContext);

  return (
    <div
      className={`w-full h-full overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 ${
        selectedImage === image
          ? "border-4 border-white shadow-2xl shadow-blue-950 scale-105"
          : "hover:border-white hover:shadow-xl hover:shadow-blue-900 hover:scale-105"
      }`}
      onClick={() => {
        setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      <img
        src={image}
        alt="Card"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Card;
