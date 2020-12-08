import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const ContentHeader = () => {
  const user = useSelector((state) => state.user.user);

  console.log(user.role);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <NavLink
        style={{ marginRight: 10 }}
        to="/userclimat"
        activeClassName="active-link"
      >
        Главная
      </NavLink>
      <NavLink
        style={{ marginRight: 10 }}
        to="/gallery/0"
        activeClassName="active-link"
      >
        Галлерея
      </NavLink>
      <NavLink
        style={{ marginRight: 10 }}
        to="/ladder"
        activeClassName="active-link"
      >
        Cоревнования
      </NavLink>
      <NavLink
        style={{ marginRight: 10 }}
        to="/order"
        activeClassName="active-link"
      >
        Заказ GrBox
      </NavLink>
      <NavLink
        style={{ marginRight: 10 }}
        to="/message"
        activeClassName="active-link"
      >
        Сообщения
      </NavLink>
      {user.role === "ADMIN" ? (
        <>
          <NavLink
            style={{ marginRight: 10 }}
            to="/admin"
            activeClassName="active-link"
          >
            админ
          </NavLink>
          <NavLink
            style={{ marginRight: 10 }}
            to="/imagecomparison"
            activeClassName="active-link"
          >
            рейтинг
          </NavLink>
        </>
      ) : null}
    </div>
  );
};
