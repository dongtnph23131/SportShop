import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteCategories, getCategories } from "../../../../api/category";
import { ICategory } from "../../../../interfaces/categort";

const AllCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const removeCategory = (key: string | number) => {
    deleteCategories(key)
      .then(() => {
        message.success("Xóa danh mục thành công!", 2);
        return getCategories(); // Lấy dữ liệu mới sau khi xóa
      })
      .then((response) => {
        setCategories(response.data);
        setData(response.data.map((item) => ({ key: item._id, name: item.name })));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
        setData(response.data.map((item) => ({ key: item._id, name: item.name })));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  interface DataType {
    key: string;
    name: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/admin/categories/${record.key}/edit`}>Update</Link>
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            type="primary"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                removeCategory(record.key);
              }
            }}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );
};

export default AllCategories;
