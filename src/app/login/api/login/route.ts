import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/hooks/isconfig";
import { ILogin } from "@/models/iuser";
import { ILoginRes } from "@/models/iauth";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // call stored procedure
    const { data, error } = await supabase.rpc("lk_login_user", {
      p_username: username,
      p_password: password,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Login gagal" }, { status: 401 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 401 });
    }

    const user: ILogin = data[0];

    // generate JWT
    const token = jwt.sign(
      {
        id: user.userid,
        username: user.username,
        name: user.name,
        useractive : user.isactive,
        isonline: user.isonline
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const resbody:ILoginRes = {
      message: "Login sukses",
      token,
      user
    }
    
    const res = NextResponse.json(resbody)
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
