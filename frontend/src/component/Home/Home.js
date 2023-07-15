import React  from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import { Fragment } from "react";
import MetaData from "../layout/MetaData";

const product ={
    name:"tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"3000",
    _id:"testingid",
};
const Home = () => {
  return (
    <Fragment>
      <MetaData title="Ecommerce"/>
    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>
   
      <a href="#container">
        <button className="bg red">
          Scroll <CgMouse />
        </button>
      </a>
    </div>

    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">
       <Product product={product}/>
       <Product product={product}/> 
       <Product product={product}/>
       <Product product={product}/>

       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>
       {/* products are repeated ,just for testing  */}
    </div>
</Fragment>
  );
};

export default Home;
