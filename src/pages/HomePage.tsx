import logo from '../assets/logo.png';

function HomePage() {
    return (
        <div className="flex items-center justify-center h-[80vh]">
            {/* <div className="bg-gray-400 p-20 rounded shadow text-center text-white"> */}
            <div className="text-center">
                <img src={logo} alt="NexaPay Logo" className="mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-400">
                    Secure | Reliable | Trusted Banking
                </h1>
                <p></p>
            </div>
        </div>
    )
}

export default HomePage;