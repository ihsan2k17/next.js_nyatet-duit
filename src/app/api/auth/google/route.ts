//import { OAuth2Client } from "google-auth-library";
import { supabase } from "@/hooks/isconfig";
import { ILogin } from "@/models/iuser";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";
export const POST = async (req:NextRequest) => {
    try {
        const {username, name, email} = await req.json()
        const {data, error} = await supabase.rpc("lk_cek_login_google", {
            pname: name,
            pusername: username,
            pemail: email,
            ppassword: process.env.NEXT_PUBLIC_GOOGLE_RANDOM_PASSWORD
        })
        if(error) {
            return NextResponse.json({ message: "Login gagal" }, { status: 401 });
        }
        if (!data || data.length === 0) {
            return NextResponse.json({ message: "User tidak ditemukan" }, { status: 401 });
        }
        const user:ILogin = data[0];
        return NextResponse.json({status:200, user})
    } catch (err:unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}