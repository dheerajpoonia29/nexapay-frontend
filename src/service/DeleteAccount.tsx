
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import type { User } from '../helper/TypeConstants';

export const DeleteAccount = ({ user, setUser }:
    {
        user: User | null;
        setUser: (val: User) => void
    }) => {

    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${BASE_URL}/account/delete-account?accountNo=${user?.accountData?.accountNo}`, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.responseStatusInt == 201) {
                toast.success("Account deleted successfully.")

                setUser({
                    ...user!,
                    name: user?.name ?? "",
                    email: user?.email ?? "",
                    accountData: null
                });

                navigate('/welcome');
            } else if (result.responseStatusInt == 404) {
                toast.warn("Account not found.");
            } else {
                toast.error("something went wrong");
            }
        })
        .catch((error) => {
            console.error("iternal server error: ", error);
            toast.error("Internal server error");
        });
}