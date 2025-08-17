//* src/pages/auth/VerifyOtp.jsx

import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { verifyOtp } from "../../api/authApi";

const VerifyOtp = () => {
	const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
	const navigate = useNavigate();
	const { email } = useParams();

	const [code, setCode] = useState(Array(5).fill(""));
	const [submitting, setSubmitting] = useState(false);

	const inputRef = useRef([]);

	// Autofocus on first input field when the page mounts
	useEffect(() => {
		inputRef.current[0]?.focus();
	}, []);

	// Function to handle OTP input
	const handleChange = (value, index) => {
		// Allow only numbers
		if (!/^\d*$/.test(value)) return;

		// Update the OTP code
		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Move focus to the next input field if user typed a digit
		if (value && index < code.length - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	// Function to handle keydown event on input fields
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && code[index] === "" && index > 0) {
			inputRef.current[index - 1]?.focus();
		}
	};

	// Function to handle OTP verification
	const handleVerifyOtp = async (e) => {
		e.preventDefault();

		const enteredOtp = code.join("");
		if (enteredOtp.length !== 5) {
			toast.error("Please enter a 5-digit OTP.");
			return;
		}

		setSubmitting(true);

		try {
			const response = await verifyOtp(email, enteredOtp);
			toast.success(response?.data?.message || "Account verified.");

			setUser(response?.data?.user);
			setIsAuthenticated(true);

			navigate("/profile");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Verification failed. Please try again.";
			toast.error(message);

			setUser(null);
			setIsAuthenticated(false);
		} finally {
			setSubmitting(false);
		}
	};

	// Auto-submit OTP when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleVerifyOtp(new Event("submit"));
		}
	}, [code]);

	// Redirect to profile page if user is authenticated
	if (isAuthenticated) {
		return <Navigate to="/profile" replace />;
	}

	return (
		<div className="h-screen flex justify-center items-center">
			<form
				onSubmit={handleVerifyOtp}
				className="p-6 rounded-lg bg-transparent shadow-lg w-80 text-center"
			>
				<h1 className="text-2xl font-bold mb-2">OTP Verification</h1>
				<p className="mb-2 text-gray-600">
					Enter the 5-digit OTP sent to your email address.
				</p>

				<div className="flex justify-between mb-4">
					{code.map((digit, index) => (
						<input
							key={index}
							ref={(el) => (inputRef.current[index] = el)}
							type="text"
							maxLength="1"
							value={digit}
							inputMode="numeric"
							onChange={(e) => handleChange(e.target.value, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl focus:outline-none focus:border-green-500"
						/>
					))}
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
					disabled={submitting}
				>
					{submitting ? "Verifying..." : "Verify OTP"}
				</button>
			</form>
		</div>
	);
};

export default VerifyOtp;
