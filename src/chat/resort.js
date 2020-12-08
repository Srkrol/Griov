import { Base64 } from "js-base64";

export const resort = (arr, userid) => {
  let result = [];
  let idfrom = "";
  let len = 0;

  arr.forEach((val) => {
    result.push({
      author: val.id === userid ? "me" : "to",
      type: "text",
      data: {
        text: `${val.username}: ${val.comment}`,
      },
    });
    if (val.id !== userid) {
      idfrom = val.id;
      len = len + 1;
    }
  });

  result.reverse();
  console.log(idfrom);
  return { result, idfrom, len };
};
