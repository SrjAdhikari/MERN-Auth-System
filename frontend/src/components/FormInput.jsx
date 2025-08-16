import { forwardRef } from "react";

const FormInput = forwardRef(
	({ id, label, icon: Icon, error, ...rest }, ref) => {
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
						aria-invalid={!!error}
						className={`input w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							Icon ? "pl-12" : "pl-4"
						}`}
					/>
				</div>

				{error && <p className="text-sm text-error">{error.message}</p>}
			</div>
		);
	}
);

export default FormInput;
