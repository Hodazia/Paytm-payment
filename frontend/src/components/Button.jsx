export function Button({children, onClick, className = ""}) {
    return <button onClick={onClick} type="button" className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-8 py-3 me-2 mb-2 ${className}`}>{children}</button>
}