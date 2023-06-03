import { useEffect } from "react";

import Paralax from "../../components/UI/paralax";

import "../../styles/contact.css";
import { useSelector } from "react-redux";

<i class="fa-brands fa-facebook"></i>;
const Info = [
  {
    icon: "fa-solid fa-phone-volume",
    title: "Số điện thoại liên hệ",
    describe: "+849028888888",
  },
  {
    icon: "fa-solid fa-envelope",
    title: "Email",
    describe: "Sales@anhocthotel.com",
  },
  {
    icon: "fa-solid fa-location-dot",
    title: "Địa chỉ",
    describe: "Số 3 Cầu Giấy, phường Láng Thượng, quận Đống Đa, Hà Nội ",
  },
  {
    icon: "fa-brands fa-facebook",
    title: "Facebook",
    describe: "https://www.facebook.com",
  },
];

const Contact = () => {
  const {loaiphong } = useSelector((state) => state.loaiphong);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="contact">
      <Paralax title="Anh Oct Luxury Hotel" content="Contact" />

      <div className="pt-20 pb-10">
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
            <div class="section-title">Thông tin liên hệ</div>
            <p>
              Nếu quý khách có bất cứ thắc mắc về chính sách cũng như dịch vụ
              hoặc muốn đặt phòng, quý khách có thể liên hệ với chúng tôi thông
              qua các kênh sau:
            </p>

            {Info.map((item, index) => (
              <div key={index} className="contact-info">
                <div className={`icon ${index === 2 ? `mr-2` : ""}`}>
                  <i class={item.icon}></i>
                </div>
                <div className="call ml-3">
                  <p>{item.title}</p>
                  <br />
                  {index !== 3 ? (
                    <span>{item.describe}</span>
                  ) : (
                    <a href={item.describe} className="hover:text-yellow-700">
                      {item.describe}
                    </a>
                  )}
                </div>
              </div>
            ))}
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
      </div>
    </section>
  );
};

export default Contact;
