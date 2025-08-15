//* src/config/axiosClient.js

import axios from "axios";

// Backend API URL
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// Axios Client with credentials
const axiosClient = axios.create({
	baseURL: BASE_URL,

	headers: {
		// backend expects JSON (body-parser)
		"Content-Type": "application/json",
	},

	// sends the session cookie (JWT in httpOnly cookie) from frontend -> backend AND accepts cookies back from backend.
	withCredentials: true,
});

export default axiosClient;
