import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { User } from './TypeConstants';

const ValidateAuth = (user: User | null, redirectTo: string = "/") => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            navigate(redirectTo);
        }
    }, [user, navigate]);
};

export default ValidateAuth;