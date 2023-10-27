import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { getSizeById, getSizes, updateSize } from "../../../../api/size";
import { ISize } from "../../../../interfaces/size";


const EditSizes = () => {
    const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    getSizeById(id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, form]);

  useEffect(() => {
    getSizes()
      .then((response) => {
        setSizes(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onFinish = (size: ISize) => {
    const updateSizes = {
      _id: id,
      ...size,
    };
    updateSize(updateSizes)
      .then(() => {
        setSizes(sizes?.map((item) => (item._id === id ? updateSizes : item)));
        message.success("Cập nhật kích thước thành công!", 2);
        navigate("/admin/sizes");
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
        <Form.Item label="Size Name" name="name">
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

export default EditSizes;
