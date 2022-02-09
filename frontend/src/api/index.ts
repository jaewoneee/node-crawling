import axios, { AxiosResponse } from "axios";

export interface Character {
    character : CharacterInfo
}

interface CharacterInfo{
    basicAbility: AbilityInfo[];
    battleAbility: AbilityInfo[];
    class: string;
    engrave: EngraveInfo[];
    engraving: object[];
    equipments: EquipInfo[];
    etc: AbilityInfo[];
    level: LevelInfo[];
    server: string;
    spEquipments: EquipInfo[];
    territory: string;
    username: string;
}

interface AbilityInfo{
    title:string;
    value:string;
}

interface EquipInfo{
    equipImg: string;
    equipName: string;
    equipRank: string;
    equipTier: string;
}

interface EngraveInfo{
    engraveImg:string;
    engraveName:string;
}

interface LevelInfo{
    battleLevel: string;
    equipLevel: string;
    expedLevel: string;
    territoryLevel: string;
}

export const fetchUserInfo = (username:string) : Promise<AxiosResponse<Character>> => {
    const url = `http://localhost:8080/users/${username}`;
    return axios.get(url); 
}