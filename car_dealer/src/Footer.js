import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="about-us">
                <img src="assets/images/logo_4.png" alt="" />
              </div>
            </div>

            <div className="col-md-3">
              <div className="about-us">
                <strong>{t("Ridha Rent Car automobile")}</strong>
                <ul>
                  <li>
                    <i className="fa fa-map-marker" />
                    {t("168 Av. Broadway, Montréal-Est, QC H1B 5A3, Canada")}
                  </li>
                  <li>
                    <i className="fa fa-phone" />
                    {t("+1 5146637749 / +1 5142370153")}
                  </li>
                  <li>
                    <i className="fa fa-envelope-o" />
                    {t("primocarthageauto@gmail.com")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3">
              <div className="featured-links">
                <h4> {t("Featured Links")}</h4>
                <ul>
                  <li>
                    <a href="/">
                      <i className="fa fa-caret-right" />
                      {t("Home")}
                    </a>
                  </li>
                  <li>
                    <a href="/listing">
                      <i className="fa fa-caret-right" />
                      {t("Inventory")}
                    </a>
                  </li>
                  <li>
                    <a href="/financing">
                      <i className="fa fa-caret-right" />
                      {t("Financing")}
                    </a>
                  </li>

                  <li>
                    <a href="/contact">
                      <i className="fa fa-caret-right" />
                      {t("Contact")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="horaire">
                <h4> {t("Heures d'ouverture")}</h4>
                <div className="horaire-item">
                  <span>Lundi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Mardi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Mercredi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Jeudi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Vendredi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Samedi: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
                <div className="horaire-item">
                  <span> Dimanche: </span>
                  <span>10:00 AM - 06:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div id="sub-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <p>
                Copyrights 2024 <em>Ridha Rent Car</em>
              </p>
            </div>
          </div>
        </div>
      </div>
      <a href="#" className="go-top">
        <i className="fa fa-angle-up" />
      </a>
    </>
  );
};

export default Footer;
