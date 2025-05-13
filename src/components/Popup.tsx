const Popup = ({
    message,
    onClose,
}: {
    message: string;
    onClose: () => void;
}) => {
    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4" onClick={onClose}>
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800" onClick={(e) => e.stopPropagation()}>
                <p className="text-gray-800 mb-4">{message}</p>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Popup;