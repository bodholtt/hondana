import Link from "next/link";
import type { Shelf } from "@/types";
import {API_URL} from "@/common";

export default async function Sidebar() {
    const navLinkStyle = "block bg-emerald-700 hover:bg-emerald-600 w-full px-4 py-1 text-emerald-100 font-bold"
    const shelfLinkStyle = "block bg-emerald-800 hover:bg-emerald-700 w-full px-2 py-1 text-emerald-50 border-b-2 border-l-2 border-emerald-950 border-dashed";

    const res = await fetch(`${API_URL}/getShelves`);
    const data = await res.json();
    const realShelves: Shelf[] = data.message;

    return (
        <aside className="max-h-full h-full min-w-fit bg-emerald-700 border-r-2 border-emerald-950 overflow-hidden flex flex-col">
            <a className={navLinkStyle} href='/'>Home</a>

            <div className="flex flex-col h-full max-h-full break-word overflow-auto border-t-2 border-emerald-950 pl-4">
                {realShelves.map((shelf, i) => (
                    <Link className={shelfLinkStyle}
                          key={i}
                          href={`/shelf/${shelf.id}`}>
                        {shelf.name}
                    </Link>
                ))}
            </div>

            <div className="border-t-2 border-emerald-950 flex flex-col">
                <a className={navLinkStyle} href='/settings'>Settings</a>
                <a className={navLinkStyle} href='/about'>About</a>
                <a className={navLinkStyle} href='https://github.com/bodholtt/hondana' target="_blank">Github</a>
            </div>
        </aside>
    )
}