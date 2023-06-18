import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/roomitem.css";
import path from "../../../utils/path";

const RoomItem = (props) => {
  const { id, width, image, title } = props;
  return (
    <div className={`item-room ${width ? width : ""}`}>
      <div class="item">
        <div class="position-re o-hidden">
          <img src={image ? image : ""} alt="room item" />
        </div>
        <span class="category">
          <Link to="/">Đặt phòng</Link>
        </span>
        <div class="con">
          <h6>0-4.600.000 đ/ Đêm</h6>
          <h5>{title ? title : ""}</h5>
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
                <Link to={`/${path.DETAIL_ROOM}/${id}`}>
                  Chi tiết <i class="fa-solid fa-arrow-right"></i>
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
