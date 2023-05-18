import React from "react";

const Paralax = ({ title, content }) => {
  return (
    <div className="banner">
      <div className="container z-10 relative flex justify-center h-full items-end">
      <div className="md:w-8/12 lg:w-full">
        <div class="relative bg-transparent py-8 mb-24">
          <div class="head-box">
            <h6 className="text-white uppercase mb-6 tracking-[.25em] text-base">
              {title ? title : "Title"}
            </h6>
            <h4 className="text-white text-6xl font-normal mb-3 font-Alegreya">
              {content ? content : "Content"}
            </h4>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Paralax;
