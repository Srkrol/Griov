import React from "react";
import "./gallery.less";

import { ButtonLoad } from "./load";
import { Img } from "./img";
import { ImageSceleton } from "./imageSceleton";

export const ImageG = ({
  image,
  isLoading,
  setImg,
  id,
  count,
  setCount,
  status,
  setStatus,
}) => {
  console.log(isLoading);
  return (
    <div className="gallery_image_conteiner">
      <div className="conteiner_image">
        <p style={{ padding: 10, fontSize: 18, color: "#595959", margin: 0 }}>
          Фотографии
        </p>

        <section className="img" style={{ position: "relative" }}>
          {isLoading === null ? <ImageSceleton /> : null}
          {image.length === 0 && isLoading !== null ? (
            <div
              style={{
                width: "100%",
                height: 50,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 20 }}>Изображенния отсутствуют</p>
            </div>
          ) : null}
          {image.map((val, index) => {
            return <Img key={index} val={val.photo} />;
          })}
        </section>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {status && count ? (
            <ButtonLoad
              image={image}
              setImg={setImg}
              id={id}
              count={count}
              setCount={setCount}
              setStatus={setStatus}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
