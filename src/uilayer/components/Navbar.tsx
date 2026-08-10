import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex h-15 w-full items-center justify-between bg-blue-50 px-8 shadow-md top-0 sticky">
            {/* Logo + Heading */}
            <div className="flex items-center gap-4">
                <img
                    src="/recipe-explorer.png"
                    alt="Recipe Explorer"
                    className="h-12 w-12 rounded-full object-cover border border-gray-200 shadow-xs"
                />

                <h1 className="text-2xl font-bold text-orange-600">
                    Recipe Explorer
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-lg font-medium transition ${isActive
                            ? "text-orange-600"
                            : "text-gray-700 hover:text-orange-600"
                        } `
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        `text-lg font-medium transition ${isActive
                            ? "text-orange-600"
                            : "text-gray-700 hover:text-orange-600"
                        } `
                    }
                >
                    Favourites
                </NavLink>
            </div>
        </nav>
    );
}
