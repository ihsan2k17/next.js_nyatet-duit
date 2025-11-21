import jwt from "jsonwebtoken";
import { supabase } from "@/hooks/isconfig";
import { NextRequest, NextResponse } from "next/server";
import { ITokens } from "@/models/itoken";

export async function POST(req:NextRequest) {
    try {
        const {state, rdnid,portfid} = await req.json()
        const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
        if(!token) {
            return NextResponse.json({ message: "User lu gak ada, penyusup!!" }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokens
        if(decoded.id) {
            const {data, error} = await supabase.rpc('lk_ddlinsert_rd_trans',{
                p_state : state || null,
                p_id : decoded.id || null,
                p_rdn_id : rdnid || null,
                p_portfolio_id: portfid || null
            })
            if(error) {
                return NextResponse.json({message: error},{status:400})
            }
            if(!data ||data.length === 0) {
                return NextResponse.json({message: 'Kosong cuy'}, {status:404})
            }
            return NextResponse.json(data ?? [])
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}
