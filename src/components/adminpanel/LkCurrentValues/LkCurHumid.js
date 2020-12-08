import React, { Component } from "react";
import { connect } from "react-redux";
import humidImg from "./../../images/Humid.png";
import axios from 'axios'
import { curhumid } from '../../../constants/api'
import "./LkCurrentValues.css";
import { withRouter } from 'react-router-dom'

class LkCurHumid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      humidTime: null,
      humidDay: null,
      humidValue: null,
      boxid: localStorage.getItem('boxid')
    };
  }
  Fetch = () => {
    const localtoken = localStorage.getItem('token')

    const headers = {
      headers: {
        'Authorization': 'Bearer ' + localtoken,
        'Content-Type':'multipart/form-data'
      }
    }

    axios.get(`${curhumid}?boxid=${this.state.boxid}`, headers)
      .then((res) =>
        this.setState({
          humidTime: res.data[0].dttime,
          humidDay: res.data[0].dtday,
          humidValue: res.data[0].value,
        })
      )
      .catch(e => {

        this.props.history.push('/_500')
      })
  }


  componentDidMount() {
    if (this.props.user && this.state.humidTime === null) {
      this.Fetch()
    }
  }

  componentDidUpdate() {
    if (this.props.user && this.state.humidTime === null) {
      this.Fetch()
    }
  }

  render() {
    const { humidTime } = this.state;
    const { humidDay } = this.state;
    const { humidValue } = this.state;

    return (
      <div className="lkcurval">
        <img className="lkicon" src={humidImg} />
        <h2 className="lkhead"> Влажность </h2>
        <h1 className="lkvalue">{humidValue}</h1>
        <h3 className="lkdata">
          {humidTime} {humidDay}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default withRouter (connect(mapStateToProps)(LkCurHumid))