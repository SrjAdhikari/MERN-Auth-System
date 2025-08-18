//* src/pages/error/NotFound.jsx

import { useNavigate } from "react-router";
import { SearchX } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
			<SearchX className="w-20 h-20 text-error mb-4" />
			<h1 className="text-4xl font-bold text-error mb-2">
				404 - Page Not Found
			</h1>
			<p className="text-lg text-gray-600 mb-6">
				The page you're looking for doesn't exist or has been moved.
			</p>

			<button onClick={() => navigate(-1)} className="btn btn-primary">
				Go Back
			</button>
		</div>
	);
};

export default NotFound;
