import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";

export const Top = ({ id }) => {
  const { top } = useSelector((state) => state.ladder);

  const data = top.map((val, index) => {
    return {
      key: index,
      name: val.username,
      box: val.box_name,
      plant: val.plant_name,
      rang: val.last_rang,
    };
  });

  const columns = [
    {
      title: "Участник",
      dataIndex: "name",
      render: (name, index) => {
        return  name ;
      },
    },
    {
      title: "Коробка",
      dataIndex: "box",
      render: (name, index) => {
        return (
          <Link to={"/userboxladder/" + id + "/" + top[index.key].box_id}>
            {name}
          </Link>
        );
      },
    },
    {
      title: "Растение",
      dataIndex: "plant",
      key: "age",
    },
    {
      title: "Рейтинг",
      dataIndex: "rang",
      key: "address",
    },
  ];

  if (top.length === 0) {
    return <h3 style={{ textAlign: "center" }}>Участники не найдены</h3>;
  }
  return <Table dataSource={data} columns={columns} />;
};

/**
 * box_id: 41
box_name: "Коробка мечты"
last_rang: 27.43
plant_name: "Укроп"
username: "dsfddsds"
 */
