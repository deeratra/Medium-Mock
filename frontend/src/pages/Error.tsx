export const Error = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-xl font-bold text-red-600 mb-4">Oops!</h2>
                <p className="text-gray-700">Something went wrong. Please try again later.</p>
            </div>
        </div>
    );
};