import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer class="relative block bg-stone-800 py-12 z-10 ">
      <div class="container flex ">
        <div class="w-6/12 px-5">
          <div class="footer-column footer-about">
            <h3 class="footer-title">ANH OCT HOTEL</h3>
            <ul class="footer-about-text">
              <li>
                <b>Address:</b> 3 Cau Giay Street, Lang Thuong Ward, Dong Da
                District, Hanoi, Vietnam
              </li>
              <li>
                <b>Zalo/Call:</b> +849028888888
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
            <h3 class="footer-title">THINGS TO KNOW</h3>
            <ul class="footer-explore-list list-unstyled">
              <li>
                <Link to="/">FAQS</Link>
              </li>
              <li>
                <Link to="/">Warning</Link>
              </li>
              <li>
                <Link to="/">Location</Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-3/12 px-5">
          <div class="footer-column footer-explore clearfix">
            <h3 class="footer-title">TERM &amp; CONDITION</h3>
            <ul class="footer-explore-list list-unstyled">
              <li>
                <Link to="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Payments &amp; method</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-xs text-white">
        <p>© Copyright 2023 by Anh Oct Hotel</p>
      </div>
    </footer>
  );
};

export default Footer;
