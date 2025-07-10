# 🛡️ Cyber Harassment and Abuse Detection Tool

A full-stack web application that helps detect and prevent cyber harassment in real time. This tool uses a keyword-based detection system combined with an AI model (optional) to monitor and flag abusive messages in chat environments. A built-in auto-blocking mechanism stops harmful users after repeated offenses.

---

## 🚀 Key Features

- 🔍 *Real-time abuse detection* in chat messages
- 🛑 *Auto-blocking system* for repeated offenders
- 🎨 *Simple and responsive chat UI* (SafeTalk)
- ⚙ *Backend APIs* built using Spring Boot
- 🧠 *Optional AI model* integration using Flask for advanced abuse classification (future scope)

---

## 🧱 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React.js (SafeTalk UI)   |
| Backend    | Spring Boot (Java)       |
| AI Model   | Python + Flask (optional) |
| Database   | MySQL                    |
| Tools      | GitHub, VSCode, Postman  |

---

## 📁 Folder Structure


Cyber-Harassment-and-Abuse-Detection-Tool/
├── backend/                 # Spring Boot project
│   ├── src/
│   └── pom.xml
├── frontend/                # React.js app (SafeTalk)
│   ├── src/
│   ├── public/
│   └── package.json
├── .vscode/
├── .gitignore
├── README.md


---

## 🛠 Getting Started

### 🔹 Backend (Spring Boot)

bash
cd backend
./mvnw spring-boot:run


> API will be available at: (http://localhost:8080)

---

### 🔹 Frontend (React - SafeTalk)

bash
cd frontend
npm install
npm start


> App opens at: (http://localhost:3000)

---

## 🔮 Future Enhancements

- 📱 Mobile-friendly responsive UI
- 🔔 Notification system for abuse flags
- 🌐 Multilingual abuse filtering
- 👮 Admin panel for managing abusive words (to be developed)

---

## ⚠️ Disclaimer

This project uses a dataset that includes terms and phrases commonly associated with harassment and abusive language for the purpose of training and evaluating detection models. These examples were included solely for academic, research, and educational use.

> We do not condone or promote any form of harassment, abuse, or offensive behavior. The dataset is used only to help machines learn how to detect and prevent such content in real-world scenarios.

If you find any content offensive, please understand that it has been included strictly for the development of a safety-focused AI system.


## 👩‍💻 Developed By

SHRAVANI N. DESHMUKH 
Final Year B.E (IT)  
Prof. Ram Meghe Institute of Technology and Research, Amravati  
📧 Email: shravani12d@gmail.com
🔗 GitHub: https://github.com/shravani12d

---



