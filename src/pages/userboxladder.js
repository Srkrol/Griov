import React, { useEffect } from 'react'
import { HeaderClimat } from "../components/climat/header";
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getladderuser } from '../constants/api'
import { SET_LADDER_USER } from '../constants/store'

import { LadderUser } from '../components/userboxladder/ladderuser'
import { useHistory } from "react-router-dom";

export const UserBoxLadder = () => {
    const { box, id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        const localtoken = localStorage.getItem("token");

        const form = new FormData();
        form.append("box", box)
  
        const headers = {
          headers: {
            Authorization: "Bearer " + localtoken,
            "Content-Type": "multipart/form-data",
          },
        };
  
        axios
          .post(`${getladderuser}`, form, headers)
          .then((res) => {
            if(res.data.data.length === 0) {
              history.push("/_404")
            }
            dispatch({
              type: SET_LADDER_USER,
              user: res.data.data
            })
          })
          .catch(() => {history.push("/_500");});
    }, [true])
    return (
        <>
        <HeaderClimat />
        <LadderUser id={id} from={box}/>
        </>
    )
}