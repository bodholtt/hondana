import {createContext} from "react";
import type { Item, Shelf } from "@/types"

export const ShelfContext = createContext<Shelf | undefined>(undefined);
export const ItemContext = createContext<Item | undefined>(undefined);