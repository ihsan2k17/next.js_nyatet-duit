import { supabase } from "@/hooks/isconfig";
import { IMenus } from "@/models/imenus";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {    
        const {data: menus, error} = await supabase
            .from("master_menu")
            .select("*")
        const sortmenus: IMenus[] = [];
        const parents = menus?.filter(m => m.parent_id === null) || [];

        for (let i = 0; i < parents.length; i++) {
            const parent = parents[i]
            sortmenus.push(parent)

            const children: IMenus[] = menus
                ?.filter(m=> m.parent_id === parent.id)
                .sort((a, b) => a.urut - b.urut)||[]
            for(let j=0; j < children.length; j++) {
                sortmenus.push(children[j])
            }
        }
        if(sortmenus) {
            const res = NextResponse.json({data: sortmenus},{status: 200})
            return res
        } else {
            const reserr = NextResponse.json({message: error},{status: 204})
            return reserr
        }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}