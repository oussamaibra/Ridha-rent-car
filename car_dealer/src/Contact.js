import React, { useState } from "react";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';

function Contact() {
  const { t } = useTranslation();

  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [subject, setsubject] = useState(null);
  const [message, setmessage] = useState(null);

  const sendEmail = () => {

    const data = {
      name, email, subject, message
    }

    const templateParams = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    };

    const serviceID = 'service_qgweni8'
    const templateID = 'template_6w9s59f'
    const publicKey = 'JCl2nVedMtBs6NSlz'

    emailjs
      .send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )
      .then(() => {
        alert("Email Send ")
        setemail('')
        setname('')
        setsubject('')
        setmessage('')
      })
      .catch((res) => {
        alert("Error Email Send ")
      });

  }

  return (

    //contact!primo!carthage

    < div className="inventory" >
      <div id="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>{t("Contact Us")}</h1>
              <div className="line" />
              <span> {t("Your dream car is just a visit away!")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="contact-form">
                <form
                  id="contact_form"
                  action="#"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        className="name"
                        name="s"
                        onChange={(e) => {
                          setname(e.target.value)
                        }}
                        value={name}
                        placeholder={t("First name")}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        className="email"
                        name="s"
                        onChange={(e) => {
                          setemail(e.target.value)
                        }}
                        value={email}
                        placeholder={t("Email address")}
                      />
                    </div>

                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        className="phone"
                        name="s"
                        onChange={(e) => {
                          setsubject(e.target.value)
                        }}
                        value={subject}
                        placeholder={t("subject")}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <textarea
                        id="message"
                        className="message"
                        name="message"
                        onChange={(e) => {
                          setmessage(e.target.value)
                        }}
                        value={message}
                        placeholder={t("Write message")}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="advanced-button" onClick={() => {
                        sendEmail()
                      }}>
                        <a>
                          {t("Send Message")}
                          <i className="fa fa-paper-plane" />
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info">
                <div className="phone">
                  <h4> {t("Phone")}</h4>
                  <span>{t("+1 5146637749")} </span>
                </div>
                  <span>{t("+1 5142370153")}</span>
                <div className="email">
                  <h4> {t("E-mail")}</h4>
                  <span>{t("primocarthageauto@gmail.com")}</span>
                </div>
                <div className="address">
                  <h4>{t("Address")}</h4>
                  <span>
                    {t("168 Av. Broadway, Montréal-Est,")}
                    <br />
                    {t("QC H1B 5A3, Canada")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <iframe
        className="map"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=168 Av. Broadway, Montréal-Est, QC H1B 5A3, Canada&amp;output=embed"
        width="100%"
        height="450"
        title="myFrame"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <Footer />
    </div >
  );
}

export default Contact;
