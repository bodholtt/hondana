import {type FormEvent, useContext, useRef, useState} from "react";
import {ShelfContext} from "@/contexts";
import {API_URL} from "@/common";

/**
 * Button to add a new item.
 */
export default function AddItemForm(props: { itemAdder: Function }) {

    const shelf = useContext(ShelfContext);
    const [responseMessage, setResponseMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.set("shelfId", shelf!.id.toString());
        const response = await fetch(`${API_URL}/item/create`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
            props.itemAdder(data.item);
        }
        inputRef.current!.value = "";
    }

    return (
        <div className="flex flex-col p-1">
            <form onSubmit={submit} className="flex flex-row gap-1">

                <input type="text"
                       name="name"
                       ref={inputRef}
                       placeholder="Item Name"
                       className="border-2 p-1 rounded border-emerald-950 focus:outline-none focus:bg-emerald-50"
                       required/>

                <button className="border-2 rounded border-emerald-950 bg-emerald-700 text-emerald-50 p-1 w-10"
                        type="submit"> +
                </button>

            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}