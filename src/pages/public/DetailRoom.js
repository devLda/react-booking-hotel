/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Paralax from "../../components/UI/paralax";
import path from "../../utils/path";

import { LoadingData } from "../../components/UI/loading";
import "../../styles/detailroom.css";

const DetailRoom = () => {
  const { idloaiphong } = useParams();
  const { loaiphong, status } = useSelector((state) => state.loaiphong);
  const navigate = useNavigate();

  const Loai = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (status === "pending") {
    return <LoadingData />;
  } else {
    loaiphong.forEach((element) => {
      if (idloaiphong === element._id) Loai.current = element;
    });
  }

  // console.log(Loai.current);

  return (
    <>
      <Paralax
        title="Khách sạn sang trọng Anh Oct"
        content="Chi tiết loại phòng"
      />

      <section className="pt-12">
        <div className="container">
          <div class="">
            <span>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
            </span>
            <div class="section-subtitle">Khách sạn sang trọng Anh Oct</div>
            <div class="section-title">
              {Loai.current && Loai.current.TenLoaiPhong}
            </div>
          </div>

          <div className="content-detail flex">
            <div className="shrink-[2]">
              <p className="mb-8 w-11/12">
                {Loai.current && Loai.current.MoTa}
              </p>

              <div className="img-detail w-11/12 my-10">
                <img
                  className="h-full w-full"
                  src={Loai.current.images[0]}
                  alt={Loai.current.TenLoaiPhong}
                />
              </div>

              <div className="flex flex-wrap">
                <div className="w-6/12 flex-1">
                  <h6>Nhận phòng</h6>
                  <ul className="page-list mb-8">
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Nhận phòng từ 9:00 sáng</p>
                      </div>
                    </li>
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Nhận phòng sớm tùy vào tình trạng phòng trống</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-6/12 flex-1">
                  <h6>Trả phòng</h6>
                  <ul className="page-list mb-8">
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Trả phòng trước buổi trưa</p>
                      </div>
                    </li>
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Trả phòng cấp tốc</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="w-full flex-1">
                <h6>Hướng dẫn nhận phòng đặc biệt</h6>
                <p>
                  Khách sẽ nhận được email có nội dung 3 ngày trước khi đến
                  hướng dẫn nhận phòng; nhân viên lễ tân sẽ chào đón khách trên
                  Để biết thêm chi tiết, xin vui lòng liên hệ với khách sạn bằng
                  cách sử dụng thông tin trong xác nhận đặt phòng.
                </p>
              </div>
              <div class="w-full flex-1">
                <h6>Vật nuôi</h6>
                <p>Vật nuôi không được cho phép</p>
              </div>
              <div class="w-full flex-1">
                <h6>Trẻ em và giường phụ</h6>
                <p>
                  Trẻ em được chào đón Trẻ em ở miễn phí! Trẻ em được ở miễn phí
                  khi sử dụng bộ đồ giường hiện có; trẻ em có thể không đủ điều
                  kiện cho Bữa sáng miễn phí Có giường gấp/giường phụ cho
                  200.000 mỗi ngày.
                </p>
              </div>

              <div class="w-full flex-1 mb-10">
                <button
                  className="button"
                  onClick={(e) => {
                    navigate(`/${path.SEARCH}`, {
                      state: {
                        startDate: new Date(),
                        endDate: new Date(),
                        search: "",
                        loaiphong: idloaiphong,
                      },
                    });
                  }}
                >
                  <span>Đặt phòng ngay</span>
                </button>
              </div>
            </div>

            <div className="mb-30 shrink">
              <h6>Tiện nghi</h6>
              <ul class="list-unstyled page-list mb-30">
                {Loai &&
                  Loai.current.TienNghi &&
                  Loai.current.TienNghi.map((item, index) => (
                    <li key={index}>
                      <div class="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div class="page-list-text">
                        <p>{item}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailRoom;
