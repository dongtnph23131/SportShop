
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { addCategory, getCategories } from "../../../../api/category";
import { useState } from "react";
import { ICategory } from "../../../../interfaces/categort";

const AddCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const onFinish = (category: ICategory) => {
    addCategory(category)
      .then((data) => {
        console.log(data);
        getCategories().then((response) => {
          setCategories(response.data.docs);
        });
        message.success("Thêm danh mục thành công!", 2);
        navigate("/admin/categories");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm danh mục:", error);
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
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategories;
