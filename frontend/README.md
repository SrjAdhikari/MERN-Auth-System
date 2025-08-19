# MERN Authentication System – Frontend

<div align="center">  
  <div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/daisyUI-1C7ED6?style=for-the-badge&logo=daisyui&logoColor=white" alt="daisyUI" />
  </div>
</div>

---

This is the frontend client for the MERN Authentication System, built with React (Vite), React Hook Form, Axios, React Router, and React Toastify, styled with Tailwind CSS and daisyUI. It communicates with the backend REST API for user authentication, OTP verification, password reset, and profile management.

---

### 🚀 Features

- User authentication (Login, Register, Logout)
- OTP-based email verification
- Forgot/reset password flow
- Protected profile page for authenticated users
- Global authentication state via `AuthContext`
- Centralized API wrapper with consistent error handling
- Toast notifications for user feedback (React Toastify)
- Responsive UI with Tailwind CSS and daisyUI
- Display of user role and verification status in profile

---

### 🛠️ Tech Stack

- **React**: UI library (version 18, powered by Vite for fast builds)
- **React Router**: Client-side routing
- **React Hook Form**: Form validation and management
- **Axios**: HTTP client for API requests
- **React Toastify**: Notification system
- **Lucide React**: Icon library
- **Tailwind CSS + daisyUI**: Utility-first styling and UI components

---

### 📂 Folder Structure

```
src/
├── api/
│   └── authApi.js          # API functions for auth (login, register, logout, etc.)
├── components/
│   ├── FormInput.jsx       # Reusable input with label, error, and icon
│   └── PasswordInput.jsx   # Password input with show/hide toggle
├── config/
│   └── axiosClient.js      # Axios instance with baseURL and interceptors
├── context/
│   └── AuthContext.jsx     # Global authentication state (user, isAuthenticated)
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── VerifyOtp.jsx
│   ├── error/
│   │   └── NotFound.jsx
│   └── user/
│       └── Profile.jsx
├── App.jsx                 # Centralized route setup
├── main.jsx                # React application entry point
└── index.css               # Global styles with Tailwind and daisyUI
```

---

### 🔐 Environment Variables

Create a `.env` file in the root of the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

---

### 🧑‍💻 Development Notes

- **Forms**: Managed with `react-hook-form` for client-side validation and submission handling.
- **Notifications**: `react-toastify` displays success/error messages for all API interactions.
- **API Calls**: Wrapped in `authApi.js` using an Axios instance (`axiosClient.js`) with interceptors for error handling.
- **Auth State**: `AuthContext` provides global state (`user`, `isAuthenticated`) and updates on login/logout.
- **Route Protection**: Protected routes (e.g., `/profile`) use `AuthContext` to check `isAuthenticated` and redirect to `/login` if unauthorized.
- **Styling**: Tailwind CSS and daisyUI ensure responsive, consistent UI.

---

### 🧹 Code Conventions

- **Components**: Reusable components (e.g., `FormInput.jsx`, `PasswordInput.jsx`) stored in `/components`.
- **API Calls**: Defined in `/api/authApi.js` using the Axios wrapper in `/config/axiosClient.js`.
- **Forms**: Use `react-hook-form` with validation rules (e.g., required, email format).
- **Routing**: Centralized in `App.jsx` using React Router’s `BrowserRouter` and `Route`.
- **Auth State**: Managed via `AuthContext` to track user authentication and data.

---

### 🛡️ Security Best Practices

- **HttpOnly Cookies**: Tokens are stored in HttpOnly cookies by the backend, preventing XSS access.
- **Input Validation**: Client-side validation with `react-hook-form` complements backend validation.
- **Secure API Calls**: Axios configured with a base URL and interceptors for error handling.

---
