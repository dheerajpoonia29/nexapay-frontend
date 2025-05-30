import { toast } from "react-toastify";
import type { UserType, AccountCreateFormDataType } from '../helper/TypeConstants';
import { mapBackendUserToUserType } from "../helper/ResponseCreator";

const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

interface Props {
    user: UserType | null;
    setUser: (val: UserType) => void;
}

export const deleteAccount = async ({ user, setUser }: Props): Promise<boolean> => {
    console.log('inside deleteAccount client');

    const ENDPOINT = '/account/delete-account';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(`${URL}?accountNo=${user?.account?.accountNo}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log("delete account, result = ", result)

        if (result.responseStatusInt === 201) {
            setUser({
                ...user!,
                name: user?.name ?? "",
                email: user?.email ?? "",
                account: null
            });
            toast.success("Account deleted successfully.");
            return true;
        } else if (result.responseStatusInt === 404) {
            toast.warn("Account not found.");
        } else {
            console.error("status code: ", result.responseStatusInt);
            toast.error("Internal server error");
        }
    } catch (err) {
        console.error('deleteAccount error: ', err);
        toast.error('Internal server error');
    }
    return false;
};

interface CreateAccountProps {
    user: UserType | null;
    setUser: (val: UserType) => void;
    formData: AccountCreateFormDataType;
}

export const createAccount = async ({ user, setUser, formData }: CreateAccountProps): Promise<boolean> => {
    console.log('inside createAccount client');

    const ENDPOINT = '/account/create';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ifscCode": formData?.ifscCode,
                "userRequest": {
                    "name": formData?.name,
                    "email": formData?.email
                },
                "bankRequest": {
                    "id": formData?.bankId
                }
            }),

            redirect: "follow"
        });

        const result = await response.json();
        console.log("create account, result = ", result)

        if (result.responseStatusInt === 201) {
            setUser(mapBackendUserToUserType({
                ...user,
                accountData: result?.responseData
            }));
            toast.success("Account created successfully.");
            return true;
        } else if (result.responseStatusInt === 409) {
            toast.warn("Account already exist.");
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

export const getAccount = async ({ user, setUser }: Props): Promise<boolean> => {
    console.log('inside getAccount client');

    const ENDPOINT = `/account/get-by-account-no?accountNo=${user?.account?.accountNo}`;
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: "follow"
        });

        const result = await response.json();
        console.log("get getAccount, result = ", result)

        if (result.responseStatusInt === 200) {
            console.log("success api call");
            setUser(mapBackendUserToUserType({
                ...user,
                accountData: result?.responseData
            }));
            toast.info("Account balance updated");
            return true;
        } else {
            console.error("status code: ", result.responseStatusInt);
            toast.error("Internal server error");
        }
    } catch (err) {
        console.error('tranferAmount error: ', err);
        toast.error('Internal server error');
    }

    return false;
}