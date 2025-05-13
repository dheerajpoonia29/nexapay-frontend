function HomePage() {

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="bg-gray-400 p-20 rounded shadow text-center text-white">
                <img src="../assets/logo.png" alt="NexaPay Logo" className="mx-auto mb-4 w-16 h-16" />

                <h1 className="text-4xl font-bold">
                    NexaPay
                </h1>
                <p>Secure | Reliable | Trusted Banking</p>
            </div>
        </div>
    )
}

export default HomePage;