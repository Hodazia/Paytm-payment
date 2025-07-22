import React from 'react';

export function Button({ children, onClick, className = "", type = "button", ...props }) {
    // The `type` prop is now accepted and given a default of "button",
    // but can be overridden by passing type="submit" from the parent.
    // `...props` will captures any other button attributes like `disabled`.
    return (
        <button
            onClick={onClick}
            type={type} 
            className={`text-white bg-gray-800 hover:bg-gray-900 
                focus:outline-none focus:ring-4 focus:ring-gray-300 
                font-medium rounded-full text-lg px-8 py-3 me-2 mb-2 ${className}`}
            {...props} 
        >
            {children}
        </button>
    );
}