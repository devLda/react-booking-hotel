import { useEffect } from "react";

import Paralax from "../../components/UI/paralax";
import { Introduce } from "../../components/UI/about";

import "../../styles/about.css";

const Facilities = [
  {
    icon: "fa-solid fa-plane",
    title: "Đón khách từ sân bay",
    describe:
      "Ngay khi bạn vừa xuống sân bay, hãy liên hệ với chúng tôi, chúng tôi sẽ đón bạn",
  },
  {
    icon: "fa-solid fa-car",
    title: "Bãi đỗ xe",
    describe: "Chúng tôi có bãi đỗ xe rộng rãi phục vụ cho hành khách",
  },
  {
    icon: "fa-solid fa-bed",
    title: "Dịch vụ phòng",
    describe:
      "Chúng tôi có các dịch vụ phòng đi kèm chăm sóc quý khách tận tình",
  },
  {
    icon: "fa-solid fa-person-swimming",
    title: "Bể bơi",
    describe:
      "Tại sảnh của khách sạn có bể bơi. Quý khách có thể sử dụng miễn phí",
  },
  {
    icon: "fa-solid fa-wifi",
    title: "Wifi miễn phí",
    describe:
      "Hệ thống kết nối wifi có ở mỗi tầng sẽ là tiện nghi không thể thiếu dành cho quý khách",
  },
  {
    icon: "fa-solid fa-mug-saucer",
    title: "Bữa sáng",
    describe:
      "Bữa sáng tùy chọn dành riêng cho quý khách chắc chắn sẽ làm hài lòng những người khó tính nhất",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Paralax title="Anh Oct Luxury Hotel" content="About" />

      <Introduce />

      <section className="facilties section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-subtitle">Dịch vụ của chúng tôi</div>
              <div className="section-title">Cơ sở vật chất</div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {Facilities.map((item, index) => (
              <div key={index} className="flex w-1/3 px-4">
                <div className="single-facility animate-box">
                  <i className={item.icon}></i>
                  <h5>{item.title}</h5>
                  <p>{item.describe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
