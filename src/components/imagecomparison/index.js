import React from "react";
import "./style.less";
import { Link } from "react-router-dom";

export const BoxImg = ({ box }) => {
  return (
    <div className="image_comprasion_box_conteiner">
      <div className="image_comprasion_box_content">
        {box.map((val, index) => {
          return (
            <Link
              to={`/imagecomparison/${val.box_id}/${val.box_name}/${val.plant_name}/${val.username}`}
              key={index}
              className="image_comprasion_box_box"
            >
              <div>
                <p>
                  <b>GrBox: </b>
                  {val.box_id}
                </p>
              </div>
              <div>
                <p>
                  <b>Имя коробки: </b> {val.box_name}
                </p>
              </div>
              <div>
                <p>
                  <b>Рейтинг: </b>
                  {val.last_rang}
                </p>
              </div>
              <div>
                <p>
                  <b>Растение: </b>
                  {val.plant_name}
                </p>
              </div>
              <div>
                <p>
                  <b>Принадлежит: </b>
                  {val.username}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/**
 * box_id: 43
box_name: "Mashechka"
last_rang: 7.7
plant_name: "Руккола Гурман"
username: "mariya_novoselova@bk.ru"
 */
