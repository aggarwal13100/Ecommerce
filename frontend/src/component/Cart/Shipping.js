import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import {FaHome} from "react-icons/fa"
import {ImEarth} from "react-icons/im"
import {GiCapitol} from "react-icons/gi"
import {MdPinDrop , MdLocationCity ,MdContactPhone} from "react-icons/md"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import CheckoutSteps from "./CheckoutSteps.js"

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [formData ,  setFormData] = useState(shippingInfo);
  function changeHandler(e) {
    let [name, value] = [e.target.name, e.target.value];
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function submitHandler(e) {
    e.preventDefault();
    if (formData.phoneno.length < 10 || formData.phoneno.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo(formData)
    );
    navigate("/order/confirm");
    // console.log(formData);
  }


  return (
    <>
    <div className="text-xl text-center p-2">HEADER</div>
    <div className="mt-8">
      <CheckoutSteps activeStep = {0}/>
    </div>
    <div className="w-11/12 h-[80vw] mx-auto max-w-[700px]">
    <h1 className="text-center font-semibold text-2xl underline underline-offset-[1rem] m-6">Shipping Details</h1>
      <form className="w-full flex flex-col  px-[1rem] pb-4" onSubmit={submitHandler}>

        <label
        className="flex gap-x-2  pb-1 text-base"
         htmlFor="address"><div className="text-midnight-green"><FaHome className="text-xl"/></div>Address</label>
        <input
        className="p-1 tracking-wide pl-2 rounded-md border-midnight-green border-r border-b shadow-md capitalize
         hover:shadow-xl 
         focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
          value={formData.address}
          onChange={changeHandler}
          type="text"
          id="address"
          name="address"
          placeholder="Please Enter your Address"
          required
        />{" "}
        <br />

        <label
        className="flex gap-x-2 items-center pb-1 text-base" htmlFor="city"><div className="text-midnight-green"><MdLocationCity className="text-xl"/></div>City</label>
        <input
        className="p-1 pl-2 tracking-wide rounded-md border-midnight-green border-left-[1px] border-r border-b shadow-md capitalize  hover:shadow-xl 
        focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
          value={formData.city}
          onChange={changeHandler}
          type="text"
          id="city"
          name="city"
          placeholder="Please Enter your city"
          required
        />{" "}
        <br />

        <label
        className="flex gap-x-2 items-center pb-1 text-base" htmlFor="pincode"><div className="text-midnight-green"><MdPinDrop className="text-xl"/></div>PinCode</label>
        <input
        className="p-1 pl-2 tracking-wide  hover:shadow-xl  rounded-md border-midnight-green border-left-[1px] border-r border-b shadow-md capitalize 
        focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
          value={formData.pincode}
          onChange={changeHandler}
          type="number"
          id="pincode"
          name="pincode"
          placeholder="Please Enter your PinCode"
          required
        />{" "}
        <br />

        <label
        className="flex gap-x-2 items-center pb-1 text-base" htmlFor="phoneno"><div className="text-midnight-green"><MdContactPhone className="text-xl"/></div>Phone No</label>
        <input
        className="p-1 pl-2 tracking-wide hover:shadow-xl   rounded-md border-midnight-green border-left-[1px] border-r border-b shadow-md capitalize 
        focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
          value={formData.phoneno}
          onChange={changeHandler}
          type="number"
          id="phoneno"
          name="phoneno"
          placeholder="Please Enter your Phone No"
          required
        />{" "}
        <br />

        <label
        className="flex gap-x-2 items-center pb-1 text-base" htmlFor="country"><div className="text-midnight-green"><ImEarth className="text-xl"/></div>Country</label>
        <select
        className="p-[5px] pl-2 hover:shadow-xl  tracking-wider rounded-md border-midnight-green border-left-[1px] border-r border-b shadow-md capitalize 
        focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
          value={formData.country}
          onChange={changeHandler}
          name="country"
          id="country"
          required
        >
          <option value="">Country</option>
          {Country &&
            Country.getAllCountries().map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
        </select>
        <br />

        {formData.country && (
          <>
          <label
          className="flex gap-x-2 items-center pb-1 text-base" htmlFor="state"><div className="text-midnight-green"><GiCapitol className="text-xl"/></div>State</label>
            <select
        className="p-[5px] hover:shadow-xl  tracking-wider pl-2 rounded-md border-midnight-green border-left-[1px] border-r border-b shadow-md capitalize 
        focus:outline-none focus:shadow-xl focus:border-r-[2px] focus:border-b-[2px]"
              value={formData.state}
              onChange={changeHandler}
              name="state"
              id="state"
          required
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(formData.country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            <br />
          </>
        )}
        <input className={`bg-[#023436e5] text-baby-powder p-1 rounded-lg mt-3 py-[5px] text-base hover:bg-midnight-green transition-colors duration-300 hover:shadow-xl tracking-wider `}
              type="submit"
              value="Continue"
              disabled={formData.state ? false : true}
            />
      </form>
    </div>
    </>
  );
};

export default Shipping;
