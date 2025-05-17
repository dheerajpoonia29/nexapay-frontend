import { toast } from "react-toastify";
import { mapBackendUserToUserType } from "../helper/ResponseCreator";
import type { UserFormDataType, UserType } from "../helper/TypeConstants";

const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

interface LoginProps {
    setIsLoggedIn: (val: boolean) => void;
    setUser: (user: UserType) => void;
    formData: UserFormDataType;
}

export const loginUser = async ({ setIsLoggedIn, setUser, formData }: LoginProps): Promise<boolean> => {
    console.log('inside loginUser client');

    const ENDPOINT = '/auth/login';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            redirect: "follow"
        });

        const result = await response.json();
        console.log("login account, result = ", result)

        if (result.responseStatusInt === 200) {
            console.log("login success");
            setUser(mapBackendUserToUserType(result?.responseData));
            toast.success("Login success");
            setIsLoggedIn(true);
            return true;
        } else if (result.responseStatusInt === 401) {
            console.error("login failed, invalid authentication");
            toast.warn("Login failed, invalid authentication!");
        } else {
            console.error("status code: ", result.responseStatusInt);
            toast.error("Internal server error");
        }
    } catch (err) {
        console.error('createAccount error: ', err);
        toast.error('Internal server error');
    }
    return false;
}

interface SignupProps {
    formData: UserFormDataType;
}

export async function signupUser({ formData }: SignupProps): Promise<boolean> {
    console.log('inside signupUser client');

    const ENDPOINT = '/auth/signup';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            redirect: "follow"
        });

        const result = await response.json();
        console.log("signup account, result = ", result)

        if (result.responseStatusInt === 201) {
            console.log("signup success");
            toast.success("Account created successfully.")
            return true;
        } else if (result.responseStatusInt === 409) {
            toast.warn("Account already exsit.")
        } else {
            console.error("status code: ", result.responseStatusInt);
            toast.error("Internal server error");
        }
    } catch (err) {
        console.error('createAccount error: ', err);
        toast.error('Internal server error');
    }
    return false;
}