import { JwtPayload } from "jsonwebtoken";

export interface ITokens extends JwtPayload {
    id? :number,
    username? : number,
    name? :number,
    useractive? :number,
    isonline? :number,
    iat? : number,
    exp? : number
}