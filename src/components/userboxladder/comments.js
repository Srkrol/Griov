import React, { useEffect } from "react";
import { Comment, Tooltip, List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { getcommentbox } from "../../constants/api";
import { SET_COMMENT_BOX } from "../../constants/store";
import { useHistory } from "react-router-dom";

export const Comments = ({ box }) => {
  const comment = useSelector((state) => state.comm.comment);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("box", box);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${getcommentbox}`, form, headers)
      .then((res) => {
        const data = [];

        const sort = res.data.data.sort((a, b) => {
          return new Date(b.dt).getTime() - new Date(a.dt).getTime();
        });

        sort.forEach((val) => {
          data.push({
            author: (
              <Link
                to={
                  user.username === val.username ? "/userclimat" : "/userinfo/" + val.user_id
                }
              >
                {val.username}
              </Link>
            ),
            content: <p>{val.comment}</p>,
            datetime: (
              <Tooltip title={moment(val.dt).format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment(val.dt).format("YYYY-MM-DD HH:mm:ss")}</span>
              </Tooltip>
            ),
          });
        });
        dispatch({
          type: SET_COMMENT_BOX,
          comment: data,
        });
      })
      .catch(() => {
        history.push("/_500");
      });
  }, [box]);

  let commlabel = "";

  if (comment.length === 0) {
    commlabel = "комментарии отсутствуют";
  }

  if (comment.length === 1) {
    commlabel = "комментарий";
  }
  if (comment.length > 1 && comment.length < 5) {
    commlabel = "комментария";
  }
  if (comment.length >= 5) {
    commlabel = "комментариев";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <List
        style={{ width: "100%", maxWidth: 1000, padding: 10 }}
        className="comment-list"
        header={`${comment.length} ${commlabel}`}
        itemLayout="horizontal"
        dataSource={comment}
        renderItem={(item) => (
          <li>
            <Comment
              author={<p>{item.author}</p>}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
      ,
    </div>
  );
};
