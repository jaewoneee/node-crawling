import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserInfo } from "../api/index";
import { Character } from '../types/index'

export const User = () =>{
    const {username} = useParams<string>(); 
    const [info, setInfo] = useState<Character>();

    useEffect(() => {
         async function fetchAndSetUser(user:string){
            const { data } = await fetchUserInfo(user);
            setInfo(data);
         }
         fetchAndSetUser(username!);
    }, [username]);
    
    return(
        <div className="user-wrap">
            <div className="user-inner">
                <div className="user-profile-box">
                    <img src={info?.character.class.value} alt="" />
                    <h2>
                        {info?.character.username}
                    </h2>
                    <div className="server">{info?.character.server}</div>
                </div>
                <ul className="user-card-box">
                    <li>
                        <div>
                        <h4>전투 레벨</h4>
                        <p>{info?.character.level.battleLevel}</p>
                        </div>
                        
                    </li>
                    <li>
                        <div>
                        <h4>원정대 레벨</h4>
                        <p>{info?.character.level.expedLevel}</p>
                        </div>
                        
                    </li>
                    <li>
                        <div>
                        <h4>아이템 레벨</h4>
                        <p>{info?.character.level.equipLevel}</p>
                        </div>
                    </li>
                </ul>
                <div className="user-list-box">
                    <h3>각인</h3>
                    <ul>
                        {
                            info?.character.engrave[0]
                            ? info.character.engrave.map((val, i) => {
                                return <li>
                                            <img src={info?.character.engrave[i].engraveImg}  alt="" />
                                            <div>
                                                <p>{info?.character.engrave[i].engraveName}</p>
                                                <p>{info?.character.engrave[i].engraveExp}</p>
                                            </div>
                                        </li>
                            })
                            : '내용이 없습니다'
                        }
                    </ul>
                </div>
                <div className="user-list-box">
                    <h3>장비</h3>
                    <ul>
                        {
                            info?.character.spEquipments[0]
                            ? info.character.equipments.map((val, i) => {
                                return <li>
                                            <img src={info?.character.equipments[i].equipImg} className={`grade-${info.character.equipments[i].iconGrade}`}alt="" />
                                            <div>
                                                <p>{info?.character.equipments[i].equipName}</p>
                                                <p>{info?.character.equipments[i].equipRank}</p>
                                                <p>{info?.character.equipments[i].equipTier}</p>
                                            </div>
                                        </li>
                            })
                            : '내용이 없습니다'
                        }
                    </ul>
                </div>
                <div className="user-list-box">
                    <h3>특수 장비</h3>
                    <ul>
                        {
                            info?.character.spEquipments[0]
                            ? info.character.spEquipments.map((val, i) => {
                                return <li>
                                            <img src={info?.character.spEquipments[i].equipImg} className={`grade-${info.character.spEquipments[i].iconGrade}`}alt="" />
                                            <div>
                                                <p>{info?.character.spEquipments[i].equipName}</p>
                                                <p>{info?.character.spEquipments[i].equipRank}</p>
                                            </div>
                                        </li>
                            })
                            : '내용이 없습니다'
                        }
                    </ul>
                </div>         
            </div>
        </div>
    )
}