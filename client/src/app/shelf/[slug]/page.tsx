"use client"
import ShelfItemsContainer from "@/components/shelf/ShelfItemsContainer";
import DetailsView from "@/components/shelf/details/DetailsView";
import {ItemContext, ShelfContext} from "@/contexts";
import {useEffect, useState} from "react";
import {Item, Shelf} from "@/types";
import {API_URL} from "@/common";

export default function Page({ params }: { params: { slug: string } }) {

    const [activeItem, setActiveItem] = useState<Item>();
    const [activeShelf, setActiveShelf] = useState<Shelf>();
    const [refreshItems, setRefreshItems] = useState(1);

    useEffect(() => {

        const getShelf = async () => {
            const res = await fetch(`${API_URL}/shelf/${params.slug}`);
            const data = await res.json();
            return data.message;
        }

        getShelf().then(r => setActiveShelf(r));
    });


    return (

        <article className="grid h-full max-h-full overflow-hidden gap-2"
                 style={{gridTemplateColumns: "3fr 1fr"}}>

            <ShelfContext.Provider value={activeShelf}>
            <ItemContext.Provider value={activeItem}>

                <ShelfItemsContainer itemSetter={setActiveItem}
                                     refresh={refreshItems}/>

                <DetailsView key={activeItem ? activeItem.id : 0}
                             refresh={refreshItems}
                             setRefresh={setRefreshItems}/>

            </ItemContext.Provider>
            </ShelfContext.Provider>

        </article>
)
}