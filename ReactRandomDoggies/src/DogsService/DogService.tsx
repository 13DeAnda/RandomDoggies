const baseURL = 'https://dog.ceo/api';

import axios from 'axios';
export let loading = false;

export const getRandomDog = async (quantity: number) => {
    loading = true;
    const response = await axios
        .get(`${baseURL}/breeds/image/random/${quantity}`)
        .then((response) => {
            loading = false;
            return response;
        })
        .catch((err) => {
            return err.response;
        });
    return response;
};
export const getDog = async (breed: string) => {
    loading = true;
    const response = await axios
        .get(`${baseURL}/breed/${breed}/images/random`)
        .then((response) => {
            loading = false;
            return response;
        })
        .catch((err) => {
            return err.response;
        });
    return response;
};
