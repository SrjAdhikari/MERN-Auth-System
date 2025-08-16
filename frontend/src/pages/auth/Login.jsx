//* src/pages/auth/Login.jsx

import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authApi";
import FormInput from "../../components/FormInput";
import PasswordInput from "../../components/PasswordInput";

const Login = () => {
	const { setIsAuthenticated, setUser } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Function to handle login form submission
	const handleLogin = async ({ email, password }) => {
		try {
			// Call login API endpoint with email and password
			const response = await login(email, password);
			toast.success(response?.data?.message || "Login successful");

			setUser(response?.data?.user);
			setIsAuthenticated(true);

			reset();
			navigate("/profile");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Login failed. Please try again.";
			toast.error(message);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<div className="h-screen flex justify-center items-center">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2">
					<h1 className="text-2xl font-bold mb-2 text-center">Login</h1>

					<FormInput
						id="email"
						type="email"
						label="Email"
						icon={Mail}
						error={errors.email}
						placeholder="Enter your email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						})}
					/>

					<PasswordInput
						id="password"
						type="password"
						label="Password"
						icon={Lock}
						error={errors.password}
						placeholder="Enter your password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters",
							},
						})}
					/>

					<div className="flex justify-between">
						<Link to="/password/forgot" className="link link-primary">
							Forgot Password?
						</Link>

						<Link to="/register" className="link link-primary">
							Sign Up
						</Link>
					</div>

					<button
						type="submit"
						className="btn btn-neutral"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
				</fieldset>
			</div>
		</form>
	);
};

export default Login;
