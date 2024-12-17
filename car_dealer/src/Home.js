/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import _ from "lodash";
import { useNavigate } from "react-router";
import moment from "moment/moment";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

export const Home = () => {
  const nav = useNavigate();

  const { t } = useTranslation();

  const [isload, setisload] = useState(true);
  const [filter, setfilter] = useState(false);

  const [data, setData] = useState([]);
  const [dataTop, setDataTop] = useState([]);
  const [page, setpage] = useState(1);
  const [filterdata, setFilterData] = useState([]);
  const [refetech, setrefetech] = useState(false);

  const [mark, setmark] = useState([{}]);
  const [model, setmodel] = useState([{}]);
  const [year, setyear] = useState([{}]);

  const [markfilter, setmarkfilter] = useState(null);
  const [modelFilter, setmodelFilter] = useState(null);
  const [yearFilter, setyearFilter] = useState(null);
  const [transmissionFilter, settransmissionFilter] = useState(null);
  const [sortFilter, setSortFilter] = useState(null);

  const [transmission, settransmission] = useState([
    {
      label: "Automatique",
      value: "automatique",
    },
    {
      label: "Manuelle",
      value: "Manuel",
    },
  ]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/car").then((response) => {
      if (response.data.car) {
        setData(response.data.car);
        setDataTop(response.data.car.filter((el) => el.top));

        let Make = Object.keys(_.groupBy(response.data.car, "Make"));
        let Model = Object.keys(_.groupBy(response.data.car, "Model"));
        let Year = Object.keys(_.groupBy(response.data.car, "Year"));

        const marksOp = [];
        const modelOp = [];
        const YearOp = [];

        Make.forEach((el, i) => {
          marksOp.push({
            key: i,
            value: el,
            label: el,
          });
        });

        Model.forEach((el, i) => {
          modelOp.push({
            key: i,
            value: el,
            label: el,
          });
        });

        Year.forEach((el, i) => {
          YearOp.push({
            key: i,
            value: el,
            label: el,
          });
        });

        setmark(marksOp);
        setmodel(modelOp);
        setyear(YearOp);

        setisload(false);
      } else {
        setisload(false);
      }
    });
  }, [refetech]);

  const handrefetech = () => {
    setrefetech(!refetech);
  };

  const onselectMark = (mark) => {
    setmarkfilter(mark);

    setmodel([]);
    setyear([]);
    setyearFilter(null);
    setmodelFilter(null);

    const filteredData = data.filter((el) =>
      el.Make.toLowerCase().trim().includes(mark?.trim().toLowerCase())
    );

    let Model = Object.keys(_.groupBy(filteredData, "Model"));
    let Year = Object.keys(_.groupBy(filteredData, "Year"));

    const modelOp = [];
    const YearOp = [];

    Model.forEach((el, i) => {
      modelOp.push({
        key: i,
        value: el,
        label: el,
      });
    });

    Year.forEach((el, i) => {
      YearOp.push({
        key: i,
        value: el,
        label: el,
      });
    });

    setmodel(modelOp);
    setyear(YearOp);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onselectModel = (Model) => {
    setmodelFilter(Model);
    setyear([]);
    setyearFilter(null);

    const filteredData = data.filter(
      (el) =>
        el.Make.toLowerCase()
          .trim()
          .includes(markfilter?.trim().toLowerCase()) &&
        el.Model.toLowerCase().trim().includes(Model?.trim().toLowerCase())
    );

    let Year = Object.keys(_.groupBy(filteredData, "Year"));

    const YearOp = [];

    Year.forEach((el, i) => {
      YearOp.push({
        key: i,
        value: el,
        label: el,
      });
    });

    setyear(YearOp);
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
        fontSize: "larger",
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
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: "#fff",
      fontSize: "larger",
    }),
    input: (styles) => ({ ...styles, color: "#fff" }),
  };

  const handelSreach = () => {
    nav(
      `/listing?markfilter=${markfilter ?? ""}&modelFilter=${
        modelFilter ?? ""
      }&yearFilter=${yearFilter ?? ""}`
    );

    axios
      .post(
        "http://127.0.0.1:5000/api/statistic/res/" +
          String(moment().format("YYYY-MM"))
      )
      .then((response) => {});
  };

  return (
    <div className="home">
      <div className="cover">
        <div className="title">
          <img src="assets/images/home-header.png" alt="" />
        </div>
      </div>

      {/* <div className="card">
        <div className="search-form">
          <Select
            className="basic-single select-home"
            isClearable={true}
            classNamePrefix="select"
            placeholder={t("Select Mark")}
            name="color"
            maxMenuHeight={"100px"}
            options={mark}
            onChange={(e) => {
              onselectMark(e?.value);
            }}
            styles={colourStyles}
          />

          <Select
            className="basic-single select-home"
            isClearable={true}
            classNamePrefix="select"
            placeholder={t("Select model")}
            name="color"
            options={model}
            maxMenuHeight={"100px"}
            onChange={(e) => {
              onselectModel(e?.value);
            }}
            styles={colourStyles}
          />

          <Select
            className="basic-single select-home"
            isClearable={true}
            classNamePrefix="select"
            placeholder={t("Select year")}
            name="color"
            options={year}
            maxMenuHeight={"100px"}
            onChange={(e) => {
              setyearFilter(e?.value);
            }}
            styles={colourStyles}
          />

          <button
            className="home-advanced-button"
            onClick={() => {
              handelSreach();
            }}
          >
            {t("Search Now")}{" "}
          </button>
        </div>
      </div> */}

      {!isEmpty(dataTop) && (
        <div className="card">
          <h1 className="titel"> {t("Top rated Cars")}</h1>

          <div className="search-form2">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                500: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              pagination={true}
              navigation={true}
              modules={[Pagination,Navigation]}
              className="mySwiper"
            >
              {dataTop?.map((el) => (
                <SwiperSlide>
                  <div onClick={() => nav(`/details/${el._id}`)}>
                    <img src={el?.images[0]} alt="" />
                    <div className="marke_swiper"> {el.Make}</div>
                  
                   
                    <div className="price_swiper">
                      {" "}
                      {numberWithCommas(el?.prices[0]?.value)} TND / Day
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <hr className="home-hr" />

      <p>
        Copyrights 2024 <em>Bekalta Rent Cars</em>
      </p>
    </div>
  );
};
