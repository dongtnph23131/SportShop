import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../../../api/category";
import { ICategory } from "../../../../interfaces/categort";

const EditCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    getCategoryById(id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, form]);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onFinish = (category: ICategory) => {
    const updatedCategory = {
      _id: id,
      ...category,
    };
    updateCategory(updatedCategory)
      .then(() => {
        setCategories(categories?.map((item) => (item._id === id ? updatedCategory : item)));
        message.success("Cập nhật danh mục thành công!", 2);
        navigate("/admin/categories");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600, margin: "auto", paddingTop: "150px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="Category Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategories;
