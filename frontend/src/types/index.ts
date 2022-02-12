export interface Character {
    character : CharacterInfo
}

interface CharacterInfo{
    basicAbility: AbilityInfo[];
    battleAbility: AbilityInfo[];
    class: AbilityInfo;
    engrave: EngraveInfo[];
    engraving: object[];
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