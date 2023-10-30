import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Card,
  Space,
  Typography,
  message
} from "antd";
import { CloseOutlined } from '@ant-design/icons';
import axios from "axios";
import { getColors } from "../../../../api/color";
import { getSizes } from "../../../../api/size";
import { useAddProductMutation } from "../../../../api/product";
import { getCategories } from "../../../../api/category";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;
const ProductAdd = () => {
  const navigate:any=useNavigate()
  const [categories, setCategories] = useState<any>()
  const [form] = Form.useForm();
  const [images, setImages] = useState<any>([])
  const [colors, setColors] = useState<any>([])
  const [sizes, setSizes] = useState<any>([])
  const [photoDescription, setPhotoDescription] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [addProduct, { isLoading }] = useAddProductMutation()
  const [categoryId, setCategoryId] = useState<any>()
  const onFinish = async (data: any) => {
    const { items } = form.getFieldsValue()
    let dataItems: any = []
    items.map((item1: any,index1:any) => {
      const dataVariantItem = item1.list.map((item2: any) => {        
        dataItems.push({ ...item2, colorId: item1.colorId, img: images[index1] })
      })
    })
    console.log({ ...data, items: dataItems, description, photoDescription, categoryId });

    const response: any = await addProduct({ ...data, items: dataItems, description, photoDescription, categoryId })
    if (response.data.product) {
      message.success('Thêm sản phẩm thành công');
      setTimeout(() => {
        navigate("/admin/products")
      }, 1000)
    }
    else {
      message.error(response.product.message);
  }
  }
  const onChangeImgDes = async (event: any) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    setPhotoDescription(apiResponse.data.data.url)
  }
  const onchangeImg = async (event: any, stt: any) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    if (images[stt]) {
      setImages(images.map((item: any, index: any) => {
        return index === stt ? apiResponse.data.data.url : item
      }))
    }
    else {
      setImages([...images, apiResponse.data.data.url])
    }
  }
  const onChangeCategory = (value: any) => {
    setCategoryId(value)
  }
  useEffect(() => {
    getColors()
      .then((response) => {
        setColors(response.data);

      })
    getSizes()
      .then((response) => {
        setSizes(response.data);

      })
    getCategories().then((response) => {
      setCategories(response.data.map((item: any) => {
        return { label: item.name, value: item._id }
      }));

    })
  }, [])
  return (
    <div style={{ overflow: "auto" }}>
      <h2
        style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Thêm sản phẩm
      </h2>

      <Form name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        Mô tả sản phẩm <TextArea onChange={(e) => setDescription(e.target.value)} />
        <br />
        Ảnh mô tả sản phẩm <input onChange={onChangeImgDes} type="file" />
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          name="dynamic_form_complex"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields.map((field, index) => (
                  <Card
                    size="small"
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item label="Name" name={[field.name, 'colorId']}>
                      <Select placeholder="Select province">
                        {colors.map((item: any) => {
                          return <Option value={`${item._id}`}>{item.name}</Option>
                        })}

                      </Select>
                    </Form.Item>
                    <input onChange={(e) => onchangeImg(e, index)} accept=".png, .jpg" type="file" multiple />
                    <Form.Item>
                      <Form.List name={[field.name, 'list']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item label="Size" name={[subField.name, 'sizeId']}>
                                  <Select placeholder="Select province">
                                    {sizes.map((item: any) => {
                                      return <Option value={`${item._id}`}>{item.name}</Option>
                                    })}
                                  </Select>
                                </Form.Item>

                                <Form.Item noStyle name={[subField.name, 'quantity']}>
                                  <Input placeholder="Quantity" />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              Add item
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  Add color
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
        Danh mục <Select onChange={onChangeCategory} placeholder="Select category">
          {categories?.map((item: any) => {
            return <Option value={`${item.value}`}>{item.label}</Option>
          })}

        </Select>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default ProductAdd;
