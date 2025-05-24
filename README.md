# Feedback App

A feedback collection application built with **React**, **Flask**, and **MongoDB**. Users can submit feedback through a simple UI, and feedback entries are stored and managed using a Flask API backed by MongoDB.

---

## 🌐 Live Demo

- 🔗 Frontend: [https://client-bice-six.vercel.app/](https://client-bice-six.vercel.app/)
- 🔗 Backend API: [https://server-ihca.onrender.com/feedback](https://server-ihca.onrender.com/feedback)

---

## 🗂 Folder Structure
```
feedback-app/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ └── package.json
│
├── server/ # Flask backend
│ ├── app.py
│ ├── requirements.txt
│ └── .env (local only)
```


---

## 🚀 Stack

- **Frontend:** React
- **Backend:** Flask (Python), Flask-CORS
- **Database:** MongoDB (Cloud via MongoDB Atlas)

---

## 🔧 Local Setup Instructions

### 📁 Clone the Repository

```bash
git clone https://github.com/mevamsireddy/feedback-app.git
cd feedback-app
```
🖥️ Frontend (React)
```bash
cd client
npm install
npm run dev  # Runs on http://localhost:3000
```
⚙️ Backend (Flask)
1. Create a virtual environment and activate:
```bash
cd ../server
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```
2. Install dependencies:
```
pip install -r requirements.txt
```
4. Set up environment variable in .env:
Create a file named .env in the server/ folder:
```
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/feedbackDB?retryWrites=true&w=majority
```
6. Run the server:
```
python app.py  # Runs on http://localhost:5000
```
## 🌐 Deployment Notes
✅ Frontend (Vercel)
- Deployed via Vercel from the client/ folder.
- Update .env in Vercel with the server URL if needed.

✅ Backend (Render)
- Deploy using server/ folder.
- Add MONGO_URI as an environment variable on Render dashboard.

📬 API Endpoints
- POST	/feedback	- Submit new feedback
- GET	/feedback	- Get all feedback entries

