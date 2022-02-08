import axios, { AxiosResponse } from "axios";

interface Character {
    character : CharacterInfo
}

interface CharacterInfo{
    BasicAbility: object[];
    BattleAbility: object[];
    Class: string;
    Engrave: [];
    Engraving: object[];
    Equipments: object[];
    Etc: object[];
    Level: object;
    Server: string;
    SpEquipments: [];
    Territory: string;
    Username: string;
}



export const fetchUserInfo = (username:string) : Promise<AxiosResponse<Character>> => {
    const url = `http://localhost:8080/users/${username}`;
    return axios.get(url); 
}