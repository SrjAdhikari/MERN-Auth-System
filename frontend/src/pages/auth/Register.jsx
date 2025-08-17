//* src/pages/auth/Register.jsx

import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { signup } from "../../api/authApi";

import { UserCircle2, Mail, Lock } from "lucide-react";
import FormInput from "../../components/FormInput";
import PasswordInput from "../../components/PasswordInput";

const Register = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// Redirect to profile page if user is authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated, navigate]);

	// Function to handle register form submission
	const handleRegister = async ({ name, email, password }) => {
		try {
			const response = await signup(name, email, password);
			toast.success(response?.data?.message);
			console.log("User:", response?.data?.message);

			reset();
			navigate(`/otp/verification/${email}`);
		} catch (error) {
			const message =
				err?.response?.data?.message ||
				err?.message ||
				"Registration failed. Please try again.";
			toast.error(message);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleRegister)}>
			<div className="h-screen flex justify-center items-center">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2">
					<h1 className="text-2xl font-bold mb-2 text-center">Register</h1>

					<FormInput
						id="name"
						type="text"
						label="Name"
						icon={UserCircle2}
						error={errors.name}
						placeholder="Enter your name"
						{...register("name", {
							required: "Name is required",
							pattern: {
								value: /^[A-Za-z0-9 _]{2,}$/,
								message: "containing only letters, numbers and spaces",
							},
						})}
					/>

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

					<button
						type="submit"
						className="btn btn-neutral"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Creating account..." : "Register"}
					</button>

					<p className="text-center">
						Already have an account?
						<Link to="/login" className="link link-primary ml-1">
							Login
						</Link>
					</p>
				</fieldset>
			</div>
		</form>
	);
};

export default Register;
