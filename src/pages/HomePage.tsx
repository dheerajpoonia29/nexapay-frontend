import Header from "../layout/Header";

function HomePage() {

    return (
        <div className="min-h-screen w-full bg-gray-200">
            <Header />
            <div className="flex items-center justify-center h-[80vh]">
                <div className="bg-gray-400 p-10 rounded shadow text-center">
                    <h1 className="text-2xl font-bold">
                        Welcome to NexaPay
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage;