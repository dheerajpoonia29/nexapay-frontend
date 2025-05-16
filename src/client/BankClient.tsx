import { toast } from 'react-toastify';
import type { BankType } from '../helper/TypeConstants';

const BASE_URL = import.meta.env.VITE_API_BANK_API_URL;

export async function getBanks(): Promise<BankType[] | null> {
    console.log('inside getBanks')

    const ENDPOINT = '/bank/get-all';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log("get banks, result = ", result);

        if (result.responseStatusInt === 200) {
            console.log("got banks");
            toast.info('Banks fetched successfully');
            return result.responseData as BankType[];
        } else {
            console.warn("banks not found");
            toast.warn('Failed to fetch banks');
        }
    } catch (err) {
        console.error(err);
        toast.error('Error fetching banks');
    }
    return null;
}