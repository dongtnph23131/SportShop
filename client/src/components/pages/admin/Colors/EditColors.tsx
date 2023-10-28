import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { getColorById, getColors, updateColor } from "../../../../api/color";
import { IColor } from "../../../../interfaces/color";

const EditColors = () => {
    const [colors, setColos] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    getColorById(id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, form]);

  useEffect(() => {
    getColors()
      .then((response) => {
        setColos(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onFinish = (color: IColor) => {
    const updateColors = {
      _id: id,
      ...color,
    };
    updateColor(updateColors)
      .then(() => {
        setColos(colors?.map((item) => (item._id === id ? updateColors : item)));
        message.success("Cập nhật màu sắc thành công!", 2);
        navigate("/admin/colors");
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
        <Form.Item label="Color Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditColors;
