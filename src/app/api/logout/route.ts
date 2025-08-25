import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { ITokens } from "@/models/itoken";
import { supabase } from "@/hooks/isconfig";

export async function POST(req: NextRequest) {
    const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
    console.log("Data token: ", token)
    if(!token) {
        return NextResponse.json({ message: "You Is Logout " }, { status: 401 })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokens 
        if(decoded.id) {
            const {data, error} = await supabase.rpc("lk_logout_user", {
                puserid: decoded.id,
                pusername: decoded.username
            })
            if(error) {
                return NextResponse.json({message:"Warning: ", error: error.message}, {status: 401})
            }
            const res = NextResponse.json({success: data[0].success, message:`${data[0].message}`})
            res.cookies.delete(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")
            res.cookies.delete(process.env.NEXT_TOKEN_DEC || "auuuuu0")
            return res
        } else { return NextResponse.json({message:"Warning: Gadapet token"}, {status: 401})}
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}