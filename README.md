# 🛡️ SafeTalk — AI-Powered Cyber Harassment & Abuse Detection Tool

SafeTalk is a full-stack web based tool that uses Artificial Intelligence to detect cyber harassment and abusive language in real-time chat. It provides intelligent intervention, automated safety controls, and a powerful admin panel for monitoring and reporting.

---

## 🚀 Features

- 🧠 AI-Based Abuse Detection — Every message is analyzed by an ML model to detect abusive language and harmful intent instantly.
- ⚡ Real-Time Intervention — Warning popups let users rephrase or send messages, reducing harmful communication.
- 🔒 Automatic & Manual Safety Controls — Users are auto-blocked after 3 abusive messages; manual block/unblock is also available.
- 🛠️ Admin Panel — Centralized dashboard for monitoring users, reviewing flagged content, and downloading reports.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot |
| AI Model | Python, Flask |
| Frontend | ReactJS |
| Database | MySQL |

---

## 📁 Folder Structure


CyberHarassmentAbuseDetectionTool/
│
├── .vscode/
│
├── ai-model/                          # Python Flask AI microservice
│   ├── frontend/                      # React frontend application
│   │   ├── node_modules/
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ChatMessage.css
│   │   │   │   ├── ChatMessage.js
│   │   │   │   ├── ChatWindow.css
│   │   │   │   ├── ChatWindow.js
│   │   │   │   ├── Header.js
│   │   │   │   ├── MessageInput.css
│   │   │   │   ├── MessageInput.js
│   │   │   │   ├── Navbar.css
│   │   │   │   └── Navbar.js
│   │   │   ├── pages/
│   │   │   │   ├── about/
│   │   │   │   │   ├── About.css
│   │   │   │   │   ├── About.js
│   │   │   │   │   └── MyImage.png
│   │   │   │   ├── admin/
│   │   │   │   │   ├── AbuseLogsPage.js
│   │   │   │   │   ├── AbuseLogsTable.js
│   │   │   │   │   ├── Admin.css
│   │   │   │   │   ├── AdminDashboard.js
│   │   │   │   │   ├── AdminLayout.js
│   │   │   │   │   ├── BlockedUsersPage.js
│   │   │   │   │   ├── BlockedUsersTable.js
│   │   │   │   │   └── BlockHistoryTable.js
│   │   │   │   ├── chat/
│   │   │   │   │   ├── ChatPage.css
│   │   │   │   │   └── ChatPage.js
│   │   │   │   └── home/
│   │   │   │       ├── Home.css
│   │   │   │       └── Home.js
│   │   │   ├── App.js
│   │   │   ├── App.test.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   ├── logo.svg
│   │   │   ├── reportWebVitals.js
│   │   │   ├── setupTests.js
│   │   │   └── Sidebar.js
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── README.md
│   ├── venv/                          # Python virtual environment
│   │   ├── Include/
│   │   ├── Lib/
│   │   ├── Scripts/
│   │   ├── .gitignore
│   │   └── pyvenv.cfg
│   ├── app.py                         # Flask API entry point
│   ├── append.py
│   ├── cdb.py
│   ├── id.py
│   ├── model.pkl                      # Trained ML model
│   ├── tfidf_vectorizer.pkl
│   ├── train_model.py                 # Model training script
│   ├── train.csv                      # Training dataset
│   ├── uifrontend.code-workspace
│   └── vectorizer.pkl
│
├── backend/                           # Spring Boot backend
│   ├── .mvn/
│   ├── .vscode/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AbusiveTextController.java
│   │   │   │   │   ├── AdminController.java
│   │   │   │   │   └── cyber/
│   │   │   │   ├── model/
│   │   │   │   │   ├── AbuseLog.java
│   │   │   │   │   ├── AbusiveMessage.java
│   │   │   │   │   ├── BlockedUser.java
│   │   │   │   │   ├── BlockHistory.java
│   │   │   │   │   └── MessageDTO.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── AbuseLogRepository.java
│   │   │   │   │   ├── AbusiveTextRepository.java
│   │   │   │   │   ├── BlockedUserRepository.java
│   │   │   │   │   └── BlockHistoryRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AbusiveService.java
│   │   │   │   │   └── AdminService.java
│   │   │   │   └── DemoApplication.java
│   │   │   └── resources/
│   │   └── test/
│   ├── target/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── demo/
└── README.md

---

## ⚙️ How It Works

1. A user sends a chat message.
2. The message is analyzed by the AI Flask model for abusive content.
3. If abuse is detected, a **warning popup** appears giving the user options to **Rephrase** or **Send Anyway**.
4. Alerts and safety recommendations are generated in real time.
5. After 3 abusive messages, the offending user is automatically blocked.
6. Users and admins also have **manual block/unblock controls.

---

## 🛠️ Admin Panel

## Features

| Feature                  | Description                                                   |
|--------------------------|---------------------------------------------------------------|
| Abuse Evidence Management | Stores abusive messages with severity, date, time, count, and user |
| Blocked Users Table       | Displays username, block date, time, and reason             |
| Dashboard Analytics       | Shows total abusive messages, blocked users, and report timestamps |
| Downloadable Reports      | Export abuse evidence and blocked user data for analysis     |
---

## 🎯 Project Objective

The goal of SafeTalk is to demonstrate the ethical and practical application of Artificial Intelligence in detecting cyber harassment, preventing repeated abuse, and empowering both users and administrators to maintain safer online interactions.

---

## 🏁 Getting Started

### Prerequisites

- Java 17+
- Node.js & npm
- Python 3.x
- MySQL

### Frontend Setup

```bash
cd ai-model/frontend
npm start
```

Frontend runs at `http://localhost:3000`

### AI Model (Flask) Setup

- open project folder on command prompt 
- cd ai-model
- venv\Scripts\activate
- python app.py
  
Flask Backend will be available at `http://localhost:5000`


### Backend Setup (Spring Boot)

Import the Maven project into your IDE and run the main application class:

DemoApplication.java

Spring Boot backend will be available at `http://localhost:8080`


## 📄 License

This project is built for academic/demonstration purposes.

## ⚠️ Disclaimer

This project uses a dataset that includes terms and phrases commonly associated with harassment and abusive language for the purpose of training and evaluating detection model. These examples were included solely for academic, research, and educational use.

> I do not condone or promote any form of harassment, abuse, or offensive behavior. The dataset is used only to help machines learn how to detect and prevent such content in real-world scenarios.

If you find any content offensive, please understand that it has been included strictly for the development of a safety-focused AI system.

## 🎥 Project Demo Video
Watch the demo here: 
https://drive.google.com/file/d/1xWIwUONuN5fgr5gGdKc3DrDi4KWFQva6/view?usp=sharing


## 👩‍💻 Developed By

SHRAVANI N. DESHMUKH 
Final Year B.E (IT)  
Prof. Ram Meghe Institute of Technology and Research, Amravati  
📧 Email: shravani12d@gmail.com
🔗 GitHub: https://github.com/shravani12d
