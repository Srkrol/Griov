import React, { Component } from "react";
import tempImg from "./../../images/Temp.png";
import axios from "axios";
import { connect } from "react-redux";
import { curtemp } from "../../../constants/api";
import { withRouter } from 'react-router-dom';
import "./LkCurrentValues.css";

class LkCurTemp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempTime: null,
      tempDay: null,
      tempValue: null,
      boxid: localStorage.getItem('boxid')
    };
  }

  Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get(`${curtemp}?boxid=${this.state.boxid}`, headers)
      .then((res) =>
        this.setState({
          tempTime: res.data[0].dttime,
          tempDay: res.data[0].dtday,
          tempValue: res.data[0].value,
        })
      )
      .catch((e) => {

        this.props.history.push('/_500')
      });
  }
  componentDidMount() {
    if (this.props.user && this.state.tempTime === null) {
      this.Fetch()
    }
  }

  componentDidUpdate() {
    if (this.props.user && this.state.tempTime === null) {
      this.Fetch()
    }
  }

  render() {
    const { tempTime } = this.state;
    const { tempDay } = this.state;
    const { tempValue } = this.state;

    return (
      <div className="lkcurval">
        <img className="lkicon" src={tempImg} />
        <h2 className="lkhead"> Температура </h2>
        <h1 className="lkvalue">{tempValue}</h1>
        <h3 className="lkdata">
          {tempTime} {tempDay}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default withRouter(connect(mapStateToProps)(LkCurTemp))