import { ILogin } from "./iuser";

export interface ILoginRes {
    message: string,
    token? : string,
    user?: ILogin
}

export interface IRegisRes {
    success: boolean,
    message: string
}