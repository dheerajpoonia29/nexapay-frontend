import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { UserType } from './TypeConstants';
import { toast } from "react-toastify";

const ValidateAuth = (user: UserType | null, redirectTo: string = "/") => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.accountData == null) {
            toast.warn("Account not created yet!!");
            navigate(redirectTo);
        }
    }, [user, navigate]);
};

export default ValidateAuth;