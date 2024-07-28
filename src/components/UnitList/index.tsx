import { SearchOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";

export interface UnitListProps {
  list: Array<any>;
}
const UnitList: React.FC<UnitListProps> = ({ list }) => {
  const columns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (field, record, index) => {
        let text = "";
        if (field) {
          for (const [key, value] of Object.entries(field)) {
            text = text.concat(`${key}: ${value} `);
          }
        }
        return <div>{text}</div>;
      },
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record) => {
        return (
          <Link to={`/units/${record.id}`} key={"link" + record.id}>
            {" "}
            <Button
              key={"button" + record.id}
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </Link>
        );
      },
    },
  ];
  return <Table dataSource={list} columns={columns} rowKey={(record) => record.id}/>;
};

export default UnitList;
