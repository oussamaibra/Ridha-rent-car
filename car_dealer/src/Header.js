import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [visible, setvisible] = useState(false);
  const [activeLgn, setActiveLgn] = useState(
    localStorage.getItem("i18nextLng")
  );

  const { i18n, t } = useTranslation();

  const handleLangUpdate = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLgn(lang);
  };
  return (
    <>
      <header className="site-header">
        <div id="main-header" className="main-header header-sticky">
          <div className="inner-header container clearfix">
            <div className="logo">
              <Link to="/">
                <img src="assets/images/logo_4.png" alt="" />
              </Link>
            </div>
            <div className="header-right-toggle pull-right hidden-md hidden-lg">
              <a
                href="javascript:void(0)"
                className="side-menu-button"
                onClick={() => {
                  setvisible(!visible);
                }}
              >
                <i className="fa fa-bars" />
              </a>
            </div>

            {visible && (
              <nav class="responsive-menu text-left hidden-md hidden-lg">
                <ul>
                  <li>
                    <Link to="/">{t("Home")}</Link>
                  </li>
                  <li>
                    <Link to="/booking">{t("Booking")}</Link>
                  </li>

                  <li>
                    <Link to="/contact">{t("Contact Us")}</Link>
                  </li>
                  <li>
                    <div className="lang-nav">
                      <span
                        className={activeLgn === "fr" ? "active" : "lang-item"}
                        onClick={() => handleLangUpdate("fr")}
                      >
                        {" "}
                        FR
                      </span>

                      <span className="fw-bolder"> | </span>
                      <span
                        className={activeLgn === "en" ? "active" : "lang-item"}
                        onClick={() => handleLangUpdate("en")}
                      >
                        {" "}
                        EN
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            )}

            <nav className="main-navigation text-left hidden-xs hidden-sm">
              <ul>
                <li>
                  <Link to="/">{t("Home")}</Link>
                </li>
                <li>
                  <Link to="/booking">{t("Booking")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("Contact Us")}</Link>
                </li>
                <li>
                  <div className="lang-nav">
                    <span
                      className={activeLgn === "fr" ? "active" : "lang-item"}
                      onClick={() => handleLangUpdate("fr")}
                    >
                      {" "}
                      FR
                    </span>

                    <span className="fw-bolder"> | </span>
                    <span
                      className={activeLgn === "en" ? "active" : "lang-item"}
                      onClick={() => handleLangUpdate("en")}
                    >
                      {" "}
                      EN
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
