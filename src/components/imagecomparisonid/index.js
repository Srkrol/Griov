import React from "react";
import { Image } from "antd";
import { Box } from "./box";
import "./style.less";

export const BoxImgs = ({ imgs }) => {
  const imgnull = !!imgs.imgnull ? imgs.imgnull : [];
  const imgone = !!imgs.imgone ? imgs.imgone : [];

  return (
    <>
      <div className="image_comprasion_box_id_conteiner">
        <h4>Последняя фотография</h4>
        <Box
          boximglast={imgnull.length === 0 ? null : imgnull[0]}
          className="image_comprasion_box_id_content"
        />
      </div>
      <div className="image_comprasion_box_id_conteiner">
        <h4>Последнии фотографии коробки</h4>
        <div className="image_comprasion_box_id_content">
          {imgnull.map((val, index) => {
            return (
              <div className="image_comprasion_box_id_box">
                <Image key={index} width={"100%"} src={val.photo} />
                <div>
                  <div>GrBox: {val.box_id}</div>
                  <div>Id: {val.id}</div>
                  <div>Ранг: {val.rang}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="image_comprasion_box_id_conteiner">
        <h4>Последние фотографии с рейтингом</h4>
        <div className="image_comprasion_box_id_content">
          {imgone.map((val, index) => {
            return (
              <div className="image_comprasion_box_id_box">
                <Image key={index} width={"100%"} src={val.photo} />
                <div>
                  <div>GrBox: {val.box_id}</div>
                  <div>Id: {val.id}</div>
                  <div>Ранг: {val.rang}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

/**
 * box_id: 43
cam_id: 0
date: "2020-12-07T21:00:00.000Z"
id: 1426
photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
photo_id: -1
rang: 7.7
time: "14:00:04"
type: 0
 */
