
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex w-dvh h-dvh items-center justify-center select-none">
            <article className="flex gap-2 sm:gap-3 md:gap-3.5 items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">404</h1>
                <span className="block w-[1.5px] md:w-0.5 h-8 md:h-12 bg-black rounded-full"></span>
                <p className="font-light text-sm sm:text-base">This page cloud not be found.</p>
            </article>
            <div className="fixed top-3 left-4">
                <Link to="/" className="relative">
                    {"≼ HOME"}
                </Link>
            </div>
        </div>
    )
}

export default NotFound;
