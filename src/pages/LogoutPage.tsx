import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
    const navigate = useNavigate();
    // todo fix popping up multiple times
    useEffect(() => {
        alert("Logout successfully");
        setIsLoggedIn(false);
        navigate('/');
    }, []);
    return null;
}

export default LogoutPage;