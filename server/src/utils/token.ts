import jwt from 'jsonwebtoken'


interface jwtPayLoad{
    userId:string,
    role?:"user"|"admin"
}
const JWT_SECRET= process.env.JWT_SECRET||"mysuperheroismydad"
export const generateToken=(payload:jwtPayLoad):string=>{
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:"1h"
    })
}