import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import "../resources/items.css";

const Customers = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((res) => {
        dispatch({ type: "hideLoading" });
        const data = res.data;
        data.reverse();
        setBillsData(data);
      })
      .catch((err) => {
        dispatch({ type: "hideLoading" });
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value)=><span>{value.toString().substring(0,10)}</span>
    },
  
 
  ];

  useEffect(() => {
    getAllBills();
  }, []);

 

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
     
    </DefaultLayout>
  );
};

export default Customers;
