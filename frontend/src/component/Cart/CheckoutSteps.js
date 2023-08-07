import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FaShippingFast } from "react-icons/fa";
import { MdLibraryAddCheck, MdPayments } from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <FaShippingFast />,
    },
    {
      label: "Confirm Order",
      icon: <MdLibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <MdPayments />,
    },
  ];

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep > index ? true : false}
          >
            <StepLabel
              className={` text-2xl ${
                activeStep >= index ? "text-midnight-green" : "text-[#00000086]"
              }`}
              icon={item.icon}
            >
              <div className="text-md font-bold">{item.label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
