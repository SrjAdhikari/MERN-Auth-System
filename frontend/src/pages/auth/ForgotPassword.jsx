//* src/pages/auth/ForgotPassword.jsx

import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

import { forgotPassword } from "../../api/authApi";
import FormInput from "../../components/FormInput";

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	// Function to handle forgot password form submission
	const handleForgotPassword = async ({ email }) => {
		try {
			const response = await forgotPassword(email);
			toast.success(response?.data?.message);

			reset();
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Request failed. Please try again.";
			toast.error(message);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleForgotPassword)}>
			<div className="h-screen flex justify-center items-center">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2">
					<div className="flex flex-col gap-1 items-center">
						<h1 className="text-2xl font-bold">Forgot Password</h1>

						<p className="mb-2 text-gray-600">
							Enter your email to receive a password reset link.
						</p>
					</div>

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
					

					<button
						type="submit"
						className="btn btn-neutral mt-4"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Sending..." : "Send Reset Link"}
					</button>

					<p className="text-sm text-center">
						<Link to="/login" className="link link-primary">
							Back to login
						</Link>
					</p>
				</fieldset>
			</div>
		</form>
	);
};

export default ForgotPassword;
