import jwt from "jsonwebtoken";
import { supabase } from "@/hooks/isconfig";
import { NextRequest, NextResponse } from "next/server";
import { ITokens } from "@/models/itoken";
import { IReksadana } from "@/models/ireksadana";

export async function POST(req: NextRequest) {
    try {
        const body:IReksadana = await req.json()
        const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
        if(!token) {
            return NextResponse.json({ message: "User lu gak ada, penyusup!!" }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokens
        if(decoded.id) {
            let paramstgl : string
            if(body.tgl) {
                paramstgl= new Date(body.tgl).toISOString().split("T")[0]
            } else{
                paramstgl = new Date(Date.now()).toISOString().split("T")[0]
            }
            
            const {data, error} = await supabase.rpc('lk_insert_rd_trans',{
                p_rdnid: body.rdnid || null,
                p_jenistransrdid: body.jenistransrdid || null,
                p_produkrdid: body.produkrdid || null,
                p_id_user: decoded.id ||null,
                p_tgl: paramstgl,
                p_tahun: body.tahun || null,
                p_norekrdn: body.norekrdn || null,
                p_namaportfolio: body.namaportfolio || null,
                p_nominaluang: body.nominaluang || null,
                p_nav: String(body.nav) || null,
                p_jumlahunit: String(body.jumlahunit) || null,
                p_type: body.type || null,
                p_id_portfolio: body.idportfolio || null
            })
            if(error) {
                return NextResponse.json({message: error.message || error},{status: 400})
            }
            if(!data) {
                return NextResponse.json({message:'Save Data Failed'},{status: 400})
            }
            return NextResponse.json(data)
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}