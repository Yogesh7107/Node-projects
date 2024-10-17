import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Modal, message, Spin } from "antd";
import axios from "axios";

const { TextArea } = Input;

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true); 
    try {
      const res = await axios.get("http://localhost:8080/");
      setData(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch products");
    } finally {
     
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  };

  const showModal = (product = null) => {
    if (product) {
      setIsEditMode(true);
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setIsEditMode(false);
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true); 
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8080/${editingProduct.id}`, values);
        message.success("Product updated successfully");
      } else {
        await axios.post("http://localhost:8080/", values);
        message.success("Product added successfully");
      }
      closeModal();
      getData();
    } catch (err) {
      console.error(err);
      message.error("Failed to submit the product");
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); 
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      message.success("Product deleted successfully");
      getData();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete the product");
    }
  };

  useEffect(() => {
    getData(); 
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => <img src={text} alt="product" width="80" height="80" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (product) => (
        <>
          <Button
            type="link"
            onClick={() => showModal(product)}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "80%", margin: "0 auto" }}>
      <h1>To-Do List</h1>
      {loading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, }}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
      <Button
        type="primary"
        danger
        onClick={() => showModal()}
        style={{ marginBottom: 20 }}
        disabled={loading} 
      >
        Add Product
      </Button>

      <Table
        className="fade-in"
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ width: "100%" }}
      />

      <Modal
        title={isEditMode ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ title: "", price: "", image: "", description: "" }}
        >
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter product title" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input placeholder="Enter product price" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter an image URL" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {isEditMode ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;
