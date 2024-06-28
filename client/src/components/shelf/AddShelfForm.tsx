"use client"
import {type FormEvent, useState} from "react";
import {API_URL} from "@/common";

/**
 * Form to create a new shelf.
 */
export default function AddShelfForm() {
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch(`${API_URL}/shelf/create`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.link) {
            window.location.href = data.link;
        }
        if (data.message) {
            setResponseMessage(data.message);
        }
    }
    return (
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl dark:text-emerald-50">Create a shelf</h2>
            <form onSubmit={submit} className="flex flex-row gap-1">
                <input type="text"
                       name="name"
                       placeholder="Shelf Name"
                       className="border-2 p-1 rounded border-emerald-950 focus:outline-none focus:bg-emerald-50"
                       required/>
                <button className="default-button"
                        type="submit">Create Shelf
                </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}