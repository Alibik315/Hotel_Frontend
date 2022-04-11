import * as React from "react";
import {
  Avatar,
  Link,
  Grid,
  Box,
  Button,
  Typography,
  ContainerAccordion,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import Helmet from "react-helmet";
import image1 from "../../../statics/img/pics/london1.jpg";
import image2 from "../../../statics/img/pics/london2.jpg";
import image3 from "../../../statics/img/pics/london3.jpg";
import image4 from "../../../statics/img/pics/Amsterdom1.jpg";
import image5 from "../../../statics/img/pics/Amsterdom2.jpg";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "../../../css/Hotelcard.css";
import Slider from "@mui/material/Slider";

const stars = [
  {
    value: 1,
    label: "1 star",
  },
  {
    value: 2,
    label: "2 stars",
  },
  {
    value: 3,
    label: "3 stars",
  },
  {
    value: 4,
    label: "4 stars",
  },
  {
    value: 5,
    label: "5 stars",
  },
];

function valuetext(value) {
  if (value === 1) {
    return `${value}star`;
  } else return `${value}stars`;
}

function valueLabelFormat(value) {
  return stars.findIndex((star) => star.value === value) + 1;
}

export default function Newhotelcard() {
  const [value2, setValue2] = useState(4);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Helmet bodyAttributes={{ style: "background-color : #f5f5f5" }}></Helmet>
      <Container maxWidth="lg">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <Slider
              aria-label="Restricted values"
              defaultValue={2}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="auto"
              stars={stars}
            />
            <div className="accordion-item mt-5">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Facilities
                </button>
              </h2>
              <div className="">
                <hr className="mb-0 mt-0 hr-text"></hr>
              </div>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    ></input>
                    <label className="form-check-label" for="flexCheckDefault">
                      Parking
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    ></input>
                    <label className="form-check-label" for="flexCheckDefault">
                      Restraunt
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="card homepage-card mt-5">
              <div className="card-body">
                <div className="row">
                  <div className="col-md">
                    <img src={image1} className="card-img-top"></img>
                  </div>
                  <div className="col-md-6">
                    <div className="row" className="star">
                      <h5 className="card-title">
                        The Landmark London
                        <Rating name="read-only" value={value2} readOnly />
                      </h5>
                    </div>
                    <a href="#">Westminster Borough, London</a>
                    <p className="mb-1">Metro access</p>
                    <p className="card-text">
                      In the heart of London's fashionable Marylebone, this
                      deluxe hotel has a stunning glass-roofed 8-story atrium
                      with towering palm trees, an award-winning restaurant,
                      luxurious bedrooms and an indoor...
                    </p>
                  </div>
                  <div className="col-md-2">
                    <div className="row">
                      <div className="col-md-8">
                        <p className="mb-1 rate">Superb</p>
                        <p className="mb-1 views">2,362 reviews</p>
                      </div>
                      <div className="me-10 col-md-2 score">
                        <h5>
                          <span className="badge bg-dark">9.0</span>
                        </h5>
                      </div>
                    </div>
                    <a href="#" className="btn btn-primary hoverable">
                      show prices
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
