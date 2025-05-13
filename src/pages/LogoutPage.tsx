import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LogoutPage = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
    const navigate = useNavigate();
    // todo fix popping up multiple times
    useEffect(() => {
        toast.warn("Logout successfully");
        // todo setUser null
        setIsLoggedIn(false);
        navigate('/');
    }, []);
    return null;
}

export default LogoutPage;