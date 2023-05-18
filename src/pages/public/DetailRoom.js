/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useRef } from "react";
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
      <Paralax title="Anh Oct Luxury Hotel" content="Detail Room" />

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
            <div class="section-subtitle">Luxury Hotel</div>
            <div class="section-title">
              {Loai.current && Loai.current.TenLoaiPhong}
            </div>
          </div>

          <div className="content-detail flex">
            <div className="shrink-[2]">
              <p className="mb-8">{Loai.current && Loai.current.MoTa}</p>

              <div className="img-detail w-11/12 my-10">
                <img
                  className="h-full w-full"
                  src={Loai.current.images[0]}
                  alt={Loai.current.TenLoaiPhong}
                />
              </div>

              <div className="flex flex-wrap">
                <div className="w-6/12 flex-1">
                  <h6>Check-in</h6>
                  <ul className="page-list mb-8">
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Check-in from 9:00 AM - anytime</p>
                      </div>
                    </li>
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Early check-in subject to availability</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-6/12 flex-1">
                  <h6>Check-out</h6>
                  <ul className="page-list mb-8">
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Check-out before noon</p>
                      </div>
                    </li>
                    <li>
                      <div className="page-list-icon">
                        {" "}
                        <i class="fa-solid fa-check"></i>{" "}
                      </div>
                      <div className="page-list-text">
                        <p>Express check-out</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="w-full flex-1">
                <h6>Special check-in instructions</h6>
                <p>
                  Guests will receive an email 5 days before arrival with
                  check-in instructions; front desk staff will greet guests on
                  arrival For more details, please contact the property using
                  the information on the booking confirmation.
                </p>
              </div>
              <div class="w-full flex-1">
                <h6>Pets</h6>
                <p>Pets not allowed</p>
              </div>
              <div class="w-full flex-1">
                <h6>Children and extra beds</h6>
                <p>
                  Children are welcome Kids stay free! Children stay free when
                  using existing bedding; children may not be eligible for
                  complimentary breakfast Rollaway/extra beds are available for
                  $ 10 per day.
                </p>
              </div>

              <div class="w-full flex-1 mb-10">
                <button
                  className="button"
                  onClick={(e) => {
                    navigate(`/${path.BOOKING}/${idloaiphong}`);
                  }}
                >
                  <span>Book now</span>
                </button>
              </div>
            </div>

            <div className="mb-30 shrink">
              <h6>Amenities</h6>
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
                        <p>{item.slice(1, item.length - 1)}</p>
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
