import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { ITokens } from "@/models/itoken";
import { supabase } from "@/hooks/isconfig";



export async function GET(req:NextRequest) {
    const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
    if(!token) {
        return NextResponse.json({ message: "User lu gak ada, penyusup!!" }, { status: 401 })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokens
        if(decoded.id && decoded.username) {
            const {data, error} = await supabase.rpc("rd_getdata_charts",{
                p_userid : decoded.id,
                p_username: decoded.username
            }) 
            if(error) {
                return NextResponse.json({message:"Data lu ga ada anjay!!: ", error: error.message}, {status: 401})
            } else {
                const res =  NextResponse.json({data});
                res.cookies.delete(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")
                return res
            }
        }   
    } catch (error: unknown) {
        if(error instanceof Error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
        }
        return NextResponse.json({message: 'Unexpected Error'}, {status:500})
    }
}