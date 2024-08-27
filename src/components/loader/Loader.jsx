import React from "react";
import "./loader.scss";
import { MutatingDots, RotatingSquare, ThreeDots } from "react-loader-spinner";

export default function Loader({ dotsColor }) {
  return (
    <div className="loader-compo">
      <ThreeDots
        color={dotsColor}
        secondaryColor="rgb(17, 24, 39)"
        radius="9"
        ariaLabel="mutating-dots-loading"
        visible={true}
        height={20}

      />
    </div>
  );
}
