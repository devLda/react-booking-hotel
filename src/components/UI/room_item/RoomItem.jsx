import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/roomitem.css";

const RoomItem = (item) => {
  return (
    <div className={"item-room " + item.wItem}>
      <div class="item">
        <div class="position-re o-hidden">
          <img src={item.imgItem.image} alt="" />
        </div>
        <span class="category">
          <Link to="/">Book</Link>
        </span>
        <div class="con">
          <h6>
            <Link to="\">{item.imgItem.price}$ / Night</Link>
          </h6>
          <h5>
            <Link to="\">{item.imgItem.title}</Link>
          </h5>
          <div class="line"></div>
          <div class="row facilities">
            <div class="col col-md-7">
              <ul>
                <li>
                  <i class="fa-solid fa-bed"></i>
                </li>
                <li>
                  <i class="fa-solid fa-bath"></i>
                </li>
                <li>
                  <i class="fa-solid fa-utensils"></i>
                </li>
                <li>
                  <i class="fa-solid fa-temperature-arrow-up"></i>
                </li>
              </ul>
            </div>
            <div class="col col-md-5 text-end">
              <div class="permalink">
                <Link to="\">
                  Details <i class="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
