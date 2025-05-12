import type { User } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';

const WelcomePage = ({ user }: { user: User | null }) => {
    ValidateAuth(user, '/logout');

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="bg-gray-400 p-20 rounded shadow text-center text-white">
                <h1 className="text-4xl font-bold">
                    Welcome {user?.name} to NexaPay
                </h1>
            </div>
        </div>
    )
}

export default WelcomePage;