import React, { useState } from "react";

import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineHome,
  AiTwotoneTag,
  AiOutlineShoppingCart,
  AiOutlineShop,
  AiTwotoneContacts,
  AiFillTags,
  AiFillFolder,
  AiFillFolderAdd,
  AiOutlineBgColors,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineComment,
  AiFillSetting,
  AiOutlineLogout
  
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import HeaderAdmin from "./header/HeaderAdmin";

const { Header, Sider } = Layout;
const { SubMenu } = Menu; // Import SubMenu from antd

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
<div>
<HeaderAdmin/>
    <Layout style={{ height: "100vh", overflow: "hidden", width: "100%" }}>
      <Sider className="" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<AiOutlineHome />}>
            <Link to="/admin/dashboard">DashBoard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AiTwotoneTag />} title="Product">
            <Menu.Item key="2">
              <Link to="/admin/products">Product List</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AiOutlinePlus />}>
              <Link to="/admin/products/add" >Add Product</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub2" icon={<AiFillFolder />} title="Categories">
            <Menu.Item icon={<AiFillFolder />} key="4">
              <Link to="/admin/categories">All Categories</Link>
            </Menu.Item>
            <Menu.Item icon={<AiFillFolderAdd />} key="5">
              <Link to="/admin/categories/add">Add Category</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub5" icon={<AiOutlineShoppingCart />} title="Order">
            <Menu.Item key="10">
              <Link to="/admin/orders">All order</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/admin/categoties/add">Add Category</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<AiOutlineShop />} title="Inventory">
            <Menu.Item key="12">
              <Link to="">warehouse</Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to=""> Inventory</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="14" icon={<AiFillTags />}>
            <Link to="">Discount</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<AiOutlineUser />}>
            <Link to="">Account</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<AiOutlineComment />}>
            <Link to="">Comment</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<AiFillSetting />}>
            <Link to="">Settings</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<AiOutlineLogout />}>
            <Link to="">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Outlet />
      </Layout>
    </Layout>
</div>
  );
};

export default MainLayout;
