import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import "../resources/items.css";

const Bills = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibility] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
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
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "Total fare",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered pagination={false} />
      {printBillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibility(false);
          }}
          visible={printBillModalVisibility}
          title={"Bill Details"}
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>XY MARKET</b>
                </h1>
              </div>
              <div>
                <p>New Delhi</p>
                <p>Jamia Nagar 10001</p>
                <p>9988776655</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <p>
                <b>Name</b> : {selectedBill.customerName}
              </p>
              <p>
                <b>Phone Number</b> : {selectedBill.customerPhoneNumber}
              </p>
              <p>
                <b>Date</b> :{" "}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table
              dataSource={selectedBill.cartItems}
              columns={cartcolumns}
              pagination={false}
            />

            <div className="dotted-border">
              <p>
                <b>SUB TOTAL</b> : {selectedBill.subTotal}
              </p>
              <p>
                <b>Tax</b> : {selectedBill.tax}
              </p>
            </div>

            <div>
              <h2>
                <b>GRAND TOTAL : {selectedBill.totalAmount}</b>
              </h2>
            </div>
            <div className="dotted-border"></div>

            <div className="text-center">
              <p>Thanks</p>
              <p>Visit Again :)</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={handlePrint}>
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Bills;
