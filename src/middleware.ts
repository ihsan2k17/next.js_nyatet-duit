import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {supabase} from "@/hooks/isconfig"
import { ITokens } from "@/models/itoken";


export const middleware = async (req: NextRequest) => {
    const {pathname} = req.nextUrl
    const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
    const tokendecode = req.cookies.get(process.env.NEXT_TOKEN_DEC || "auuuuu0")?.value;
    // dynamic route
    const {data:masterMenu} = await supabase
        .from('master_menu')
        .select('route')
        .order('id', {ascending:true})
    const mapingmenu = masterMenu?.map(m => m.route) || []
    const menus = mapingmenu.some(r => pathname.startsWith(r))
    if(!menus) {
        return NextResponse.next()
    }

    // ngambil token yang di decode
    if (!tokendecode) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    const decode = JSON.parse(atob(tokendecode.split(".")[1])) as ITokens // jadi object
    if(!token) {
        if(jwt.TokenExpiredError) {
            const res= await supabase.rpc("lk_logout_user", {
                puserid: decode.id,
                pusername: decode.username
            })
            if(res.data[0].message.startsWith("success")){
                const resp = NextResponse.redirect(new URL("/login", req.url))
                resp.cookies.delete(process.env.NEXT_TOKEN_DEC || "auuuuu0")
                return resp
            } else {
                const resp = NextResponse.redirect(new URL("/", req.url))
                resp.cookies.delete(process.env.NEXT_TOKEN_DEC || "auuuuu0")
                return resp
            }
        }
        const res = NextResponse.redirect(new URL("/login", req.url))
        res.cookies.delete(process.env.NEXT_TOKEN_LOGIN ||"auuuuuu")
        return res
    }
    const res =  NextResponse.next()
    return res
}

// export const config = {
//     matcher: ["/home/:path*","/settings/:path*"],
// }
