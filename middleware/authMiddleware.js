import jwt from 'jsonwebtoken'
import { user } from '../model/usermodal.js'
export const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header 
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user from token
            req.user = await user.findById(decoded.id)
            // console.log(await user.findById(decoded.id));
            next()
        } catch (e) {``
            console.log(e);
            res.send('wrong token21')
        }

    }
    if (!token) {
        res.status(401)
        // throw new Error('lool')
        res.send('wrong token')
    }

}