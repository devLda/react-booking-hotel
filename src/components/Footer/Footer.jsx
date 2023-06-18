import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer class="relative block bg-stone-800 py-12 z-10 ">
      <div class="container flex ">
        <div class="w-6/12 px-5">
          <div class="footer-column footer-about">
            <h3 class="footer-title">KHÁCH SẠN ANH OCT</h3>
            <ul class="footer-about-text">
              <li>
                <b>Địa chỉ:</b> Số 3 Cầu Giấy, Phường Láng Thượng, Quận Đống
                Đa,Thành phố Hà Nội
              </li>
              <li>
                <b>Điện thoại liên hệ:</b> +849028888888
              </li>
              <li>
                <b>Email:</b> Sales@anhocthotel.com
              </li>
              <li>
                <ul className="social-media">
                  <li>
                    <a href="https://www.facebook.com">
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/?lang=vi">
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">
                      <i class="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.telegram.com/">
                      <i class="fa-brands fa-telegram"></i>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-3/12 px-5">
          <div class="footer-column footer-explore clearfix">
            <h3 class="footer-title">ĐIỀU CẦN BIẾT</h3>
            <ul class="footer-explore-list list-unstyled">
              <li>
                <Link to="/">FAQS</Link>
              </li>
              <li>
                <Link to="/">Cảnh báo</Link>
              </li>
              <li>
                <Link to="/">Vị trí</Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-3/12 px-5">
          <div class="footer-column footer-explore clearfix">
            <h3 class="footer-title">KÌ HẠN VÀ ĐIỀU KIỆN</h3>
            <ul class="footer-explore-list list-unstyled">
              <li>
                <Link to="/">Kì hạn và điều kiện</Link>
              </li>
              <li>
                <Link to="/">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to="/">Phương thức thanh toán</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-xs text-white">
        <p>© Bản quyền 2023 thuộc sở hữu của Khách sạn Anh Oct</p>
      </div>
    </footer>
  );
};

export default Footer;
