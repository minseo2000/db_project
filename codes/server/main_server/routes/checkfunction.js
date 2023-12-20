const queryDatabase = require('./db');

exports.checkUserinfo = async function checkUserinfo(info, data){
    const query = `select ${info} from user_table`
    
    const result = await queryDatabase(query, {});
    let isOverlap = false;
    

    for(let i = 0; i < result.length; i++){
        if(data == result[i][info]){
            isOverlap = true;
            break;
        }
        else{
            isOverlap = false;
        }
    }
    return isOverlap;
}

exports.checkProfileinfo = async function checkUserinfo(info, data){
    const query = `select ${info} from profile`
    
    const result = await queryDatabase(query, {});
    let isOverlap = false;
    
    console.log(data);
    if(data.length == 0){
        return isOverlap;
    }
    else{
        for(let i = 0; i < result.length; i++){
            if(data == result[i][info]){
                isOverlap = true;
                break;
            }
            else{
                isOverlap = false;
            }
        }
        return isOverlap;
    }
}