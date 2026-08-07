import { Route, Routes } from "react-router-dom";
import Home from "./uilayer/home/Home";
import RecipeDetails from "./uilayer/recipeDetails/RecipeDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  )
}

export default App