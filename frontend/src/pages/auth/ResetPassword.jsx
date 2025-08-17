//* src/pages/auth/ResetPassword.jsx

import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";

import { resetPassword } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/PasswordInput";

const ResetPassword = () => {
	const { token } = useParams();
	const { setIsAuthenticated, setUser } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	// Function to handle reset password form submission
	const handleRestPassword = async ({ password, confirmPassword }) => {
		try {
			const response = await resetPassword(token, password, confirmPassword);
			toast.success(response?.data?.message || "Password reset successfully");

			setUser(response?.data?.user);
			setIsAuthenticated(true);

			reset();
			navigate("/login", { replace: true });
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Reset failed. Please try again.";
			toast.error(message);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleRestPassword)}>
			<div className="h-screen flex justify-center items-center">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2">
					<h1 className="text-2xl font-bold mb-2 text-center">
						Reset Password
					</h1>

					<PasswordInput
						id="password"
						type="password"
						label="Password"
						icon={Lock}
						error={errors.password}
						placeholder="Enter your new password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters",
							},
						})}
					/>

					<PasswordInput
						id="confirmPassword"
						type="password"
						label="Confirm Password"
						icon={Lock}
						error={errors.confirmPassword}
						placeholder="Enter your confirm password"
						{...register("confirmPassword", {
							required: "Confirm password is required",
							validate: (value) =>
								value === watch("password") || "Passwords do not match",
						})}
					/>

					<button
						type="submit"
						className="btn btn-neutral mt-4"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
