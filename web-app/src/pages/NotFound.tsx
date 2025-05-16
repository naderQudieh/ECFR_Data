import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Not found";
    });
    const handleClick = () => {
        navigate("/");
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-lg"> </p>
            <button
                onClick={handleClick}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >

            </button>
        </div>
    );
}