import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";

import "../../../styles/introduce.css"
import { useSelector } from "react-redux";

const Introduce = () => {
  const {loaiphong } = useSelector((state) => state.loaiphong);

  return (
    <section class="about pt-20 pb-10">
      <div class="container flex">
        <div class="mb-7 px-3 w-6/12">
          <span>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
            <i class="star-rating"></i>
          </span>
          <div class="section-subtitle">Anh Oct Luxury Hotel</div>
          <div class="section-title">Tận hưởng trải nghiệm sang trọng</div>
          <p>
            Chào mừng đến với khách sạn sang trọng tốt nhất ở Hà Nội.Khách sạn có hệ thống phòng ốc rộng rãi, sang trọng với đầy đủ tiện nghi đạt tiêu chuẩn phục vụ du khách là các vị Đại sứ quan trọng, các quan chức Chính phủ hay các nam nữ doanh nhân, nhà ga Hà Nội...
          </p>
          <p>
          AnhOct Luxury Hotel là khách sạn chuẩn 5 sao với 24 phòng tiện nghi hiện đại cùng đội ngũ nhân viên chuyên nghiệp cam kết sẽ mang đến mọi du khách một khoảng thời gian đáng nhớ nhất khi đến với khách sạn.
          </p>
          <div className="reservation">
            <div className="icon">
              <i class="fa-solid fa-phone-volume"></i>
            </div>
            <div className="call ml-3">
              <p>Số điện thoại liên hệ</p>
              <br />
              <span>+849028888888</span>
            </div>
          </div>
        </div>
        <div class="px-3 w-3/12">
          <img
            src={loaiphong ? loaiphong[0].images[0] : ""}
            alt="room 8"
            class="mt-20 mb-7"
          />
        </div>
        <div class="px-3 w-3/12">
          <img src={loaiphong ? loaiphong[1].images[0] : ""} alt="room 2" />
        </div>
      </div>
    </section>
  );
};

export default Introduce;
