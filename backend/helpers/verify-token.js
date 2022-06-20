const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');

const checkToken = (req,res,next)=> {
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'Acesso negado! Você precisa estar autenticado'
        })
    }

    const token = getToken(req);
    if(!token){
        return res.status(401).json({
            message: 'Acesso negado! Você precisa estar autenticado'
        })
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        return res.status(401).json({
            message: 'token inválido!'
        })
    }
}

module.exports = checkToken;