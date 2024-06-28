import {useEffect, useRef, useState, use, type MouseEvent} from "react";
import type {Item} from "@/types";
import { ShelfContext } from "@/contexts";
import ItemSpine from "@/components/shelf/ItemSpine";
import LoadingWheel from "@/components/LoadingWheel";
import AddItemForm from "@/components/shelf/AddItemForm";
import {API_URL} from "@/common";

/**
 * Shelf items container
 * Shows all shelf items
 */
export default function ShelfItemsContainer( props: { itemSetter: Function, refresh: number }) {
    const containerRef = useRef<HTMLElement>(null);
    const [items, setItems] = useState<Item[]>();

    const shelf = use(ShelfContext);

    async function getItems(shelfId: number) {
        const res = await fetch(`${API_URL}/shelf/${shelfId}/items`);
        const data = await res.json();
        return data.message;
    }

    async function addNewItem(item: Item) {
        // @ts-ignore
        setItems([...items, item]);
    }

    useEffect(() => {
        if (shelf) {
            getItems(shelf.id).then(r => setItems(r));
        }
    }, [shelf, props.refresh]);

    const handleClick = (e: MouseEvent) => {
        // yea whatever bro e.target is an element and has a class list go die
        // @ts-ignore
        if (!e.target.classList.contains("spine")) {
            props.itemSetter(null);
        }
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-full"
             onClick={(e) => handleClick(e)}>
            <article ref={containerRef}
                     className="flex w-full min-h-fit flex-wrap items-end justify-start gap-x-0.5 gap-y-8
                     bg-emerald-200 dark:bg-emerald-800 p-2"
                     style={{
                         backgroundImage: "linear-gradient(rgb(2 44 34) 5px, transparent 1px)",
                         backgroundSize: "100% 22rem",
                         backgroundPositionY: "-1rem"
                     }}
            >
                {/*each item is h-80 (20rem)*/}

                {shelf && items?
                    (items.length != 0) ?
                        items.map((item: Item) => (
                            <ItemSpine key={item.id} item={item} itemSetter={props.itemSetter} />
                        ))
                        :
                        <div className="min-h-80 w-full grid place-items-center">
                            <p>Add an item below</p>
                        </div>
                    :
                    <div className="min-h-80 w-full grid place-items-center">
                        <LoadingWheel/>
                    </div>
                }


            </article>
            <AddItemForm itemAdder={addNewItem}/>
        </div>
    )
}
