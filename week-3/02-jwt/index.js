const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require('zod');

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);


function signJwt(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }


    // Your code here

    const signature = jwt.sign({username}, jwtPassword);
    return signature;
}


function verifyJwt(token) {
    // Your code here
    try{
        jwt.verify(token, jwtPassword);
        return true;
    }catch(e){

    }
    return false
}


function decodeJwt(token) {
    // Your code here
    const decoded = jwt.decode(token);
    if(decoded){
        return true;
    }else{
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
