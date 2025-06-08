const result = require('../utils/result')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

function authMiddleware(req, res, next){
    if( req.url == '/user/signin' || req.url == '/user/signup' || req.url.startsWith('/category') || req.url == '/blog/' ||  req.url.startsWith('/images') || req.url.startsWith('/blog/category') || req.url.startsWith('/blog/search') || (req.url.match(/^\/blog\/\d+$/) && req.method === 'GET')){  
        next()
    }
    else{     
        const token = req.headers.token;
        if(token){
           try{ 
            const payload = jwt.verify(token, config.secretKey);  
            req.headers.id = payload.id;
            next()
        }
        catch(e){
            res.send(result.createErrorResult("Invalid token"));
        }
        }
        else{
            res.send(result.createErrorResult("Token is missing..."));
        }
    }
}
module.exports = authMiddleware;