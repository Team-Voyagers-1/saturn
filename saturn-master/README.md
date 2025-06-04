# 🌐 Voyager Frontend – React + TSX + Ant Design

This is the frontend client for **Project Voyager** — a tool to simplify the Software Development Life Cycle (SDLC) by automating the creation of user stories and epics on JIRA.

---

## 🚀 Part 1: What This Application Is & What It Does

**Saturn** is built using **React (with TypeScript)** and styled using **Ant Design (antd)**. It interacts with the Django REST API backend to:

- Register and authenticate users
- Provide secure access to project features
- Serve as the user interface for uploading business inputs
- Display user-generated stories and epics (upcoming)

Ultimately, it serves as the interface where product managers, analysts, and business users can interact with Voyager.

---

## 🛠️ Part 2: Setup Instructions

```
# 1. Clone the repository
git clone https://github.com/Team-Voyagers-1/saturn.git
cd saturn

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

> Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## 📘 Part 3: Features & Routes

### 📥 Public Routes

| Route       | Component      | Description          |
| ----------- | -------------- | -------------------- |
| `/login`    | `Login.tsx`    | Login page for users |
| `/register` | `Register.tsx` | Registration form    |

### 🔐 Private Route

| Route | Component      | Access                    | Description             |
| ----- | -------------- | ------------------------- | ----------------------- |
| `/`   | `HomePage.tsx` | Requires login (JWT auth) | Main homepage/dashboard |

> Private routes are protected using JWT token stored in `localStorage`.

---

## 🎨 UI Components

- All forms (login/register) are rendered inside **Ant Design Cards**
- Buttons, inputs, and alerts use `antd` for consistent design
- Responsive layout with minimal boilerplate

---
