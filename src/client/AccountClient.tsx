import { toast } from "react-toastify";
import type { User } from '../helper/TypeConstants';

interface Props {
    user: User | null;
    setUser: (val: User) => void;
}

const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

// function deleteAccount(props: Props) {
//   const { user, setUser } = props;
// }

const deleteAccount = async ({ user, setUser }: Props) => {
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

export default deleteAccount;