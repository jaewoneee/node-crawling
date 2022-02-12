import axios, { AxiosResponse } from "axios";
import { Character } from '../types/index'

export const fetchUserInfo = (username:string) : Promise<AxiosResponse<Character>> => {
    const url = `http://localhost:8080/users/${username}`;
    return axios.get(url); 
}