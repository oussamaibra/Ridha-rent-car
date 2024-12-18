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
                    {t("Rue Bahri Brigui, Bekalta 5090")}
                  </li>
                  <li>
                    <i className="fa fa-phone" />
                    {t("+216 94804802 / +216 97768223 / +216 97420830")}
                  </li>
                  <li>
                    <i className="fa fa-envelope-o" />
                    {t("Ridharentacar@gmail.com")}
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
  <h4>{t("Heures d'ouverture")}</h4>
  <div className="horaire-item">
    <span>{t("Lundi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Mardi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Mercredi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Jeudi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Vendredi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Samedi")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
  </div>
  <div className="horaire-item">
    <span>{t("Dimanche")}: </span>
    <span>{t("10:00 AM - 06:00 PM")}</span>
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
