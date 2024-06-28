"use client"
import {ImageList, type Item} from "@/types"
import {useEffect, useState} from "react";

/**
 * Shelf item spine
 * If a spine image is set, show the spine image, otherwise just show the item's name.
 */
export default function ItemSpine(props: { item: Item, itemSetter: Function }) {

    const DefaultSpineOuterClasses= "h-80 w-fit break-word hover:opacity-90 align-bottom flex items-end justify-end text-topdown";
    let DefaultSpineInnerClasses = "spine border-2 border-emerald-950 max-h-80 font-semibold bg-emerald-50 px-1 py-3";

    const [spineInnerClasses, setSpineInnerClasses] =
        useState(DefaultSpineInnerClasses);
    const [spineOuterClasses, setSpineOuterClasses] =
        useState(DefaultSpineOuterClasses);
    const [spineColor, setSpineColor] =
        useState(props.item.spineColor || "");
    const [textColor, setTextColor] =
        useState(props.item.textColor || "");
    const [textClasses, setTextClasses] =
        useState("");
    const [spineImage, setSpineImage] =
        useState("");


    useEffect(() => {
        if (props.item.images) {
            const images: ImageList = JSON.parse(props.item.images);
            setSpineImage(images.spine || "");
        }

        if (props.item.spineColor) {
            setSpineColor(props.item.spineColor);
        } else {
            DefaultSpineInnerClasses += "";
            setSpineColor("");
        }

        if (props.item.textColor) {
            setTextColor(props.item.textColor);
            setTextClasses("");
        } else {
            setTextClasses("text-emerald-50 mix-blend-difference");
            setTextColor("");
        }
        //
        // let customSpineClasses: string;
        // (props.item.format && props.item.format in formatsList && formatsList[props.item.format].spineClasses) ?
        //     customSpineClasses = formatsList[props.item.format].spineClasses!
        //     : customSpineClasses = "text-lg px-1 py-2 h-fit"; // defaults if no specified spine classes

        // setSpineInnerClasses(`${DefaultSpineInnerClasses} ${customSpineClasses}`);
        //
        // switch (spineDirection) {
        //     case "bottom-up":
        //         setSpineOuterClasses(DefaultSpineOuterClasses + " text-bottomup");
        //         break;
        //     default:
        //         setSpineOuterClasses(DefaultSpineOuterClasses + "");
        //         break;
        // }

    }, [props.item]);

    const handleClick = () =>
        props.itemSetter(props.item);


    return (
        <div className={spineOuterClasses}
             title={props.item.name}>

            {spineImage ?
                <img src={spineImage}
                     alt={props.item.name}
                     className={`spine max-h-80 border-2 border-emerald-950 bg-emerald-50`}
                     onClick={() => handleClick()}/>

                :

                <div className={spineInnerClasses}
                     style={{backgroundColor: `${spineColor}`}}
                     onClick={() => handleClick()}>
                    <h2 className={`overflow-hidden spine ${textClasses}`}
                        style={{color: `${textColor}`}}>
                        {props.item.name}
                    </h2>
                </div>
            }
        </div>
    )
}
