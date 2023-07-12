import { Routes , Route } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";

function App() {
  return (
    <Routes>
      <Route exact path = "/product/:id" element = {<ProductDetails/>} />
      <Route exact path = "/cart" element = {<Cart/>} />
      <Route exact path="/shipping" element={<Shipping/>} />
      <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
    </Routes>
  );
}

export default App;
