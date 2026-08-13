import { Route, Routes } from "react-router-dom";
import Home from "./uilayer/home/Home";
import RecipeDetails from "./uilayer/recipeDetails/RecipeDetails";
import Favourites from "./uilayer/favourites/Favourites";
import Navbar from "./uilayer/components/Navbar";
import Cart from "./uilayer/cart/Cart";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/myCart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App