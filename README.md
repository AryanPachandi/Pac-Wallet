

# 💳 Pac-Wallet

Pac-Wallet is a full-stack digital wallet application that allows users to securely manage balances, make transactions, and integrate payment gateways in a sandbox/testing environment.

Built to understand real-world fintech flows like authentication, payments, security, and scalable backend design.

---

## 🚀 Features

* 🔐 Secure user authentication (JWT + HTTP-only cookies)
* 💰 Wallet balance management
* 📤 Send & receive money between users
* 🧪 Payment gateway sandbox integrations (for testing)
* 📜 Transaction history
* ⚡ Fast REST APIs with Node.js & Express
* 🗄 MongoDB database

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

**Tools**

* Git & GitHub
* Postman
* Docker (optional)

---

## 📂 Project Structure

```
Pac-Wallet/
│
├── routes/
├── models/
├── middleware/
├── package.json
└── server.js
```

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/AryanPachandi/Pac-Wallet.git
cd Pac-Wallet
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

---

## 📡 API Endpoints (sample)

| Method | Route                | Description   |
| ------ | -------------------- | ------------- |
| POST   | /api/auth/register   | Register user |
| POST   | /api/auth/login      | Login user    |
| GET    | /api/wallet/balance  | Get balance   |
| POST   | /api/wallet/transfer | Send money    |
| GET    | /api/wallet/history  | Transactions  |

---

## 🔐 Security Practices Used

* Password hashing (bcrypt)
* JWT authentication
* HTTP-only cookies
* Protected routes middleware
* Input validation

---

## 🎯 Purpose of the Project

Pac-Wallet was built to:

* Learn real fintech backend flows
* Practice secure authentication
* Work with payment SDK sandboxes
* Build scalable REST APIs


---

## 📈 Future Improvements

* Payment gateway live integration
* QR code payments
* Admin dashboard
* Two-factor authentication
* WebSocket real-time transactions

---

## 👨‍💻 Author

**Aryan Pachandi**
Full Stack Developer | Backend & DevOps Focus

GitHub: [https://github.com/AryanPachandi](https://github.com/AryanPachandi)

