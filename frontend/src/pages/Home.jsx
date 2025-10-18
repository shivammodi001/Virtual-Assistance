// import React, { useContext, useState, useRef, useEffect } from "react";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
// import { FiLogOut } from "react-icons/fi";
// import axios from "axios";
// import aiGif from "../assets/ai.gif";
// import userGif from "../assets/user.gif";

// function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } =
//     useContext(userDataContext);
//   const [userInputText, setUserInputText] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userSpeaking, setUserSpeaking] = useState(false);
//   const [aiSpeaking, setAiSpeaking] = useState(false);

//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();
//   const [assistantResponse, setAssistantResponse] = useState("");
//   const [listening, setListening] = useState(false);

//   const isSpeakingRef = useRef(false);
//   const isRecognizingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;

//   const handleLogout = async () => {
//     try {
//       const res = await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       alert("Logged out successfully!");
//       navigate("/signin");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       alert("Failed to log out. Please try again.");
//     }
//   };

//   const handleSendInput = async () => {
//     if (!userInputText.trim()) return;

//     setLoading(true);
//     setUserSpeaking(true);
//     const transcript = userInputText.trim();

//     try {
//       const data = await getGeminiResponse(transcript);
//       setAssistantResponse(data.response);
//       setUserSpeaking(false);
//       handleCommand(data);
//     } catch (error) {
//       console.error("Error fetching assistant response:", error);
//       setAssistantResponse("Oops! Something went wrong.");
//       setUserSpeaking(false);
//     } finally {
//       setUserInputText("");
//       setLoading(false);
//     }
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const startRecognition = () => {
//     if (
//       isRecognizingRef.current ||
//       !recognitionRef.current ||
//       isSpeakingRef.current
//     )
//       return;

//     try {
//       recognitionRef.current.start();
//       setListening(true);
//       isRecognizingRef.current = true;
//     } catch (error) {
//       if (!error.message.includes("start")) {
//         console.error("Recognition start error: ", error);
//       }
//     }
//   };

//   const stopRecognition = () => {
//     if (!isRecognizingRef.current || !recognitionRef.current) return;

//     try {
//       recognitionRef.current.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//     } catch (error) {
//       console.error("Error stopping recognition:", error);
//     }
//   };

//   // Stop AI speech
//   const stopSpeaking = () => {
//     if (synth.speaking) {
//       synth.cancel();
//       isSpeakingRef.current = false;
//       setAiSpeaking(false);
//     }
//   };

//   // Assistant Voice Interaction - FIXED VERSION
//   const speak = (text) => {
//     // Stop recognition first
//     stopRecognition();

//     // Stop any ongoing speech
//     stopSpeaking();

//     // Wait a bit for recognition to fully stop
//     setTimeout(() => {
//       const utterance = new SpeechSynthesisUtterance(text);
//       isSpeakingRef.current = true;
//       setAiSpeaking(true);

//       utterance.onstart = () => {
//         console.log("🗣️ AI started speaking");
//         setAiSpeaking(true);
//       };

//       utterance.onend = () => {
//         console.log("🗣️ AI finished speaking");
//         isSpeakingRef.current = false;
//         setAiSpeaking(false);
//         // Restart recognition after a longer delay
//         setTimeout(() => {
//           if (!isSpeakingRef.current) {
//             startRecognition();
//           }
//         }, 1500);
//       };

//       utterance.onerror = (event) => {
//         console.error("Speech error:", event.error);
//         isSpeakingRef.current = false;
//         setAiSpeaking(false);
//         // Restart recognition even on error
//         setTimeout(() => {
//           if (!isSpeakingRef.current) {
//             startRecognition();
//           }
//         }, 1500);
//       };

//       try {
//         synth.speak(utterance);
//         console.log("🗣️ Speech synthesis started for:", text);
//       } catch (error) {
//         console.error("Error starting speech synthesis:", error);
//         isSpeakingRef.current = false;
//         setAiSpeaking(false);
//         startRecognition();
//       }
//     }, 300);
//   };

//   // handle command to open social media or do other tasks
//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;

//     console.log("🎯 Handling command:", type, response);

//     if (response && response.trim() !== "") {
//       // Use setTimeout to ensure speech recognition is fully stopped
//       setTimeout(() => {
//         speak(response);
//       }, 500);
//     } else {
//       setTimeout(() => {
//         speak("I am sorry, I didn't get that. Could you please repeat?");
//       }, 500);
//     }

//     // Handle other commands (same as before)
//     if (type === "google_search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     } else if (type === "youtube_search") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank"
//       );
//     } else if (type === "youtube_play") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank"
//       );
//     } else if (type === "calculator_open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     } else if (type === "instagram_open") {
//       window.open(`https://www.instagram.com`, "_blank");
//     } else if (type === "facebook_open") {
//       window.open(`https://www.facebook.com`, "_blank");
//     } else if (type === "weather-show") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//   };

//   // handling voice features for user input and assistant response
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.warn("Speech recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = true;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       console.log("🎤 Speech recognition started");
//       setListening(true);
//       isRecognizingRef.current = true;
//     };

//     recognition.onend = () => {
//       console.log("🎤 Speech recognition ended");
//       setListening(false);
//       setUserSpeaking(false);
//       isRecognizingRef.current = false;

//       // Only restart if not speaking
//       if (!isSpeakingRef.current) {
//         setTimeout(() => {
//           if (!isSpeakingRef.current && !isRecognizingRef.current) {
//             startRecognition();
//           }
//         }, 1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       // Ignore "aborted" errors as they're expected when we manually stop
//       if (event.error === "aborted") {
//         return;
//       }

//       console.warn("Recognition error:", event.error);
//       setListening(false);
//       setUserSpeaking(false);
//       isRecognizingRef.current = false;

//       // Don't restart on serious errors
//       if (
//         event.error !== "not-allowed" &&
//         event.error !== "service-not-allowed"
//       ) {
//         setTimeout(() => {
//           if (!isSpeakingRef.current && !isRecognizingRef.current) {
//             startRecognition();
//           }
//         }, 2000);
//       }
//     };

//     recognition.onresult = async (event) => {
//       // Get the most recent result
//       const results = event.results;
//       const lastResult = results[results.length - 1];

//       // Only process final results, not interim ones
//       if (!lastResult.isFinal) return;

//       const transcript = lastResult[0].transcript.trim();

//       console.log("🗣️ User said:", transcript);
//       setUserInputText(transcript);

//       // Show user speaking GIF when speech is detected
//       if (transcript.length > 0) {
//         setUserSpeaking(true);
//       }

//       // Check if the transcript contains the assistant's name
//       const assistantName =
//         userData?.assistantName?.toLowerCase() || "assistant";
//       if (transcript.toLowerCase().includes(assistantName)) {
//         console.log("🎯 Assistant name detected! Processing...");

//         // Stop recognition temporarily while processing
//         stopRecognition();
//         setUserSpeaking(false);

//         try {
//           // Fetch response from Gemini API
//           console.log("📡 Calling Gemini API...");
//           const data = await getGeminiResponse(transcript);
//           console.log("✅ Gemini response received:", data);

//           setAssistantResponse(data.response);

//           // Add a delay before handling command to ensure recognition is fully stopped
//           setTimeout(() => {
//             handleCommand(data);
//           }, 800);
//         } catch (error) {
//           console.error("❌ Error getting Gemini response:", error);
//           setTimeout(() => {
//             speak("Sorry, I encountered an error. Please try again.");
//           }, 800);
//         }
//       }
//     };

//     // Start recognition after a short delay
//     const initializeRecognition = setTimeout(() => {
//       console.log("🚀 Initializing speech recognition...");
//       if (!isSpeakingRef.current) {
//         startRecognition();
//       }
//     }, 2000);

//     return () => {
//       clearTimeout(initializeRecognition);
//       stopRecognition();
//       stopSpeaking();
//       isRecognizingRef.current = false;
//       isSpeakingRef.current = false;
//     };
//   }, [userData?.assistantName]);

//     const greeting = new SpeechSynthesisUtterance(
//       `Hello ${userData.name}, what can I help you with`
//     );
//     greeting.lang = "hi-IN";

//     window.speechSynthesis.speak(greeting);

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center px-4 py-10">
//       {/* Top Bar */}
//       <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//         {/* Profile Icon */}
//         <div className="relative" ref={dropdownRef}>
//           <div
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg"
//           >
//             {userData?.name ? userData.name[0].toUpperCase() : "U"}
//           </div>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute left-0 mt-2 w-56 bg-[#0b0b3a] border border-blue-700 rounded-xl shadow-2xl text-white p-4 z-50 animate-fadeIn">
//               <h2 className="font-semibold text-lg mb-1">
//                 {userData?.name || "User"}
//               </h2>
//               <p className="text-sm text-blue-200 mb-3 break-words">
//                 {userData?.email || "No email available"}
//               </p>
//               <hr className="border-blue-700 mb-3" />
//               <button
//                 onClick={() => {
//                   setDropdownOpen(false);
//                   navigate("/customize");
//                 }}
//                 className="w-full text-left text-sm py-2 px-2 hover:bg-blue-800 rounded-md transition-all"
//               >
//                 ✏️ Edit Assistant
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left text-sm py-2 px-2 hover:bg-red-700 rounded-md transition-all"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Stop Speaking Button - Only show when AI is speaking */}
//         {aiSpeaking && (
//           <button
//             onClick={stopSpeaking}
//             className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
//           >
//             ⏹️ Stop Speaking
//           </button>
//         )}

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
//         >
//           <FiLogOut className="text-lg" /> Logout
//         </button>
//       </div>

//       {/* Assistant Image Section with GIF overlay */}
//       <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-950 border-2 border-blue-600 mt-12">
//         <img
//           src={userData?.assistantImage || "/default.jpg"}
//           alt="Assistant"
//           className="w-full h-full object-cover"
//         />

//         {/* Show AI GIF when AI is speaking */}
//         {aiSpeaking && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <img
//               src={aiGif}
//               alt="AI Thinking"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         <button
//           onClick={() => navigate("/customize")}
//           className="absolute top-3 right-3 bg-blue-700 p-2 rounded-full hover:bg-blue-800 transition-all z-10"
//         >
//           <MdEdit className="text-white text-xl" />
//         </button>
//       </div>

//       {/* Assistant Info */}
//       <div className="mt-6 text-center">
//         <h1 className="text-white text-3xl font-bold mb-2">
//           {userData?.assistantName || "Your Assistant"}
//         </h1>

//         {/* Status Indicators */}
//         <div className="flex justify-center gap-4 mb-4">
//           {listening && (
//             <span className="text-green-400 text-sm">
//               🎤 Listening... Say '{userData?.assistantName || "Assistant"}'
//             </span>
//           )}
//           {userSpeaking && (
//             <span className="text-blue-400 text-sm">
//               🗣️ Processing your speech
//             </span>
//           )}
//           {aiSpeaking && (
//             <span className="text-purple-400 text-sm">🤖 AI is speaking</span>
//           )}
//         </div>

//         <p className="text-blue-200 text-lg">Ready to assist you anytime 💬</p>

//         {/* Show assistant response below input */}
//         {assistantResponse && (
//           <div className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-700">
//             <h2 className="text-white font-semibold mb-2">Assistant Says:</h2>
//             <p className="text-blue-200 italic">"{assistantResponse}"</p>
//           </div>
//         )}

//         {/* Show User GIF when user is speaking/typing */}
//         {(userSpeaking || listening) && (
//           <div className="flex justify-center items-center">
//             <img src={userGif} alt="User Speaking" className="w-[200px]" />
//           </div>
//         )}
//         {/* Button to show/hide text input */}
//         <button
//           onClick={() => setShowInput((prev) => !prev)}
//           className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
//         >
//           {showInput ? "Close Input" : "Type Message"}
//         </button>

//         {showInput && (
//           <>
//             {/* Input Section */}
//             <div className="flex items-center gap-2 mt-5">
//               <input
//                 type="text"
//                 value={userInputText}
//                 onChange={(e) => setUserInputText(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 p-2 rounded-lg border border-blue-700 bg-[#0b0b3a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSendInput();
//                 }}
//                 disabled={loading || aiSpeaking}
//               />
//               <button
//                 onClick={handleSendInput}
//                 className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
//                 disabled={loading || aiSpeaking}
//               >
//                 {loading ? "Sending..." : "Send"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;
// ``````````````````````````````````````````````````````````````````````````````
// import React, { useContext, useState, useRef, useEffect } from "react";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
// import { FiLogOut } from "react-icons/fi";
// import axios from "axios";
// import aiGif from "../assets/ai.gif";
// import userGif from "../assets/user.gif";

// function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } =
//     useContext(userDataContext);
//     // console.log(userData?.history);
//   const [userInputText, setUserInputText] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userSpeaking, setUserSpeaking] = useState(false);
//   const [aiSpeaking, setAiSpeaking] = useState(false);
//   const [assistantResponse, setAssistantResponse] = useState("");
//   const [listening, setListening] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [voiceOptions, setVoiceOptions] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   const dropdownRef = useRef();
//   const recognitionRef = useRef(null);
//   const isSpeakingRef = useRef(false);
//   const isRecognizingRef = useRef(false);
//   const synth = window.speechSynthesis;

//   const navigate = useNavigate();

//   // Fetch voices for selection
//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = synth.getVoices();
//       setVoiceOptions(voices);
//       if (voices.length > 0) setSelectedVoice(voices[0]);
//     };
//     if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
//     loadVoices();
//   }, []);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserData(null);
//       navigate("/signin");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       alert("Failed to log out.");
//     }
//   };

//   // Update userData history
//   const updateHistory = (userMsg, type = "text") => {
//     setUserData((prev) => ({
//       ...prev,
//       history: [...(prev.history || []), { type, text: userMsg }],
//     }));
//   };

//   // Send text input
//   const handleSendInput = async () => {
//     if (!userInputText.trim()) return;
//     setLoading(true);
//     setUserSpeaking(true);
//     const transcript = userInputText.trim();

//     try {
//       const data = await getGeminiResponse(transcript);
//       setAssistantResponse(data.response);
//       updateHistory(transcript, data.type || "text");
//       speak(data.response);
//     } catch (err) {
//       console.error(err);
//       speak("Oops! Something went wrong.");
//     } finally {
//       setUserInputText("");
//       setUserSpeaking(false);
//       setLoading(false);
//     }
//   };

//   // Speech Recognition
//   const startRecognition = () => {
//     if (!recognitionRef.current || isRecognizingRef.current || isSpeakingRef.current) return;
//     recognitionRef.current.start();
//     setListening(true);
//     isRecognizingRef.current = true;
//   };

//   const stopRecognition = () => {
//     if (!recognitionRef.current || !isRecognizingRef.current) return;
//     recognitionRef.current.stop();
//     setListening(false);
//     isRecognizingRef.current = false;
//   };

//   // Speech Synthesis
//   const speak = (text) => {
//     stopRecognition();
//     if (synth.speaking) synth.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     if (selectedVoice) utterance.voice = selectedVoice;
//     isSpeakingRef.current = true;
//     setAiSpeaking(true);

//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       setAiSpeaking(false);
//       setTimeout(() => startRecognition(), 500);
//     };
//     utterance.onerror = () => {
//       isSpeakingRef.current = false;
//       setAiSpeaking(false);
//       setTimeout(() => startRecognition(), 500);
//     };

//     synth.speak(utterance);
//   };

//   // Handle commands
//   const handleCommand = (data) => {
//     const { type, userInput } = data;
//     if (!type) return;
//     updateHistory(userInput, type);

//     const encodedInput = encodeURIComponent(userInput || "");
//     if (type === "google_search") window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
//     else if (type === "youtube_search" || type === "youtube_play") window.open(`https://www.youtube.com/results?search_query=${encodedInput}`, "_blank");
//     else if (type === "calculator_open") window.open("https://www.google.com/search?q=calculator", "_blank");
//     else if (type === "instagram_open") window.open("https://www.instagram.com", "_blank");
//     else if (type === "facebook_open") window.open("https://www.facebook.com", "_blank");
//     else if (type === "weather-show") window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
//   };

//   // Initialize Speech Recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = true;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => {
//       setListening(false);
//       isRecognizingRef.current = false;
//       if (!isSpeakingRef.current) setTimeout(() => startRecognition(), 1000);
//     };
//     recognition.onerror = (event) => {
//       if (event.error !== "aborted") setTimeout(() => startRecognition(), 2000);
//     };
//     recognition.onresult = async (event) => {
//       const lastResult = event.results[event.results.length - 1];
//       if (!lastResult.isFinal) return;

//       const transcript = lastResult[0].transcript.trim();
//       setUserInputText(transcript);
//       setUserSpeaking(true);

//       const assistantName = (userData?.assistantName || "assistant").toLowerCase();
//       if (transcript.toLowerCase().includes(assistantName)) {
//         stopRecognition();
//         try {
//           const data = await getGeminiResponse(transcript);
//           setAssistantResponse(data.response);
//           updateHistory(transcript, data.type || "text");
//           handleCommand(data);
//           speak(data.response);
//         } catch (err) {
//           console.error(err);
//           speak("Sorry, I encountered an error.");
//         }
//       }
//     };

//     recognitionRef.current = recognition;
//     const initTimeout = setTimeout(() => startRecognition(), 2000);
//     return () => {
//       clearTimeout(initTimeout);
//       stopRecognition();
//       if (synth.speaking) synth.cancel();
//     };
//   }, [userData?.assistantName, selectedVoice]);

//   // Greet user
//   useEffect(() => {
//     if (userData?.name) {
//       const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
//       if (selectedVoice) greeting.voice = selectedVoice;
//       synth.speak(greeting);
//     }
//   }, [userData?.name, selectedVoice]);

//   // Close dropdown on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center px-4 py-10">
//       {/* Top Bar */}
//       <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//         <div className="relative" ref={dropdownRef}>
//           <div
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg"
//           >
//             {userData?.name ? userData.name[0].toUpperCase() : "U"}
//           </div>
//           {dropdownOpen && (
//             <div className="absolute left-0 mt-2 w-72 bg-[#0b0b3a] border border-blue-700 rounded-xl shadow-2xl text-white p-4 z-50 animate-fadeIn">
//               <h2 className="font-semibold text-lg mb-1">{userData?.name || "User"}</h2>
//               <p className="text-sm text-blue-200 mb-3 break-words">{userData?.email || "No email available"}</p>
//               <hr className="border-blue-700 mb-3" />
//               <div className="mb-3">
//                 <label className="text-sm mb-1 block">🎤 Choose Voice:</label>
//                 <select
//                   className="w-full bg-[#0b0b3a] border border-blue-700 rounded-md p-1 text-white"
//                   value={selectedVoice?.name || ""}
//                   onChange={(e) => {
//                     const voice = voiceOptions.find(v => v.name === e.target.value);
//                     setSelectedVoice(voice);
//                   }}
//                 >
//                   {voiceOptions.map((v, idx) => (
//                     <option key={idx} value={v.name}>{v.name} ({v.lang})</option>
//                   ))}
//                 </select>
//               </div>
//               <button
//                 onClick={() => { setDropdownOpen(false); navigate("/customize"); }}
//                 className="w-full text-left text-sm py-2 px-2 hover:bg-blue-800 rounded-md"
//               >
//                 ✏️ Edit Assistant
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left text-sm py-2 px-2 hover:bg-red-700 rounded-md"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {aiSpeaking && (
//           <button
//             onClick={() => synth.cancel()}
//             className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow-md"
//           >
//             ⏹️ Stop Speaking
//           </button>
//         )}

//         <button
//           onClick={handleLogout}
//           className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow-md"
//         >
//           <FiLogOut className="text-lg" /> Logout
//         </button>
//       </div>

//       {/* Assistant Image */}
//       <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-950 border-2 border-blue-600 mt-12">
//         <img src={userData?.assistantImage || "/default.jpg"} alt="Assistant" className="w-full h-full object-cover" />
//         {aiSpeaking && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <img src={aiGif} alt="AI Thinking" className="w-full h-full object-cover" />
//           </div>
//         )}
//         <button
//           onClick={() => navigate("/customize")}
//           className="absolute top-3 right-3 bg-blue-700 p-2 rounded-full hover:bg-blue-800 transition-all z-10"
//         >
//           <MdEdit className="text-white text-xl" />
//         </button>
//       </div>

//       {/* Assistant Info */}
//       <div className="mt-6 text-center w-full max-w-3xl">
//         <h1 className="text-white text-3xl font-bold mb-2">{userData?.assistantName || "Your Assistant"}</h1>
//         <div className="flex justify-center gap-4 mb-4">
//           {listening && <span className="text-green-400 text-sm">🎤 Listening...</span>}
//           {userSpeaking && <span className="text-blue-400 text-sm">🗣️ Processing...</span>}
//           {aiSpeaking && <span className="text-purple-400 text-sm">🤖 AI is speaking</span>}
//         </div>

//         <p className="text-blue-200 text-lg">Ready to assist you anytime 💬</p>

//         {/* Assistant Response */}
//         {assistantResponse && (
//           <div className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-700">
//             <h2 className="text-white font-semibold mb-2">Assistant Says:</h2>
//             <p className="text-blue-200 italic">"{assistantResponse}"</p>
//           </div>
//         )}

//         {/* User GIF */}
//         {(userSpeaking || listening) && (
//           <div className="flex justify-center items-center">
//             <img src={userGif} alt="User Speaking" className="w-[200px]" />
//           </div>
//         )}

//         {/* Show/Hide Input */}
//         <button
//           onClick={() => setShowInput((prev) => !prev)}
//           className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold"
//         >
//           {showInput ? "Close Input" : "Type Message"}
//         </button>

//         {showInput && (
//           <div className="flex items-center gap-2 mt-5">
//             <input
//               type="text"
//               value={userInputText}
//               onChange={(e) => setUserInputText(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 p-2 rounded-lg border border-blue-700 bg-[#0b0b3a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onKeyDown={(e) => { if (e.key === "Enter") handleSendInput(); }}
//               disabled={loading || aiSpeaking}
//             />
//             <button
//               onClick={handleSendInput}
//               className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold"
//               disabled={loading || aiSpeaking}
//             >
//               {loading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         )}

//       {[...userData.history].slice(-10).reverse().map((item, idx) => (
//   <div key={idx} className="mb-2 p-2 bg-blue-800 rounded-md">
//     <p className="text-blue-200"><strong>Type:</strong> {item.type}</p>
//     <p className="text-white"><strong>Text:</strong> {item}</p>
//   </div>
// ))}

//       </div>
//     </div>
//   );
// }

// export default Home;

// ```````````````````````````````````````````````````````````````````````````````````
// import React, { useContext, useState, useRef, useEffect } from "react";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
  //   MdEdit,
  //   MdLogout,
  //   MdMic,
  //   MdMicOff,
  //   MdVolumeUp,
  //   MdVolumeOff,
  //   MdSend,
  //   MdClose,
  //   MdKeyboard,
//   MdPerson,
//   MdHistory,
//   MdPlayArrow,
//   MdStop,
//   MdMenu,
//   MdClose as MdCloseIcon,
// } from "react-icons/md";
// import { FaRobot, FaUser, FaRegCommentDots, FaBrain } from "react-icons/fa";
// import { IoIosSettings, IoIosColorPalette } from "react-icons/io";
// import axios from "axios";
// import aiGif from "../assets/ai.gif";
// import userGif from "../assets/user.gif";
// import { BsRobot } from "react-icons/bs";

// function Home() {
  //   const { userData, serverUrl, setUserData, getGeminiResponse } =
  //     useContext(userDataContext);
  
  //   const [userInputText, setUserInputText] = useState("");
  //   // const [showInput, setShowInput] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const [userSpeaking, setUserSpeaking] = useState(false);
  //   const [aiSpeaking, setAiSpeaking] = useState(false);
  //   const [assistantResponse, setAssistantResponse] = useState("");
  //   const [listening, setListening] = useState(false);
  //   const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [voiceOptions, setVoiceOptions] = useState([]);
  //   const [selectedVoice, setSelectedVoice] = useState(null);
  //   const [showHistory, setShowHistory] = useState(false);
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  //   const dropdownRef = useRef();
  //   const recognitionRef = useRef(null);
  //   const isSpeakingRef = useRef(false);
  //   const isRecognizingRef = useRef(false);
  //   const hasGreetedRef = useRef(false); // ✅ New flag to track if greeting has been played
  //   const synth = window.speechSynthesis;
  
  //   const navigate = useNavigate();
  //   const location = useLocation(); // ✅ To detect route changes
  
  //   // Fetch voices for selection
  //   useEffect(() => {
    //     const loadVoices = () => {
      //       const voices = synth.getVoices();
      //       setVoiceOptions(voices);
      //       if (voices.length > 0) setSelectedVoice(voices[0]);
//     };
//     if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
//     loadVoices();
//   }, []);

//   // ✅ Fixed Greeting Effect - Only play once per session
//   useEffect(() => {
  //     // Reset greeting flag when component mounts
  //     hasGreetedRef.current = false;
  
  //     return () => {
    //       // Cleanup when component unmounts
    //       if (synth.speaking) {
      //         synth.cancel();
      //       }
      //     };
      //   }, []);
      
      //   // ✅ Improved Greeting Logic - Only play when coming from auth, not from customize
      //   useEffect(() => {
        //     // Don't play greeting if:
        //     // 1. Already greeted in this session
        //     // 2. No user data
        //     // 3. Coming back from customize page
        //     if (hasGreetedRef.current || !userData?.name) return;
        
        //     // Check if we're coming from auth flow (signin/signup) or fresh load
        //     const isComingFromAuth = !location.state?.fromCustomize;
        
        //     if (isComingFromAuth) {
          //       const greeting = new SpeechSynthesisUtterance(
            //         `Hello ${userData.name}, what can I help you with?`
            //       );
            //       if (selectedVoice) greeting.voice = selectedVoice;
            
            //       greeting.onend = () => {
              //         hasGreetedRef.current = true;
              //       };
              
              //       greeting.onerror = () => {
                //         hasGreetedRef.current = true;
                //       };
                
                //       // Small delay to ensure everything is loaded
                //       setTimeout(() => {
                  //         if (!hasGreetedRef.current) {
                    //           synth.speak(greeting);
                    //           hasGreetedRef.current = true;
                    //         }
//       }, 1000);
//     } else {
  //       // If coming from customize, just mark as greeted
//       hasGreetedRef.current = true;
//     }
//   }, [userData?.name, selectedVoice, location.state]);

//   // Logout
//   const handleLogout = async () => {
  //     try {
    //       // Stop any ongoing speech
    //       if (synth.speaking) {
      //         synth.cancel();
//       }
//       // Stop recognition
//       stopRecognition();

//       await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       alert("Logout Successfully👋");
//       setUserData(null);
//       // Reset greeting flag on logout
//       hasGreetedRef.current = false;
//       navigate("/signin");
//     } catch (error) {
  //       console.error("Logout failed:", error);
  //       alert("Failed to log out.");
//     }
//   };

//   // Navigate to customize with state
//   const navigateToCustomize = () => {
  //     navigate("/customize", { state: { fromHome: true } });
  //   };
  
  //   // Update userData history
//   const updateHistory = (userMsg, type = "text") => {
  //     setUserData((prev) => ({
//       ...prev,
//       history: [
  //         ...(prev.history || []),
  //         { type, text: userMsg, timestamp: new Date().toLocaleTimeString() },
  //       ],
  //     }));
  //   };
  
  //   // Speech Recognition
  //   const startRecognition = () => {
    //     if (
      //       !recognitionRef.current ||
//       isRecognizingRef.current ||
//       isSpeakingRef.current
//     )
//       return;
//     try {
  //       recognitionRef.current.start();
  //       setListening(true);
  //       isRecognizingRef.current = true;
  //     } catch (error) {
    //       console.log("Recognition already started or error:", error);
//     }
//   };

//   const stopRecognition = () => {
//     if (!recognitionRef.current || !isRecognizingRef.current) return;
//     try {
//       recognitionRef.current.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//     } catch (error) {
  //       console.log("Error stopping recognition:", error);
  //     }
  //   };
  
  //   // Speech Synthesis
  //   const speak = (text) => {
    //     stopRecognition();
    //     if (synth.speaking) synth.cancel();
    
    //     const utterance = new SpeechSynthesisUtterance(text);
    //     if (selectedVoice) utterance.voice = selectedVoice;
    //     isSpeakingRef.current = true;
    //     setAiSpeaking(true);
    
    //     utterance.onend = () => {
      //       isSpeakingRef.current = false;
      //       setAiSpeaking(false);
      //       setTimeout(() => startRecognition(), 500);
      //     };
      
      //     utterance.onerror = () => {
        //       isSpeakingRef.current = false;
        //       setAiSpeaking(false);
        //       setTimeout(() => startRecognition(), 500);
//     };

//     synth.speak(utterance);
//   };

//   // Handle commands
//   const handleCommand = (data) => {
//     const { type, userInput } = data;
//     if (!type) return;
//     updateHistory(userInput, type);

//     const encodedInput = encodeURIComponent(userInput || "");
//     if (type === "google_search")
//       window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
//     else if (type === "youtube_search" || type === "youtube_play")
//       window.open(
//         `https://www.youtube.com/results?search_query=${encodedInput}`,
//         "_blank"
//       );
//     else if (type === "calculator_open")
//       window.open("https://www.google.com/search?q=calculator", "_blank");
//     else if (type === "instagram_open")
//       window.open("https://www.instagram.com", "_blank");
//     else if (type === "facebook_open")
//       window.open("https://www.facebook.com", "_blank");
//     else if (type === "weather-show")
//       window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
//   };

//   // Initialize Speech Recognition
//   useEffect(() => {
  //     const SpeechRecognition =
  //       window.SpeechRecognition || window.webkitSpeechRecognition;
  //     if (!SpeechRecognition) {
    //       console.warn("Speech Recognition not supported in this browser");
    //       return;
    //     }
    
    //     const recognition = new SpeechRecognition();
    //     recognition.continuous = true;
    //     recognition.lang = "en-US";
    //     recognition.interimResults = true;
    
//     recognition.onstart = () => {
  //       console.log("🎤 Speech recognition started");
  //       setListening(true);
  //       isRecognizingRef.current = true;
  //     };

  //     recognition.onend = () => {
    //       console.log("🎤 Speech recognition ended");
    //       setListening(false);
    //       isRecognizingRef.current = false;
    //       if (!isSpeakingRef.current) {
      //         setTimeout(() => startRecognition(), 1000);
      //       }
      //     };
      
      //     recognition.onerror = (event) => {
        //       console.warn("Recognition error:", event.error);
        //       if (event.error !== "aborted") {
          //         setTimeout(() => startRecognition(), 2000);
          //       }
//     };

//     recognition.onresult = async (event) => {
//       const lastResult = event.results[event.results.length - 1];
//       if (!lastResult.isFinal) return;

//       const transcript = lastResult[0].transcript.trim();
//       setUserInputText(transcript);
//       setUserSpeaking(true);

//       const assistantName = (
  //         userData?.assistantName || "assistant"
  //       ).toLowerCase();
  //       if (transcript.toLowerCase().includes(assistantName)) {
    //         stopRecognition();
//         try {
  //           const data = await getGeminiResponse(transcript);
  //           setAssistantResponse(data.response);
  //           updateHistory(transcript, data.type || "text");
  //           handleCommand(data);
  //           speak(data.response);
//         } catch (err) {
//           console.error(err);
//           speak("Sorry, I encountered an error.");
//         }
//       }
//     };

//     recognitionRef.current = recognition;

//     // Start recognition after a delay
//     const initTimeout = setTimeout(() => {
  //       if (!isSpeakingRef.current) {
    //         startRecognition();
    //       }
    //     }, 2000);
    
//     return () => {
  //       clearTimeout(initTimeout);
//       stopRecognition();
//       if (synth.speaking) {
  //         synth.cancel();
  //       }
//     };
//   }, [userData?.assistantName, selectedVoice]);

//   // Close dropdown on click outside
//   useEffect(() => {
  //     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Voice Status Component
//   const VoiceStatus = () => (
  //     <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
//       {listening && (
  //         <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm bg-green-900 bg-opacity-30 px-3 py-1.5 rounded-full">
  //           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//           <MdMic className="text-green-400 text-sm sm:text-base" />
//           <span className="hidden xs:inline">Listening... Say </span>
//           <span className="font-semibold">
//             '{userData?.assistantName || "Assistant"}'
//           </span>
//         </div>
//       )}
//       {userSpeaking && (
  //         <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm bg-blue-900 bg-opacity-30 px-3 py-1.5 rounded-full">
  //           <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
  //           <FaUser className="text-blue-400 text-sm sm:text-base" />
  //           Processing your speech
  //         </div>
  //       )}
  //       {aiSpeaking && (
    //         <div className="flex items-center gap-2 text-purple-400 text-xs sm:text-sm bg-purple-900 bg-opacity-30 px-3 py-1.5 rounded-full">
    //           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
    //           <FaRobot className="text-purple-400 text-sm sm:text-base" />
    //           AI is speaking
    //         </div>
    //       )}
//     </div>
//   );

//   // Mobile Menu Component
//   const MobileMenu = () => (
  //     <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900/95 backdrop-blur-xl z-50 p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-xl font-bold text-white">Menu</h2>
//         <button
//           onClick={() => setMobileMenuOpen(false)}
//           className="text-gray-400 hover:text-white transition-colors p-2"
//         >
//           <MdCloseIcon className="text-2xl" />
//         </button>
//       </div>

//       {/* User Info */}
//       <div className="flex items-center gap-3 mb-6 p-4 bg-gray-800 rounded-2xl">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//           <MdPerson className="text-white text-xl" />
//         </div>
//         <div>
//           <h2 className="font-semibold text-white">
//             {userData?.name || "User"}
//           </h2>
//           <p className="text-xs text-gray-300 break-words">
//             {userData?.email || "No email available"}
//           </p>
//         </div>
//       </div>

//       {/* Voice Selection */}
//       <div className="mb-6">
//         <label className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-200">
//           <MdVolumeUp className="text-blue-400" />
//           Choose Voice:
//         </label>
//         <select
//           className="w-full bg-gray-700 border border-gray-600 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={selectedVoice?.name || ""}
//           onChange={(e) => {
  //             const voice = voiceOptions.find((v) => v.name === e.target.value);
//             setSelectedVoice(voice);
//             setMobileMenuOpen(false);
//           }}
//         >
//           {voiceOptions.map((v, idx) => (
  //             <option key={idx} value={v.name}>
  //               {v.name} ({v.lang})
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  
  //       {/* Menu Options */}
  //       <div className="space-y-3">
  //         <button
  //           onClick={() => {
    //             setMobileMenuOpen(false);
    //             navigateToCustomize();
    //           }}
    //           className="w-full text-left text-sm py-4 px-4 hover:bg-gray-800 rounded-xl transition-all flex items-center gap-3 group bg-gray-800/50"
    //         >
    //           <IoIosColorPalette className="text-purple-400 text-lg" />
    //           <span>Edit Assistant</span>
//         </button>

//         <button
//           onClick={() => {
  //             setMobileMenuOpen(false);
//             setShowHistory(true);
//           }}
//           className="w-full text-left text-sm py-4 px-4 hover:bg-gray-800 rounded-xl transition-all flex items-center gap-3 group bg-gray-800/50"
//         >
//           <MdHistory className="text-blue-400 text-lg" />
//           <span>View History</span>
//         </button>

//         <button
//           onClick={handleLogout}
//           className="w-full text-left text-sm py-4 px-4 hover:bg-red-600 rounded-xl transition-all flex items-center gap-3 group bg-red-600/20 text-red-400"
//         >
//           <MdLogout className="text-lg" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );

//   return (
  //     <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex">
  //       {/* Animated Background */}
  //       <div className="absolute inset-0 overflow-hidden">
  //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
  //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
  //       </div>
  
  //       {/* Main Content */}
  //       <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
  //         {/* Top Bar */}
//         <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//           {/* Left Side - Profile & Mobile Menu */}
//           <div className="flex items-center gap-3">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//             >
//               <MdMenu className="text-xl" />
//             </button>

//             {/* Profile Dropdown (Desktop) */}
//             <div className="hidden lg:block relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//                 className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//               >
//                 <MdPerson className="text-xl" />
//               </button>

//               {dropdownOpen && (
  //                 <div className="absolute left-0 mt-2 w-72 bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl text-white p-4 z-50">
  //                   <div className="flex items-center gap-3 mb-4">
  //                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
  //                       <MdPerson className="text-white text-lg" />
//                     </div>
//                     <div>
//                       <h2 className="font-semibold text-white">
//                         {userData?.name || "User"}
//                       </h2>
//                       <p className="text-xs text-gray-300 break-words">
//                         {userData?.email || "No email available"}
//                       </p>
//                     </div>
//                   </div>

//                   <hr className="border-gray-700 mb-4" />

//                   {/* Voice Selection */}
//                   <div className="mb-4">
//                     <label className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-200">
//                       <MdVolumeUp className="text-blue-400" />
//                       Choose Voice:
//                     </label>
//                     <select
//                       className="w-full bg-gray-700 border border-gray-600 rounded-xl p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={selectedVoice?.name || ""}
//                       onChange={(e) => {
  //                         const voice = voiceOptions.find(
    //                           (v) => v.name === e.target.value
    //                         );
    //                         setSelectedVoice(voice);
    //                       }}
    //                     >
//                       {voiceOptions.map((v, idx) => (
//                         <option key={idx} value={v.name}>
//                           {v.name} ({v.lang})
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <hr className="border-gray-700 mb-4" />

//                   {/* Settings Options */}
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => {
  //                         setDropdownOpen(false);
//                         navigateToCustomize();
//                       }}
//                       className="w-full text-left text-sm py-3 px-3 hover:bg-gray-700 rounded-xl transition-all flex items-center gap-3 group"
//                     >
//                       <IoIosColorPalette className="text-purple-400 text-lg group-hover:scale-110 transition-transform" />
//                       <span>Edit Assistant</span>
//                     </button>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left text-sm py-3 px-3 hover:bg-red-600 rounded-xl transition-all flex items-center gap-3 group mt-2"
//                     >
//                       <MdLogout className="text-red-400 text-lg group-hover:scale-110 transition-transform" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Control Buttons */}
//           <div className="flex items-center gap-2 sm:gap-3">
//             {/* History Toggle Button */}
//             <button
//               onClick={() => setShowHistory(!showHistory)}
//               className="text-white flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 sm:px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
//             >
//               <MdHistory className="text-lg" />
//               <span className="hidden sm:inline text-sm">History</span>
//             </button>

//             {/* Stop Speaking Button */}
//             {aiSpeaking && (
  //               <button
  //                 onClick={() => synth.cancel()}
  //                 className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
  //               >
  //                 <MdStop className="text-lg" />
//                 <span className="hidden sm:inline text-sm">Stop</span>
//               </button>
//             )}

//             {/* Logout Button (Desktop) */}
//             <button
//               onClick={handleLogout}
//               className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-white"
//             >
//               <MdLogout className="text-lg" />
//               <span className="text-sm">Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Assistant Section */}
//         <div className="text-center w-full max-w-2xl mt-8 sm:mt-0">
//           {/* Assistant Image */}
//           <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 border-2 border-purple-500/30 mb-6">
//             <img
//               src={userData?.assistantImage || "/default.jpg"}
//               alt="Assistant"
//               className="w-full h-full object-cover"
//             />

//             {aiSpeaking && (
  //               <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
  //                 <img
  //                   src={aiGif}
  //                   alt="AI Thinking"
  //                   className="w-full h-full object-cover"
  //                 />
  //               </div>
  //             )}

  //             <button
  //               onClick={navigateToCustomize}
  //               className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:scale-110 z-10"
//             >
//               <MdEdit className="text-white text-lg sm:text-xl" />
//             </button>
//           </div>

//           {/* Assistant Info */}
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 px-4">
//             {userData?.assistantName || "Your Assistant"}
//           </h1>

//           <VoiceStatus />

//           <p className="text-gray-300 text-base sm:text-lg mb-6 px-4">
//             Ready to assist you anytime 💬
//           </p>

//           {/* User GIF */}
//           {(userSpeaking || listening) && (
//             <div className="flex justify-center items-center mt-4 sm:mt-6">
//               <img
//                 src={userGif}
//                 alt="User Speaking"
//                 className="w-32 sm:w-48 rounded-2xl shadow-lg"
//               />
//             </div>
//           )}

//           {/* Assistant Response */}
//           {userInputText && (
//             <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-800 bg-opacity-50 rounded-2xl border border-purple-500/30 mb-6 backdrop-blur-sm mx-2">
//               {/* User Message - Left Aligned */}
//               <div className="mb-4 sm:mb-6">
//                 <h2 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 justify-start">
//                   <FaBrain className="text-purple-400" />
//                   <span className="text-sm sm:text-base">You:</span>
//                 </h2>
//                 <div className="flex justify-start">
//                   <p className="text-gray-200 italic text-sm sm:text-lg leading-relaxed bg-blue-900 bg-opacity-30 px-4 py-3 rounded-2xl max-w-[90%] sm:max-w-[80%] text-left border border-blue-500/30">
//                     "{userInputText}"
//                   </p>
//                 </div>
//               </div>

//               {/* Assistant Message - Right Aligned */}
//               <section className="mt-2">
//                 <h2 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 justify-end">
//                   <span className="text-sm sm:text-base">
//                     {userData?.assistantName || Assistants}:
//                   </span>
//                   <BsRobot className="text-purple-400" />
//                 </h2>
//                 <div className="flex justify-end">
//                   <p className="text-gray-200 italic text-sm sm:text-lg leading-relaxed bg-purple-900 bg-opacity-30 px-4 py-3 rounded-2xl max-w-[90%] sm:max-w-[80%] text-left border border-purple-500/30">
//                     "{assistantResponse}"
//                   </p>
//                 </div>
//               </section>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && <MobileMenu />}

//       {/* History Sidebar */}
//       {showHistory && (
  //         <div className="fixed inset-0 lg:relative lg:w-80 bg-gray-800/95 lg:bg-gray-800/90 backdrop-blur-xl border-l border-gray-700 h-full lg:h-full overflow-y-auto p-4 sm:p-6 z-40">
  //           <div className="flex items-center justify-between mb-6">
  //             <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
  //               <MdHistory className="text-purple-400" />
  //               Conversation History
  //             </h2>
  //             <button
  //               onClick={() => setShowHistory(false)}
  //               className="text-gray-400 hover:text-white transition-colors p-1"
  //             >
  //               <MdClose className="text-xl sm:text-2xl" />
  //             </button>
  //           </div>
  
//           {/* history */}
//           <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
//             {userData?.history
//               ?.slice(-10)
//               .reverse()
//               .map((item, idx) => (
  //                 <div
  //                   key={idx}
  //                   className="p-3 bg-gray-700/50 rounded-xl border border-gray-600 scroll-auto"
  //                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded">
//                       {item.type}
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       {item.timestamp}
//                     </span>
//                   </div>
//                   <p className="text-gray-200 text-sm">{item}</p>
//                 </div>
//               ))}
//             {(!userData?.history || userData.history.length === 0) && (
  //               <div className="text-center text-gray-400 py-8">
  //                 <FaRegCommentDots className="text-4xl mx-auto mb-3 opacity-50" />
  //                 <p>No conversation history yet</p>
  //               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

// ```````````````````````````````````````````````````````````````````````````````````
import React, { useContext, useState, useRef, useEffect } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdEdit,
  MdLogout,
  MdMic,
  MdMicOff,
  MdVolumeUp,
  MdVolumeOff,
  MdSend,
  MdClose,
  MdKeyboard,
  MdPerson,
  MdHistory,
  MdPlayArrow,
  MdStop,
  MdMenu,
  MdClose as MdCloseIcon,
} from "react-icons/md";
import { FaRobot, FaUser, FaRegCommentDots, FaBrain } from "react-icons/fa";
import { IoIosSettings, IoIosColorPalette } from "react-icons/io";
import axios from "axios";
import aiGif from "../assets/ai.gif";
import userGif from "../assets/user.gif";
import { BsRobot } from "react-icons/bs";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const [userInputText, setUserInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const dropdownRef = useRef();
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const hasGreetedRef = useRef(false);
  const synth = window.speechSynthesis;

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch voices for selection
  useEffect(() => {
    const loadVoices = () => {
      const voices = synth.getVoices();
      setVoiceOptions(voices);
      if (voices.length > 0) setSelectedVoice(voices[0]);
    };
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // Fixed Greeting Effect
  useEffect(() => {
    hasGreetedRef.current = false;

    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, []);

  // Improved Greeting Logic
  useEffect(() => {
    if (hasGreetedRef.current || !userData?.name) return;

    const isComingFromAuth = !location.state?.fromCustomize;

    if (isComingFromAuth) {
      const greeting = new SpeechSynthesisUtterance(
        `Hello ${userData.name}, what can I help you with?`
      );
      if (selectedVoice) greeting.voice = selectedVoice;

      greeting.onend = () => {
        hasGreetedRef.current = true;
      };

      greeting.onerror = () => {
        hasGreetedRef.current = true;
      };

      setTimeout(() => {
        if (!hasGreetedRef.current) {
          synth.speak(greeting);
          hasGreetedRef.current = true;
        }
      }, 1000);
    } else {
      hasGreetedRef.current = true;
    }
  }, [userData?.name, selectedVoice, location.state]);

  // Logout
  const handleLogout = async () => {
    try {
      if (synth.speaking) {
        synth.cancel();
      }
      stopRecognition();

      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      alert("Logout Successfully👋");
      setUserData(null);
      hasGreetedRef.current = false;
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out.");
    }
  };

  // Navigate to customize
  const navigateToCustomize = () => {
    navigate("/customize", { state: { fromHome: true } });
  };

  // Update userData history
  const updateHistory = (userMsg, type = "text") => {
    setUserData((prev) => ({
      ...prev,
      history: [
        ...(prev.history || []),
        { 
          type, 
          text: userMsg, 
          timestamp: new Date().toLocaleTimeString(),
          response: assistantResponse 
        },
      ],
    }));
  };

  // Send text input
  const handleSendInput = async () => {
    if (!userInputText.trim()) return;
    setLoading(true);
    setUserSpeaking(true);
    const transcript = userInputText.trim();

    try {
      const data = await getGeminiResponse(transcript);
      setAssistantResponse(data.response);
      updateHistory(transcript, data.type || "text");
      speak(data.response);
    } catch (err) {
      console.error(err);
      speak("Oops! Something went wrong.");
    } finally {
      setUserInputText("");
      setUserSpeaking(false);
      setLoading(false);
    }
  };

  // Speech Recognition
  const startRecognition = () => {
    if (
      !recognitionRef.current ||
      isRecognizingRef.current ||
      isSpeakingRef.current
    )
      return;
    try {
      recognitionRef.current.start();
      setListening(true);
      isRecognizingRef.current = true;
    } catch (error) {
      console.log("Recognition already started or error:", error);
    }
  };

  const stopRecognition = () => {
    if (!recognitionRef.current || !isRecognizingRef.current) return;
    try {
      recognitionRef.current.stop();
      setListening(false);
      isRecognizingRef.current = false;
    } catch (error) {
      console.log("Error stopping recognition:", error);
    }
  };

  // Speech Synthesis
  const speak = (text) => {
    stopRecognition();
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    isSpeakingRef.current = true;
    setAiSpeaking(true);

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setAiSpeaking(false);
      setTimeout(() => startRecognition(), 500);
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      setAiSpeaking(false);
      setTimeout(() => startRecognition(), 500);
    };

    synth.speak(utterance);
  };

  // Handle commands
  const handleCommand = (data) => {
    const { type, userInput } = data;
    if (!type) return;
    updateHistory(userInput, type);

    const encodedInput = encodeURIComponent(userInput || "");
    if (type === "google_search")
      window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
    else if (type === "youtube_search" || type === "youtube_play")
      window.open(
        `https://www.youtube.com/results?search_query=${encodedInput}`,
        "_blank"
      );
    else if (type === "calculator_open")
      window.open("https://www.google.com/search?q=calculator", "_blank");
    else if (type === "instagram_open")
      window.open("https://www.instagram.com", "_blank");
    else if (type === "facebook_open")
      window.open("https://www.facebook.com", "_blank");
    else if (type === "weather-show")
      window.open(`https://www.google.com/search?q=${encodedInput}`, "_blank");
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("🎤 Speech recognition started");
      setListening(true);
      isRecognizingRef.current = true;
    };

    recognition.onend = () => {
      console.log("🎤 Speech recognition ended");
      setListening(false);
      isRecognizingRef.current = false;
      if (!isSpeakingRef.current) {
        setTimeout(() => startRecognition(), 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      if (event.error !== "aborted") {
        setTimeout(() => startRecognition(), 2000);
      }
    };

    recognition.onresult = async (event) => {
      const lastResult = event.results[event.results.length - 1];
      if (!lastResult.isFinal) return;

      const transcript = lastResult[0].transcript.trim();
      setUserInputText(transcript);
      setUserSpeaking(true);

      const assistantName = (
        userData?.assistantName || "assistant"
      ).toLowerCase();
      if (transcript.toLowerCase().includes(assistantName)) {
        stopRecognition();
        try {
          const data = await getGeminiResponse(transcript);
          setAssistantResponse(data.response);
          updateHistory(transcript, data.type || "text");
          handleCommand(data);
          speak(data.response);
        } catch (err) {
          console.error(err);
          speak("Sorry, I encountered an error.");
        }
      }
    };

    recognitionRef.current = recognition;

    const initTimeout = setTimeout(() => {
      if (!isSpeakingRef.current) {
        startRecognition();
      }
    }, 2000);

    return () => {
      clearTimeout(initTimeout);
      stopRecognition();
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [userData?.assistantName, selectedVoice]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Voice Status Component
  const VoiceStatus = () => (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
      {listening && (
        <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm bg-green-900 bg-opacity-30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <MdMic className="text-green-400 text-sm sm:text-base" />
          <span className="hidden xs:inline">Listening... Say </span>
          <span className="font-semibold">
            '{userData?.assistantName || "Assistant"}'
          </span>
        </div>
      )}
      {userSpeaking && (
        <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm bg-blue-900 bg-opacity-30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <FaUser className="text-blue-400 text-sm sm:text-base" />
          Processing your speech
        </div>
      )}
      {aiSpeaking && (
        <div className="flex items-center gap-2 text-purple-400 text-xs sm:text-sm bg-purple-900 bg-opacity-30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <FaRobot className="text-purple-400 text-sm sm:text-base" />
          AI is speaking
        </div>
      )}
    </div>
  );

  // Mobile Menu Component
  const MobileMenu = () => (
    <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900/95 backdrop-blur-xl z-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Menu</h2>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <MdCloseIcon className="text-2xl" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-800 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <MdPerson className="text-white text-xl" />
        </div>
        <div>
          <h2 className="font-semibold text-white">
            {userData?.name || "User"}
          </h2>
          <p className="text-xs text-gray-300 break-words">
            {userData?.email || "No email available"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-200">
          <MdVolumeUp className="text-blue-400" />
          Choose Voice:
        </label>
        <select
          className="w-full bg-gray-700 border border-gray-600 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedVoice?.name || ""}
          onChange={(e) => {
            const voice = voiceOptions.find((v) => v.name === e.target.value);
            setSelectedVoice(voice);
            setMobileMenuOpen(false);
          }}
        >
          {voiceOptions.map((v, idx) => (
            <option key={idx} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            navigateToCustomize();
          }}
          className="w-full text-left text-sm py-4 px-4 hover:bg-gray-800 rounded-xl transition-all flex items-center gap-3 group bg-gray-800/50"
        >
          <IoIosColorPalette className="text-purple-400 text-lg" />
          <span>Edit Assistant</span>
        </button>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setShowHistory(true);
          }}
          className="w-full text-left text-sm py-4 px-4 hover:bg-gray-800 rounded-xl transition-all flex items-center gap-3 group bg-gray-800/50"
        >
          <MdHistory className="text-blue-400 text-lg" />
          <span>View History</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left text-sm py-4 px-4 hover:bg-red-600 rounded-xl transition-all flex items-center gap-3 group bg-red-600/20 text-red-400"
        >
          <MdLogout className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10 min-w-0">
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            {/* Left Side - Profile & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MdMenu className="text-xl" />
              </button>

              {/* Profile Dropdown (Desktop) */}
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <MdPerson className="text-xl" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl text-white p-4 z-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <MdPerson className="text-white text-lg" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white">
                          {userData?.name || "User"}
                        </h2>
                        <p className="text-xs text-gray-300 break-words">
                          {userData?.email || "No email available"}
                        </p>
                      </div>
                    </div>

                    <hr className="border-gray-700 mb-4" />

                    <div className="mb-4">
                      <label className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-200">
                        <MdVolumeUp className="text-blue-400" />
                        Choose Voice:
                      </label>
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedVoice?.name || ""}
                        onChange={(e) => {
                          const voice = voiceOptions.find(
                            (v) => v.name === e.target.value
                          );
                          setSelectedVoice(voice);
                        }}
                      >
                        {voiceOptions.map((v, idx) => (
                          <option key={idx} value={v.name}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                      </select>
                    </div>

                    <hr className="border-gray-700 mb-4" />

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigateToCustomize();
                        }}
                        className="w-full text-left text-sm py-3 px-3 hover:bg-gray-700 rounded-xl transition-all flex items-center gap-3 group"
                      >
                        <IoIosColorPalette className="text-purple-400 text-lg group-hover:scale-110 transition-transform" />
                        <span>Edit Assistant</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm py-3 px-3 hover:bg-red-600 rounded-xl transition-all flex items-center gap-3 group mt-2"
                      >
                        <MdLogout className="text-red-400 text-lg group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* History Toggle Button */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-white flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 sm:px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <MdHistory className="text-lg" />
                <span className="hidden sm:inline text-sm">History</span>
              </button>

              {/* Stop Speaking Button */}
              {aiSpeaking && (
                <button
                  onClick={() => synth.cancel()}
                  className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <MdStop className="text-lg" />
                  <span className="hidden sm:inline text-sm">Stop</span>
                </button>
              )}

              {/* Logout Button (Desktop) */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-white"
              >
                <MdLogout className="text-lg" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Assistant Section */}
          <div className="text-center w-full max-w-2xl mt-8 sm:mt-0">
            {/* Assistant Image */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 border-2 border-purple-500/30 mb-6">
              <img
                src={userData?.assistantImage || "/default.jpg"}
                alt="Assistant"
                className="w-full h-full object-cover"
              />

              {aiSpeaking && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <img
                    src={aiGif}
                    alt="AI Thinking"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <button
                onClick={navigateToCustomize}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:scale-110 z-10"
              >
                <MdEdit className="text-white text-lg sm:text-xl" />
              </button>
            </div>

            {/* Assistant Info */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 px-4">
              {userData?.assistantName || "Your Assistant"}
            </h1>

            <VoiceStatus />

            <p className="text-gray-300 text-base sm:text-lg mb-6 px-4">
              Ready to assist you anytime 💬
            </p>

            {/* User GIF */}
            {(userSpeaking || listening) && (
              <div className="flex justify-center items-center mt-4 sm:mt-6">
                <img
                  src={userGif}
                  alt="User Speaking"
                  className="w-32 sm:w-48 rounded-2xl shadow-lg"
                />
              </div>
            )}

            

            {/* Assistant Response */}
            {userInputText && (
              <div className="mt-6 p-4 sm:p-6 bg-gray-800 bg-opacity-50 rounded-2xl border border-purple-500/30 mb-6 backdrop-blur-sm mx-2">
                {/* User Message - Left Aligned */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 justify-start">
                    <FaBrain className="text-purple-400" />
                    <span className="text-sm sm:text-base">You:</span>
                  </h2>
                  <div className="flex justify-start">
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed bg-blue-900 bg-opacity-30 px-4 py-3 rounded-2xl max-w-[90%] sm:max-w-[80%] text-left border border-blue-500/30">
                      "{userInputText}"
                    </p>
                  </div>
                </div>

                {/* Assistant Message - Right Aligned */}
                <section className="mt-2">
                  <h2 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 justify-end">
                    <span className="text-sm sm:text-base">
                      {userData?.assistantName || "Assistant"}:
                    </span>
                    <BsRobot className="text-purple-400" />
                  </h2>
                  <div className="flex justify-end">
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed bg-purple-900 bg-opacity-30 px-4 py-3 rounded-2xl max-w-[90%] sm:max-w-[80%] text-left border border-purple-500/30">
                      "{assistantResponse}"
                    </p>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div className="fixed inset-0 lg:relative lg:min-w-80 bg-gray-900/95 lg:bg-gray-800/90 backdrop-blur-xl border-l border-gray-700 h-full overflow-y-auto z-40">
            <div className="p-4 sm:p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <MdHistory className="text-purple-400" />
                  Conversation History
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 lg:hidden"
                >
                  <MdClose className="text-xl sm:text-2xl" />
                </button>
                <button
                  onClick={() => setShowHistory(false)}
                  className="hidden lg:block text-gray-400 hover:text-white transition-colors p-1"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              {/* History Content */}
              <div className="space-y-3 h-[calc(100vh-120px)] overflow-y-auto pr-2">
                {userData?.history?.length > 0 ? (
                  [...userData.history]
                    .slice(-10)
                    .reverse()
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-700/50 rounded-xl border border-gray-600 hover:bg-gray-700/70 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded">
                            {item.type || 'message'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-200 text-sm break-words mb-2">
                          <strong>You:</strong> {typeof item === 'object' ? item.text : item}
                        </p>
                        {item.response && (
                          <p className="text-gray-300 text-sm break-words">
                            <strong>Assistant:</strong> {item.response}
                          </p>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <FaRegCommentDots className="text-4xl mx-auto mb-3 opacity-50" />
                    <p>No conversation history yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-50">
          <MobileMenu />
        </div>
      )}
    </div>
  );
}

export default Home;