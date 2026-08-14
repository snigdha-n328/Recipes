import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {useState, useEffect} from 'react';

export default function Navbar() {
    const [cart, setCart] = useState(() =>
        JSON.parse(localStorage.getItem("cartItems") || "[]")
    );

    useEffect(() => {
        const updateCart = () => {
            setCart(JSON.parse(localStorage.getItem("cartItems") || "[]"));
        };

        // Same-tab updates
        window.addEventListener("cartUpdated", updateCart);

        // Updates from other tabs/windows
        window.addEventListener("storage", updateCart);

        return () => {
            window.removeEventListener("cartUpdated", updateCart);
            window.removeEventListener("storage", updateCart);
        };
    }, []);

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
                    Recipe2Plate
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-md font-medium transition ${isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-600"} `}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/favourites"
                    className={({ isActive }) => `text-md font-medium transition ${isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-600"} `}
                >
                    Wishlist
                </NavLink>

                <NavLink
                    to="/myCart"
                    className={({ isActive }) =>
                        `relative flex items-center gap-1 text-md font-medium transition ${isActive
                            ? "text-orange-600"
                            : "text-gray-700 hover:text-orange-600"
                        }`
                    }
                >
                    <span>My Cart</span>
                    {/* Cart icon */}
                    <ShoppingCart className="h-4 w-4" />

                    {/* Cart count badge */}
                    {cart.length > 0 && (
                        <span className="absolute -top-2 left-18 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold leading-none text-white">
                            {cart.length}
                        </span>
                    )}

                </NavLink>
            </div>
        </nav>
    );
}
