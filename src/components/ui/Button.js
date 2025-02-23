import React from "react";

export function Button({ children, onClick, className = "", disabled = false, variant = "default" }) {
    const baseStyles = "px-4 py-2 rounded-md transition-all duration-300 focus:outline-none";
    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
