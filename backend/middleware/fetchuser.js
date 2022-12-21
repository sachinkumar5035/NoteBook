const jwt = require('jsonwebtoken'); // to use jsonwebtoken to install -> npm install jsonwebtoken
const JWT_SECRET = 'Iamagood$an';

const fetchuser=(req,res,next)=>{ // fetchuser is a middleware which will be used to fetchuser details when fetchuser end point will hit 
    // res-> http response argument
    // req-> http request argument
    // next-> Callback argument to the middleware function
    // get the user from the JWT token and append id to req object 
    const token = req.header('auth-token'); // auth token is tha header name which we will send at the time of authentication
    if(!token){
        res.status(401).send({error:"please authenticate using valid authtoken"});
    }
    try {
        const data  = jwt.verify(token,JWT_SECRET); // token will be verifyed
        req.user = data.user;
        next(); // this function will be called 
    } catch (error) {
        res.status(401).send({error:"please verify with a valid auth token"}); // always send response 
    }
}

module.exports = fetchuser;