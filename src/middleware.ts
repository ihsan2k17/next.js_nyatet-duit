import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {supabase} from "@/hooks/isconfig"

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        // kalo ga ada token, lempar ke /login
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch(err:any) {
        if(err.name === "TokenExpiredError") {
            const decode: any = jwt.decode(token);
            if(decode?.userid) {
                try {
                    const request = supabase.rpc("lk_logout_user", {
                        puserid: decode?.userid,
                        pusername: decode?.username,
                        pisonline: decode?.isonline
                    })
                } catch (dbErr) {
                    console.error("Db Update Error: ", dbErr)
                }
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], 
}