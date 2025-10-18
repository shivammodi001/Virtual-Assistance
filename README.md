# Virtual Assistant 🤖

A sophisticated AI-powered virtual assistant built with **React.js** frontend and **Express.js** backend, integrated with **MongoDB**. The assistant supports **voice recognition**, **text-to-speech**, and **intelligent command handling** using Google’s **Gemini AI**.

![Virtual Assistant Demo](https://img.shields.io/badge/Virtual-Assistant-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

---

## 🖼️ Project Screenshot

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/427ac759-1419-476e-acc9-263a11ef66dc" />

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/3198511d-22fb-4df1-ada7-1f53e2f1c3f5" />


---

## 🌟 Features

### 🎙️ Voice Interaction
- **Speech Recognition**: Continuous listening for voice commands  
- **Text-to-Speech**: Natural voice responses  
- **Wake Word Detection**: Activates when assistant's name is mentioned  
- **Multi-language Support**: Configurable voice options  

### 💬 Smart Commands
- **Web Search**: “Search for [query]” or “Google [topic]”  
- **YouTube Integration**: “Play [video]” or “Search YouTube for [content]”  
- **Social Media**: Quick access to Instagram, Facebook  
- **Utilities**: Calculator, weather information  
- **Custom Actions**: Extensible command system  

### 👤 User Management
- **Secure Authentication**: JWT-based login system  
- **User Profiles**: Personalized assistant experience  
- **Conversation History**: Persistent chat history  
- **Customizable Assistant**: Personalize name and appearance  

### 🎨 Modern UI/UX
- **Responsive Design**: Works on all devices  
- **Real-time Status**: Visual indicators for listening/speaking states  
- **Interactive History**: Scrollable conversation timeline  
- **Dark Theme**: Eye-friendly interface  

---

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework  
- **Tailwind CSS** - Styling  
- **React Router** - Navigation  
- **Web Speech API** - Voice features  
- **Axios** - HTTP client  

### Backend
- **Node.js** - Runtime environment  
- **Express.js** - Web framework  
- **MongoDB** - Database  
- **Mongoose** - ODM  
- **JWT** - Authentication  
- **bcrypt** - Password hashing  
- **CORS** - Cross-origin requests  
- **Cloudinary** - Image storage  

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher)  
- **MongoDB** (local or Atlas)  
- **Modern browser** with Web Speech API support  

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/virtual-assistant.git
cd virtual-assistant
```

---

### 2. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Create .env file with:
REACT_APP_SERVER_URL=http://localhost:8000

# Start development server
npm start
```

---

### 3. Setup Backend
```bash
cd ../backend

# Install dependencies
npm install

# Create .env file with:
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_URL=your_gemini_api_url

# Start backend server
npm run dev
```

---

## 🚀 Run the Project
- Start **backend** on port `8000`  
- Start **frontend** on port `5173` (default for Vite)  
- Open `http://localhost:5173` in your browser  

---

## 💡 Future Enhancements
- Integration with OpenAI API  
- Add calendar and reminder support  
- Implement email and notification handling  
- Expand to mobile using React Native  

---

## 🧑‍💻 Author
**Shivam Modi**  
Full Stack Developer | AI Enthusiast | Powerlifter 💪  


---

## 🪪 License
This project is licensed under the **MIT License** — feel free to use and modify.
