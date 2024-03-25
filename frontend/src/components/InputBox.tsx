import { ChangeEvent } from "react";

interface InputBoxType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string // New prop to receive validation error message
}

export const InputBox = ({ label, placeholder, onChange, type = "text", error }: InputBoxType) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 text-xl">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>} {/* Render error message if exists */}
        </div>
    );
}