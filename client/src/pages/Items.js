import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((res) => {
        dispatch({ type: "hideLoading" });
        setItemsData(res.data);
      })
      .catch((err) => {
        dispatch({ type: "hideLoading" });
        console.log(err);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item",{itemId:record._id})
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success('Item deleted Successfully')
        getAllItems()
      })
      .catch((err) => {
        dispatch({ type: "hideLoading" });
        message.error('Something went wrong')
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibility(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=>deleteItem(record)}/>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = (values) => {


    dispatch({ type: "showLoading" });
    if(editingItem===null)
    {
      axios
      .post("/api/items/add-item", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("item added successfully");
        setAddEditModalVisibility(false);
        getAllItems();
      })
      .catch((err) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
      });
    }
    else axios
    .post("/api/items/edit-item", {...values,itemId:editingItem._id})
    .then((res) => {
      dispatch({ type: "hideLoading" });
      message.success("Item edited successfully");
      setEditingItem(null)
      setAddEditModalVisibility(false);
      getAllItems();
    })
    .catch((err) => {
      dispatch({ type: "hideLoading" });
      message.error("Something went wrong");
    });
    {

    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibility(true)}>
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />
      {addEditModalVisibility && (
        <Modal
        onCancel={()=>{
          setEditingItem(null)
          setAddEditModalVisibility(false)
        }}
          visible={addEditModalVisibility}
         
          title={`${editingItem!==null ? 'Edit Item' : 'Add New Item'}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Items;
