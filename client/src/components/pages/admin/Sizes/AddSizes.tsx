
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { ISize } from "../../../../interfaces/size";
import { addSize, getSizes } from "../../../../api/size";

const AddSizes = () => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);

  const onFinish = (size: ISize) => {
    addSize(size)
      .then((data) => {
        console.log(data);
        getSizes().then((response) => {
          setSizes(response.data.docs);
        });
        message.success("Thêm kích thước thành công!", 2);
        navigate("/admin/sizes");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm kích thước:", error);
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
          label="Size Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
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

export default AddSizes;
