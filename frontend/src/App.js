import { Routes , Route } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";

function App() {
  return (
    <Routes>
      <Route exact path = "/product/:id" element = {<ProductDetails/>} />
    </Routes>
  );
}

export default App;
