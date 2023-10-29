
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { IColor } from "../../../../interfaces/color";
import { addColor, getColors } from "../../../../api/color";

const AddColors = () => {
  const navigate = useNavigate();
  const [colors, setColos] = useState([]);
  const onFinish = (color: IColor) => {
    addColor(color)
      .then((data) => {
        console.log(data);
        getColors().then((response) => {
          setColos(response.data.docs);
        });
        message.success("Thêm màu sắc thành công!", 2);
        navigate("/admin/colors");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm màu sắc:", error);
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
          label="Color Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên màu sắc!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm màu sắc
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddColors;
