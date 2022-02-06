
function setTotalInfo(data){
    const isAvailable = data.includes('$.Profile');
    let code;

    /**
     * case 1. Success
     * case 2. [code 0] : 존재하지 않는 캐릭터 
     * case 3. [code 1] : 캐릭터는 존재하지만, 데이터 부족.
     */

    if (data !== "" && isAvailable === true){   
        data = data.slice(14).replace(/;/gi, "");
        data = JSON.parse(data);
        return data;
    } else if(data.length > 1 && isAvailable === false){  
        code = 0;
    }else if(data.length === 1){   
        code = 1;
    }
    return code;
}



export {setTotalInfo}