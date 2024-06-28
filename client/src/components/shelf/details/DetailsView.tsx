import {use} from "react";
import {ItemContext, ShelfContext} from "@/contexts";
import ItemTitle from "@/components/shelf/details/ItemTitle";
import ItemDescription from "@/components/shelf/details/ItemDescription";
import ShelfTitle from "@/components/shelf/details/ShelfTitle";

export default function DetailsView(props : {refresh: number, setRefresh: Function }) {

    const activeItem = use(ItemContext);
    const activeShelf = use(ShelfContext);

    return (

        <div className="max-h-full overflow-y-hidden border-2 border-dashed rounded-r-2xl border-emerald-950 dark:border-emerald-200 grid h-full"
             style={{gridTemplateRows: "1fr auto"}}>

            <div className="flex flex-col gap-0.5 overflow-y-auto p-2">
                { activeItem ? (
                    <>
                        <ItemTitle refresh={props.refresh} setRefresh={props.setRefresh}/>
                        <ItemDescription refresh={props.refresh} setRefresh={props.setRefresh}/>
                    </>
                ) : ( activeShelf ?
                    <>
                        <ShelfTitle />
                    </>
                        :
                    ""
                )}
            </div>

            {/*<div className="flex gap-1 p-4 h-full items-end justify-end">*/}
            {/*    {deleteButton}*/}
            {/*</div>*/}
        </div>
    )
}