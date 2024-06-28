import {type ChangeEvent, type FocusEvent, use, useEffect, useRef} from "react";
import {ItemContext} from "@/contexts";
import {API_URL} from "@/common";

/**
 * Item description object
 * Click to edit, leave focus to apply changes
 */
export default function ItemDescription(props : {refresh: number, setRefresh: Function}) {

    const item = use(ItemContext);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, []);

    function updateSize(e: ChangeEvent<HTMLTextAreaElement>) {
        e.currentTarget.style.height = "inherit";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    }

    function handleChangeDescription(e: FocusEvent<HTMLTextAreaElement, Element>) {
        const formData = new FormData();
        formData.set("description", e.target.value);
        formData.set("requestType", "description");
        submitChanges(formData);
    }

    async function submitChanges(formData: FormData) {
        console.log(formData);
        const response = await fetch(`${API_URL}/item/${item!.id}`, {
            method: "POST",
            body: formData,
        });
        props.setRefresh(-props.refresh);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="border-emerald-950 dark:border-emerald-200 border-l-2 flex p-1 min-w-full">
        <textarea ref={textAreaRef}
                  style={{
                      resize: "none",
                      minHeight: "12em",
                      maxHeight: "24em",
                  }}
                  className="bg-transparent px-1 h-fit flex-grow overflow-y-auto"
                  placeholder="No description"
                  onChange={(e) => updateSize(e)}
                  onBlur={(e) => handleChangeDescription(e)}
                  defaultValue={item!.description}
        ></textarea>
        </div>
    )
}