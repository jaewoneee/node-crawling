export interface Character {
    character : CharacterInfo
}

interface CharacterInfo{
    basicAbility: AbilityInfo[];
    battleAbility: AbilityInfo[];
    class: AbilityInfo;
    engrave: EngraveInfo[];
    engraving: AbilityInfo[];
    equipments: EquipInfo[];
    etc: AbilityInfo[];
    level: LevelInfo;
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
    iconGrade:number;
}

interface EngraveInfo{
    engraveImg:string;
    engraveName:string;
    engraveExp:string;
}

interface LevelInfo{
    battleLevel: string;
    equipLevel: string;
    expedLevel: string;
    territoryLevel: string;
}

// computed value를 위해 type 사용
export type GuideTypes = {
    [key in string] : Guide[]
}

export interface Guide{
    title: string,
    url: string
}