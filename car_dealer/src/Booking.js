import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Select from "react-select";
import { last, values } from "lodash";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Booking() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [message, setmessage] = useState(null);

  const [pickUpLocation, setpickUpLocation] = useState(null);

  const [pickUpTime, setpickUpTime] = useState(null);
  const [pickUpDate, setpickUpDate] = useState(null);

  const [dropOffdate, setdropOffdate] = useState(null);
  const [dropOfftime, setdropOfftime] = useState(null);

  const [nbDays, setnbDays] = useState(null);
  const [price, setprice] = useState("0 TND");

  const [data, setData] = useState();

  const [transmission, settransmission] = useState([
    {
      label: "Airport Monastir",
      value: "Airport Monastir",
    },
    {
      label: "Airport Enfidha",
      value: "Airport Enfidha",
    },
    {
      label: "Bekalta",
      value: "Bekalta",
    },
  ]);

  useEffect(() => {
    if (id)
      axios.get("http://127.0.0.1:5000/api/car/" + id).then((response) => {
        if (response.data) {
          setData(response.data.car);
        }
      });
  }, []);

  const sendEmail = () => {
    // const data = {
    //   name,
    //   lastname,
    //   email,
    //   phone,
    //   nbDays,
    //   pickUpLocation,
    //   pickUpTime,
    //   pickUpDate,
    //   dropOffdate,
    //   dropOfftime,
    //   message,
    // };

    axios
      .post("http://127.0.0.1:5000/api/financing", {
        name,
        lastname,
        email,
        phone,
        nbDays,
        pickUpLocation,
        pickUpTime,
        pickUpDate,
        dropOffdate,
        dropOfftime,
        price,
        message,
        car: data,
      })
      .then((response) => {
        console.log("eeeeeeeeeeeeee", response);
        setname("");
        setlastname("");
        setemail("");
        setphone("");
        setnbDays("");
        setpickUpLocation("");
        setpickUpTime("");
        setpickUpDate("");
        setdropOffdate("");
        setdropOfftime("");
        setprice("");
        setmessage("");

        toast.success(
          "🚘 Your reservation has been successfully confirmed! We will contact you as soon as possible 🏁",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
            onClose: () => {
              toast.success("Thank you for choosing us ❤ ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                theme: "dark",
                transition: Zoom,
              });
            },
          }
        );
      });
    // const templateParams = {
    //   name: data.name,
    //   email: data.email,
    //   subject: data.subject,
    //   message: data.message,
    // };

    // const serviceID = "service_qgweni8";
    // const templateID = "template_6w9s59f";
    // const publicKey = "JCl2nVedMtBs6NSlz";

    // emailjs
    //   .send(serviceID, templateID, templateParams, publicKey)
    //   .then(() => {
    //     alert("Email Send ");
    //     setemail("");
    //     setname("");
    //     // setsubject("");
    //     setmessage("");
    //   })
    //   .catch((res) => {
    //     alert("Error Email Send ");
    //   });
  };
  const redirectToBookingPage = () => {
    navigate("/");
  };
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgba(135, 129, 129, 0.264)",
      border: "none",
      color: "#000",
      outline: "none",
      padding: "8px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        textAlign: "center",
        backgroundColor: !isDisabled
          ? isSelected
            ? "red"
            : "rgba(135, 129, 129, 0.264)"
          : undefined,
        color: "#000",
        fontSize: "smal",
        ":active": {
          ...styles[":active"],
          backgroundColor: "red",
        },
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "#fff",
      fontSize: "smal",
      textAlign: "center",
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: "#fff",
      fontSize: "smal",
      textAlign: "center",
    }),
    input: (styles) => ({ ...styles, color: "#fff", textAlign: "center" }),
  };
  let statusResult = "PASS";
  return (
    //contact!primo!carthage
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />

      {id ? (
        <>
          <div className="inventory">
            <div id="page-heading">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1>{t("Booking")}</h1>
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
                        <h2>
                          {" "}
                          {t("Car rental quote")} : {data && data?.name}{" "}
                        </h2>
                        <div className="row">
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <Select
                              className="basic-single select-inv"
                              isClearable={true}
                              classNamePrefix="select"
                              placeholder={t("Select pickUp Location")}
                              name="color"
                              // maxMenuHeight={"100px"}
                              options={transmission}
                              onChange={(e) => {
                                setpickUpLocation(e?.value);
                              }}
                              styles={colourStyles}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Pick-up date")}</label>
                            <input
                              type="date"
                              className="name"
                              name="s"
                              onChange={(e) => {
                                setpickUpDate(e.target.value);
                              }}
                              value={pickUpDate}
                              placeholder={t("Pick-up date")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Pick-up Time")}</label>
                            <input
                              type="time"
                              className="name"
                              name="s"
                              onChange={(e) => {
                                setpickUpTime(e.target.value);
                                setdropOfftime(e.target.value);
                              }}
                              value={pickUpTime}
                              placeholder={t("Pick-up Time")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Drop-off date")}</label>
                            <input
                              type="date"
                              className="name"
                              name="s"
                              onChange={(e) => {
                                setdropOffdate(e.target.value);

                                let diff = 1;

                                diff = moment(e.target.value).diff(
                                  moment(pickUpDate),
                                  "days"
                                );
                                if (diff > 7) {
                                  setnbDays("Forfait");
                                  setprice(`${data.prices[6]?.value} TND`);
                                } else {
                                  setnbDays(diff);
                                  setprice(
                                    `${data.prices[diff - 1]?.value} TND`
                                  );
                                }
                              }}
                              value={dropOffdate}
                              placeholder={t("Drop-off date")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Drop-off Time")}</label>
                            <input
                              type="time"
                              className="name"
                              name="s"
                              onChange={(e) => {
                                setdropOfftime(e.target.value);
                              }}
                              value={dropOfftime}
                              placeholder={t("Drop-off Time")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Number Of Days")}</label>
                            <input
                              type="text"
                              className="name"
                              disabled
                              name="s"
                              value={nbDays}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Total price")}</label>
                            <input
                              type="text"
                              className="name"
                              disabled
                              name="s"
                              value={price}
                            />
                          </div>
                        </div>

                        <h2> {t("Details")}</h2>
                        <div className="row">
                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("First name")}</label>
                            <input
                              type="text"
                              className="name"
                              name="s"
                              onChange={(e) => {
                                setname(e.target.value);
                              }}
                              value={name}
                              placeholder={t("First name")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Last name")}</label>
                            <input
                              type="text"
                              className="email"
                              name="s"
                              onChange={(e) => {
                                setlastname(e.target.value);
                              }}
                              value={lastname}
                              placeholder={t("Last name")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Phone")}</label>
                            <input
                              type="number"
                              className="phone"
                              name="s"
                              onChange={(e) => {
                                setphone(e.target.value);
                              }}
                              value={phone}
                              placeholder={t("Phone")}
                            />
                          </div>

                          <div className="col-md-6 col-sm-12 col-xs-12">
                            <label>{t("Email")}</label>
                            <input
                              type="text"
                              className="phone"
                              name="s"
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                              value={email}
                              placeholder={t("Email")}
                            />
                          </div>

                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <label>{t("Write message")}</label>
                            <textarea
                              id="message"
                              className="message"
                              name="message"
                              onChange={(e) => {
                                setmessage(e.target.value);
                              }}
                              value={message}
                              placeholder={t("Write message")}
                            />
                          </div>
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <div
                              className="advanced-button"
                              onClick={() => {
                                sendEmail();
                              }}
                            >
                              <a>
                                {t("Send")}
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
                        <span>{t("+216 94804802")} </span>
                      </div>
                      <span>{t("+216 97768223")}</span>
                      <br></br>
                      <span>{t("+216 97420830")}</span>
                      <div className="email">
                        <h4> {t("E-mail")}</h4>
                        <span>{t("Ridharentacar@gmail.com")}</span>
                      </div>
                      <div className="address">
                        <h4>{t("Address")}</h4>
                        <span>
                          {t("Rue Bahri Brigui, Bekalta 5090")}
                          <br />
                          {t("Route de Mahdia")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="no-booking-page">
          <div className="container1">
            <div className="message-wrapper">
              <h1 className="sorry-message">Oops! 😔</h1>
              <p className="no-booking-text">
                You have not booked your car yet! <br /> Please make a
                reservation to enjoy our services.
              </p>
              <div className="smiley">😞</div>
              <button
                className="book-now-button"
                onClick={() => redirectToBookingPage()}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Booking;
