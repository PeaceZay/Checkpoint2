// bring in json web token
let jwt = require("jsonwebtoken");
// make a veriable that verifies the token
let verifyJWT = (req, res, next) => {

    let header = req.get("Authorization");
    let signedToken;
    if(header){
        let parts = header.split(" ");
        signedToken = parts[1];
    }

    
    // if you have a signed token... this is how you do it without a call back
    if(signedToken){
        try{
         let token = jwt.verify(signedToken, process.env.JWT_Secret);
         next();
        }catch(err){
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
    
}
   
   
   module.exports = {
    verifyJWT
   }