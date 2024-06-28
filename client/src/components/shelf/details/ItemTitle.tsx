import {type FocusEvent, use, useEffect, useRef, useState} from "react";
import {ItemContext} from "@/contexts";
import {API_URL} from "@/common";

/**
 * Item title object
 * Click to edit, leave focus to apply changes
 */
export default function ItemTitle(props : {refresh: number, setRefresh: Function }) {

    const item = use(ItemContext);

    const [responseMessage, setResponseMessage] = useState<string>();
    const timerId = useRef();

    function handleChangeTitle(e: FocusEvent<HTMLTextAreaElement, Element>) {
        const formData = new FormData();
        formData.set("name", e.target.value);
        formData.set("requestType", "name");
        submitChanges(formData);
    }

    useEffect(() => {
        if (responseMessage) {
            // @ts-ignore
            timerId.current = setTimeout(() => {
                setResponseMessage('');
            }, 3000);
        }
        return () => {
            clearTimeout(timerId.current);
        };
    }, [responseMessage]);

    async function submitChanges(formData: FormData) {
        console.log(formData);
        const response = await fetch(`${API_URL}/item/${item!.id}`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        props.setRefresh(-props.refresh);
        if (!response.ok && data.message) {
            setResponseMessage(data.message);
        }
    }

    return (
        <div className="flex max-h-fit">
            {responseMessage && <p className="fixed top-2 right-2 rounded bg-red-700 text-white px-1">{responseMessage}</p>}
            <textarea
                className="resize-none text-2xl bg-transparent font-bold w-full p-1"
                rows={2}
                placeholder="Title required"
                onBlur={(e) => handleChangeTitle(e)}
                defaultValue={item!.name}
            ></textarea>
        </div>
    )
}