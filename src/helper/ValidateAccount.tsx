import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { UserType } from './TypeConstants';
import { toast } from "react-toastify";

const ValidateAuth = (user: UserType | null, redirectTo: string = "/") => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("validating account: ", user?.account);
        if (user?.account == null) {
            toast.warn("Account not created yet!!");
            navigate(redirectTo);
        }
    }, [user, navigate]);
};

export default ValidateAuth;