import { Routes , Route } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";
import Cart from "./component/Cart/Cart.js";

function App() {
  return (
    <Routes>
      <Route exact path = "/product/:id" element = {<ProductDetails/>} />
      <Route exact path = "/cart" element = {<Cart/>} />
    </Routes>
  );
}

export default App;
