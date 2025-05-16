import { toast } from "react-toastify";
import type { UserType } from '../helper/TypeConstants';

interface Props {
    user: UserType | null;
    setUser: (val: UserType) => void;
}

const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

// function deleteAccount(props: Props) {
//   const { user, setUser } = props;
// }

export const deleteAccount = async ({ user, setUser }: Props) => {
    console.log('inside deleteAccount');

    const ENDPOINT = '/account/delete-account';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(`${URL}?accountNo=${user?.accountData?.accountNo}`, {
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
                accountData: null
            });
            toast.success("Account deleted successfully.");
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
};

export async function createAccount(props: Props) {
    const { user, setUser } = props;

    console.log('inside createAccount');
    const ENDPOINT = '/account/create';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(`${URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userRequest": {
                }
            })
        });

        const result = await response.json();
        console.log("create account, result = ", result);
    } catch (err) {
        console.error('deleteAccount error: ', err);
        toast.error('Internal server error');
    }
}