import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <h2 className="text-3xl font-bold">Page not found</h2>
            <Link className="default-button" href="/">Return Home</Link>
        </div>
    )
}