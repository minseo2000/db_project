const jwt = require('jsonwebtoken');

module.exports = async function DecodedToken(token){
    const key = process.env.SECRET_KEY;
    let user_id_c = '';
    jwt.verify(token, key, function(err, result){
        if(err){
            res.status(500).json({message : 'Server error'});
        }
        else{
            user_id_c = result.user_id_c;
        }
    })
    return user_id_c;
}