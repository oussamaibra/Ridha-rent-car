/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import Select from "react-select";
import _ from "lodash";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";

export default function Listing() {
  const { t } = useTranslation();

  const [isload, setisload] = useState(true);
  const [filter, setfilter] = useState(false);
  const [filterUrl, setfilterUrl] = useState(false);

  const [data, setData] = useState([]);
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

  const [searchParams] = useSearchParams();

  const markparam = searchParams.get("markfilter");
  const modelparam = searchParams.get("modelFilter");
  const yearparam = searchParams.get("yearFilter");

  useEffect(() => {
    if (!localStorage.getItem("visit")) {
      axios
        .post(
          "http://127.0.0.1:5000/api/statistic/visit/" +
            String(moment().format("YYYY-MM"))
        )
        .then(() => localStorage.setItem("visit", "true"))
        .catch(() => console.warn("error"));
    }

    axios.get("http://127.0.0.1:5000/api/car").then((response) => {
      if (response.data.car) {
        setData(response.data.car);

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
        if (searchParams.size > 0) {
          setfilterUrl(true);
        }
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

  const handelFilter = () => {
    axios
      .post(
        "http://127.0.0.1:5000/api/statistic/res/" +
          String(moment().format("YYYY-MM"))
      )
      .then((response) => {});

    setfilter(true);
    setfilterUrl(false);

    let updatedData = data;
    if (markfilter) {
      updatedData = updatedData?.filter((item) => {
        const startsWith = item.Make.toLowerCase().trim().startsWith(
          markfilter?.trim().toLowerCase()
        );

        const includes = item.Make.toLowerCase().trim().includes(
          markfilter?.trim().toLowerCase()
        );

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
    }

    if (modelFilter) {
      updatedData = updatedData?.filter((item) => {
        const startsWith = item.Model.toLowerCase().trim().startsWith(
          modelFilter?.trim().toLowerCase()
        );

        const includes = item.Make.toLowerCase().trim().includes(
          modelFilter?.trim().toLowerCase()
        );

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
    }

    if (yearFilter) {
      updatedData = updatedData?.filter((item) => {
        const startsWith = item.Year.trim().toLowerCase().startsWith(
          yearFilter?.trim().toLowerCase()
        );

        const includes = item.Make.trim().toLowerCase().includes(
          yearFilter?.trim().toLowerCase()
        );

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
    }

    if (transmissionFilter) {
      updatedData = updatedData?.filter((item) => {
        const startsWith = item.Transmission.trim().toLowerCase().startsWith(
          transmissionFilter?.trim().toLowerCase()
        );

        const includes = item.Make?.trim().toLowerCase().includes(
          transmissionFilter?.trim().toLowerCase()
        );

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
    }

    setFilterData([...updatedData]);
  };

  const RestFilter = () => {
    setfilter(false);
    setfilterUrl(false);
  };

  const paginateArray = (array, perPage, page) =>
    array.slice((page - 1) * perPage, page * perPage);

  const randerData = () => {
    if (filterUrl) {
      let updatedData = data;

      if (markparam) {
        updatedData = updatedData?.filter((item) => {
          const startsWith = item.Make?.trim().toLowerCase().startsWith(
            markparam?.trim().toLowerCase()
          );

          const includes = item.Make?.trim().toLowerCase().includes(
            markparam?.trim().toLowerCase()
          );

          if (startsWith) {
            return startsWith;
          } else if (!startsWith && includes) {
            return includes;
          } else return null;
        });
      }

      if (modelparam) {
        updatedData = updatedData?.filter((item) => {
          const startsWith = item.Model?.trim().toLowerCase().startsWith(
            modelparam?.trim().toLowerCase()
          );

          const includes = item.Make?.trim().toLowerCase().includes(
            modelparam?.trim().toLowerCase()
          );

          if (startsWith) {
            return startsWith;
          } else if (!startsWith && includes) {
            return includes;
          } else return null;
        });
      }

      if (yearparam) {
        updatedData = updatedData?.filter((item) => {
          const startsWith = item.Year?.trim().toLowerCase().startsWith(
            yearparam?.trim().toLowerCase()
          );

          const includes = item.Make?.trim().toLowerCase().includes(
            yearparam?.trim().toLowerCase()
          );

          if (startsWith) {
            return startsWith;
          } else if (!startsWith && includes) {
            return includes;
          } else return null;
        });
      }

      return updatedData;
    } else {
      let thedata = [];

      if (filter) {
        thedata = filterdata;
      } else {
        thedata = data;
      }

      if (sortFilter === "2") {
        thedata = _.sortBy(thedata, function (o) {
          return Number(o?.Price ?? 0);
        }).reverse();
        return thedata;
      } else if (sortFilter === "1") {
        thedata = _.sortBy(thedata, function (o) {
          return Number(o?.Price ?? 0);
        });
        return thedata;
      } else {
        return thedata;
      }
    }
  };

  const handlePagination = (page) => setpage(page + 1);

  const handleNext = () => {
    if (paginateArray(randerData(), 10, page + 1)?.length > 0)
      setpage(page + 1);
  };

  const handlePrev = () => {
    if (paginateArray(randerData(), 10, page - 1)?.length > 0)
      setpage(page - 1);
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

  return (
    <div className="inventory">
      <div id="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Inventory</h1>
              <div className="line" />
              <span>
                We’ve got the cars, the deals, and the service you deserve!,
                find the best deals and get your car from ower best offers
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="listing-page">
        <div className="container">
          <div className="row">
            <div id="sidebar" className="col-md-3">
              <div className="sidebar-content">
                <div className="head-side-bar">
                  <h4>{t("Search our inventory")} </h4>
                </div>
                <div className="search-form">
                  <Select
                    className="basic-single select-inv"
                    isClearable={true}
                    classNamePrefix="select"
                    placeholder={t("Select Mark")}
                    name="color"
                    maxMenuHeight={"200px"}
                    options={mark}
                    onChange={(e) => {
                      onselectMark(e?.value);
                    }}
                    styles={colourStyles}
                  />

                  <Select
                    className="basic-single select-inv"
                    isClearable={true}
                    classNamePrefix="select"
                    placeholder={t("Select Model")}
                    name="color"
                    maxMenuHeight={"200px"}
                    options={model}
                    onChange={(e) => {
                      onselectModel(e?.value);
                    }}
                    styles={colourStyles}
                  />
                  <Select
                    className="basic-single select-inv"
                    isClearable={true}
                    classNamePrefix="select"
                    placeholder={t("Select Year")}
                    name="color"
                    maxMenuHeight={"200px"}
                    options={year}
                    onChange={(e) => {
                      setyearFilter(e?.value);
                    }}
                    styles={colourStyles}
                  />
                  <Select
                    className="basic-single select-inv"
                    isClearable={true}
                    classNamePrefix="select"
                    placeholder={t("Select Transmissions")}
                    name="color"
                    maxMenuHeight={"200px"}
                    options={transmission}
                    onChange={(e) => {
                      settransmissionFilter(e?.value);
                    }}
                    styles={colourStyles}
                  />
                  <div
                    className="advanced-button mb"
                    onClick={() => {
                      handelFilter();
                    }}
                  >
                    <a>
                      {t("Search Now")}
                      <i className="fa fa-search" />
                    </a>
                  </div>

                  <div
                    className="advanced-button"
                    onClick={() => {
                      RestFilter();
                    }}
                  >
                    <a>
                      {t("Reset Filter")}
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div id="listing-cars" className="col-md-9">
              <div className="pre-featured">
                <div className="info-text">
                  <h4>
                    {" "}
                    {randerData()?.length} {t("results founded")}{" "}
                  </h4>
                </div>
                <div className="right-content">
                  <div className="input-select">
                    <Select
                      className="basic-single"
                      isClearable={true}
                      classNamePrefix="select"
                      placeholder="Sord Cars By"
                      name="color"
                      maxMenuHeight={"200px"}
                      options={[
                        { value: "1", label: "low to high" },
                        { value: "2", label: "high to low" },
                      ]}
                      onChange={(e) => {
                        setSortFilter(e?.value);
                      }}
                      styles={colourStyles}
                    />
                  </div>
                </div>
              </div>

              {/* List cars */}

              {randerData().length &&
                paginateArray(randerData(), 10, page).map((el) => {
                  return (
                    <div className="featured-item last-featured">
                      <img src={el?.images[0]} className="carPic" alt="" />
                      <div className="right-content">
                        <Link to={`/details/${el._id}`}>
                          <h2>{el.name}</h2>
                        </Link>
                        <span>{el.Price} $</span>
                        <div className="light-line" />
                        <p>
                          <div className="card_specs">
                            <table class="car-specs">
                              <tbody>
                                <tr>
                                  <td class="option-primary">Vin:&nbsp;</td>
                                  <td class="spec">{el?.Vin ?? "NONE"}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">Make:&nbsp;</td>
                                  <td class="spec">{el.Make}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">Model:&nbsp;</td>
                                  <td class="spec">{el.Model}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">
                                    Body type:&nbsp;
                                  </td>
                                  <td class="spec">{el.Bodytype}</td>
                                </tr>
                              </tbody>
                            </table>

                            <table class="car-specs-2 hidden-md hidden-sm hidden-xs">
                              <tbody>
                                <tr>
                                  <td class="option-primary">Engine:&nbsp;</td>
                                  <td class="spec">{el.Engine}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">
                                    Cylinders:&nbsp;
                                  </td>
                                  <td class="spec">{el.Cylinder}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">
                                    Exterior color:&nbsp;
                                  </td>
                                  <td class="spec">{el.EXTERIORCOLOR}</td>
                                </tr>
                                <tr>
                                  <td class="option-primary">
                                    Interior color:&nbsp;
                                  </td>
                                  <td class="spec">{el.INTERIORCOLOR}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="view-details">
                              <Link to={`/details/${el._id}`}>
                                {t(" View Details")}{" "}
                              </Link>
                            </div>
                          </div>
                        </p>

                        <div className="car-info">
                          <ul>
                            <li>
                              <i className="icon-gaspump" />
                              {el?.Energy}
                            </li>
                            <li>
                              <i className="icon-road2" />
                              year {el.Year}
                            </li>
                            <li>
                              <i className="icon-road2" />
                              {el.Mileage}
                            </li>
                            <li>{el.Transmission}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* List cars */}

              <div className="pagination">
                <div className="prev">
                  <a to="#" onClick={() => handlePrev()}>
                    <i className="fa fa-arrow-left" />
                    Prev
                  </a>
                </div>
                <div className="page-numbers">
                  <ul>
                    {[
                      ...Array(Math.ceil(randerData().length / 10) || 1).keys(),
                    ].map((x) => (
                      <li className={`${x + 1 === page ? "active" : ""} `}>
                        <a to="#" onClick={() => handlePagination(x)}>
                          {x + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="next">
                  <a to="#" onClick={() => handleNext()}>
                    Next
                    <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
