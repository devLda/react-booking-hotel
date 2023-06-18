import React from "react";

import "../../../styles/commenthome.css";

import avata_1 from "../../../assets/img/team/1.jpg";
import quote from "../../../assets/img/quot.png";

const CommentHome = () => {
  return (
    <div class="item">
      <span class="quote">
        <img src={quote} alt="quote" />
      </span>
      <p>
        Khách sạn này thật tuyết vời, tôi vô cùng yêu thích nó. Nó có tất cả mọi
        tiện nghi mà tôi cần. Từ nhà tắm, giường cho đến bàn trà, tất cả đều rất
        vừa lòng
      </p>
      <div class="info">
        <div class="author-img">
          <img src={avata_1} alt="avata" />
        </div>
        <div class="cont">
          <span>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
          </span>
          <h6>Nguyễn Bá Trực</h6> <span>Bình luận của khách</span>
        </div>
      </div>
    </div>
  );
};

export default CommentHome;
