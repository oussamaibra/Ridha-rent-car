import React, { useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Select from "react-select";

function Financing() {
  const [Title, setTitle] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Dateofbirth, setDateofbirth] = useState("");
  const [SIN, setSIN] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [CurrentAddressDuration, setCurrentAddressDuration] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [Province, setProvince] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Company, setCompany] = useState("");
  const [Position, setPosition] = useState("");
  const [Duration, setDuration] = useState("");
  const [MonthlyIncome, setMonthlyIncome] = useState("");
  const [ResidentialStatus, setResidentialStatus] = useState("");
  const [MonthlyRent, setMonthlyRent] = useState("");
  const [isDone, setisDone] = useState(false);
  const handleSubmit = () => {
    console.log("testttt",Title)
    axios
      .post("https://www.ridharentcar.online/api/financing", {
        Title,
        Firstname,
        Lastname,
        Dateofbirth,
        SIN,
        Email,
        Phone,
        CurrentAddressDuration,
        Street,
        City,
        Province,
        PostalCode,
        Company,
        Position,
        Duration,
        MonthlyIncome,
        ResidentialStatus,
        MonthlyRent,
        month: String(moment().format("YYYY-MM")),
      })
      .then((response) => {
        setisDone(true);
      });
  };
  const { t } = useTranslation();

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgba(135, 129, 129, 0.264)",
      border: "none",
      color: "#000",
      outline: "none",
      height: "40px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        textAlign: "center",
        backgroundColor: !isDisabled ? (isSelected ? "red" : "rgba(135, 129, 129, 0.264)") : undefined,
        color: "#000",
        fontSize: "larger",
        height: "40px",

        ":active": {
          ...styles[":active"],
          backgroundColor: "red",
        },
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "#fff",
      fontSize: "larger",
      height: "40px",
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: "#fff",
      fontSize: "larger",
      height:"40px"

    }),
    input: (styles) => ({ ...styles, color: "#fff",      height:"38px"
  }),
  };
  return (
    <>
      <div className="inventory">
        <div id="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>{t("Financing")}</h1>
                <div className="line" />
                <span>{t("Your dream car is just a visit away!")}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="contact-form">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="contact-form">
                    <form id="contact_form" action="#" method="POST" encType="multipart/form-data">
                      <div className="row">
                        <h4> {t("Personal information")}</h4>
                        <br />

                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Title")}

                          <Select
                            className="basic-single select-home"
                            classNamePrefix="select"
                            // placeholder={t("Select")}
                            name="color"
                            maxMenuHeight={"100px"}
                            options={[
                              {
                                label: "M.",
                                value: "M.",
                              },
                              {
                                label: "Mme",
                                value: "Mme",
                              },
                            ]}
                            onChange={(e) => {
                              setTitle(e.value);
                            }}
                            styles={colourStyles}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("First name")} *
                          <input
                            type="text"
                            name="s"
                            placeholder=""
                            value={Firstname}
                            onChange={(val) => {
                              setFirstname(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Last name")} *
                          <input
                            type="text"
                            name="s"
                            value={Lastname}
                            onChange={(val) => {
                              setLastname(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Date of birth")} *
                          <input
                            type="text"
                            name="s"
                            value={Dateofbirth}
                            onChange={(val) => {
                              setDateofbirth(val.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("NAS")}
                          <input
                            type="text"
                            name="s"
                            value={SIN}
                            onChange={(val) => {
                              setSIN(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Email")} *
                          <input
                            type="text"
                            name="s"
                            placeholder=""
                            value={Email}
                            onChange={(val) => {
                              setEmail(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Phone")} *
                          <input
                            type="text"
                            name="s"
                            placeholder="Phone"
                            value={Phone}
                            onChange={(val) => {
                              setPhone(val.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <hr />

                      <div className="row">
                        <h4>{t("Contact information")}</h4>
                        <br />
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Current Address Duration (years)")}
                          <input
                            type="text"
                            name="s"
                            value={CurrentAddressDuration}
                            onChange={(val) => {
                              setCurrentAddressDuration(val.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Street")} *
                          <input
                            type="text"
                            name="s"
                            value={Street}
                            onChange={(val) => {
                              setStreet(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("City")} *
                          <input
                            type="text"
                            name="s"
                            value={City}
                            onChange={(val) => {
                              setCity(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Province")} *
                          <input
                            type="text"
                            name="s"
                            value={Province}
                            onChange={(val) => {
                              setProvince(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Postal Code")} *
                          <input
                            type="text"
                            name="s"
                            value={PostalCode}
                            onChange={(val) => {
                              setPostalCode(val.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <br />
                      <hr />
                      <div className="row">
                        <h4>{t("Current job")}</h4>
                        <br />
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Company")}
                          <input
                            type="text"
                            name="s"
                            value={Company}
                            onChange={(val) => {
                              setCompany(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Position")}

                          <input
                            type="text"
                            name="s"
                            value={Position}
                            onChange={(val) => {
                              setPosition(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Duration (Years)")}

                          <input
                            type="text"
                            name="s"
                            value={Duration}
                            onChange={(val) => {
                              setDuration(val.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <br />
                      <hr />
                      <div className="row">
                        <h4> {t("Financial information")}</h4>
                        <br />
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Monthly Income")}
                          <input
                            type="text"
                            name="s"
                            value={MonthlyIncome}
                            onChange={(val) => {
                              setMonthlyIncome(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Residential Status")}
                          <input
                            type="text"
                            name="s"
                            value={ResidentialStatus}
                            onChange={(val) => {
                              setResidentialStatus(val.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                          {t("Monthly Rent / Mortgage")}

                          <input
                            type="text"
                            name="s"
                            value={MonthlyRent}
                            onChange={(val) => {
                              setMonthlyRent(val.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <br />
                        <h4>{t("Disclosure & Privacy Notice")}</h4>
                        <br />
                      </div>

                      <div className="row">
                        <span>
                          {t(
                            "By checking this box, I consent to the collection, use and disclosure of my personal information as described in this paragraph. I agree that the personal information provided above may be used and disclosed by Mon Automobile and/or its agents or service providers (collectively, the 'Dealer') as necessary to obtain credit, financial and related personal information (including a credit or consumer information report) about me from any credit bureau or credit reporting agency, and to advise me on credit availability in connection with product and/or service purchase financing. Personal information I provide and credit information obtained may also be retained by Dealer and used to facilitate the application process should I subsequently choose to apply for credit through Dealer."
                          )}
                        </span>
                        <br />
                        <strong>
                          *<input type="checkbox" name="s" />
                          {t("I have read and agree to the Terms & Conditions above.")}
                        </strong>
                      </div>

                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="advanced-button">
                          <a
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            {t("Submit")}
                            <i className="fa fa-paper-plane" />
                          </a>
                        </div>
                        {isDone && <strong style={{ color: "green" }}>{t("thanks we have received ur request")}</strong>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Financing;
