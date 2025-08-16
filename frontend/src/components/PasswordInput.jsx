import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(
	({ id, label, icon: Icon, error, ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div className="space-y-1">
				{label && (
					<label htmlFor={id} className="label text-sm">
						{label}
					</label>
				)}

				<div className="relative">
					{Icon && (
						<div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10">
							<Icon size={18} className="opacity-60" />
						</div>
					)}

					<input
						id={id}
						ref={ref}
            {...rest}
						type={showPassword ? "text" : "password"}
						aria-invalid={!!error}
						className={`input w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							Icon ? "pl-12" : "pl-4"
						}`}
					/>

					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-40 z-10 hover:opacity-70 transition-colors cursor-pointer"
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
					</button>
				</div>

				{error && <p className="text-sm text-error">{error.message}</p>}
			</div>
		);
	}
);

export default PasswordInput;
