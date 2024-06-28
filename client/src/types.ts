
export type Shelf = {
    id: number
    name: string
    description: string
}

export type Item = {
    id: number,
    name: string,
    description: string,
    spineColor: string | null,
    textColor: string | null,
    images: string | null
}

export type ImageList = {
    spine: string | null;
    main: string | null;
}