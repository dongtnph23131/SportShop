import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteColor, getColors } from "../../../../api/color";
import { IColor } from "../../../../interfaces/color";


const AllColors = () => {
  const [colors, setColors] = useState<IColor[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const removeColor = (key: string | number) => {
    deleteColor(key)
      .then(() => {
        message.success("Xóa màu sắc thành công!", 2);
        return getColors(); // Lấy dữ liệu mới sau khi xóa
      })
      .then((response) => {
        setColors(response.data);
        setData(response.data.map((item) => ({ key: item._id, name: item.name })));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getColors()
      .then((response) => {
        setColors(response.data);
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
      title: "Color Name",
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
            <Link to={`/admin/colors/${record.key}/edit`}>Update</Link>
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            type="primary"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                removeColor(record.key);
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

export default AllColors;
