// string으로 들어온 전체 데이터 JSON 형식으로 변환
function setTotalInfo(data){
    const isAvailable = data.includes('$.Profile');
    
    /**
     * case 1. Success
     * case 2. [code 0] : 존재하지 않는 캐릭터 
     */
    if (isAvailable === true){   
        data = data.slice(14).replace(/;/gi, "");
        data = JSON.parse(data);
        return data;
    } else if(data.length > 1 && isAvailable === false){  
        return false;
    }
}

// 기본특성
function setAbility(ability, $){
    const arr = [];
    
    ability.map((i, el) => {
        const obj = {};
        const item = $(el).children('span');

        if(item.length > 1){
            obj.title = item[0].children[0].data; // 특성명
            obj.value = item[1].children[0].data;   // 특성 값
        }else{
            obj.value = item[0].children[0].data;   // 특성 값
        }
        arr.push(obj);
    })  
    return arr;
}

export {setTotalInfo, setAbility}