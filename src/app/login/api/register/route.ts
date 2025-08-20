import { supabase } from "@/hooks/isconfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {username, password, name, email} = await req.json()
        if(!username) {
            return NextResponse.json({success: false, message: `Username Is Required!!!`}, {status: 400})
        }
        if(!password) {
            return NextResponse.json({success: false, message: `Password Is Required!!!`}, {status:400})
        }
        const {data, error} = await supabase.rpc("lk_register_users",{
            p_username: username,
            p_password: password,
            p_name: name || null,
            p_email: email || null,})
        if (error) {
            console.error(error);
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            )
        }
        const result = data[0]
        if (!result.success) {
            return NextResponse.json({message: result.message}, {status: 401})
        } else {
            return NextResponse.json({message: result.message}, {status: 201})
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "internal Server Error"},{status: 500})
    }
}