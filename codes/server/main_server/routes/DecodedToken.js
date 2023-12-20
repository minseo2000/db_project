const jwt = require('jsonwebtoken');

module.exports = async function DecodedToken(token){
    const key = process.env.SECRET_KEY;
    let user_id_c = '';
    jwt.verify(token, key, function(err, result){
        if(err){
            console.log(token);
            return err;
        }
        else{
            user_id_c = result.user_id_c;
        }
    })
    return user_id_c;
}