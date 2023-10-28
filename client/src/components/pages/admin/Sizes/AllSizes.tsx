import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteSize, getSizes } from "../../../../api/size";
import { ISize } from "../../../../interfaces/size";


const AllSizes = () => {
  const [sizes, setsizes] = useState<ISize[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const removeSize = (key: string | number) => {
    deleteSize(key)
      .then(() => {
        message.success("Xóa size thành công!", 2);
        return getSizes(); // Lấy dữ liệu mới sau khi xóa
      })
      .then((response) => {
        setsizes(response.data);
        setData(response.data.map((item) => ({ key: item._id, name: item.name })));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getSizes()
      .then((response) => {
        setsizes(response.data);
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
      title: "Size Name",
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
            <Link to={`/admin/sizes/${record.key}/edit`}>Update</Link>
          </Button>
          <Button
            style={{ backgroundSize: "red" }}
            type="primary"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                removeSize(record.key);
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

export default AllSizes;
