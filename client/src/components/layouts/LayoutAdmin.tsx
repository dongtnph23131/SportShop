import React, { useState } from 'react';

import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineHome,
  AiTwotoneTag,
  AiOutlineShoppingCart,
  AiOutlineShop,
  AiTwotoneContacts,
  AiFillTags
} from 'react-icons/ai';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider } = Layout;
const { SubMenu } = Menu; // Import SubMenu from antd

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{height : "100vh", overflow: "hidden"}}>
      <Sider className='' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<AiOutlineHome />}>
            <Link to='/admin/dashboard'>DashBoard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AiTwotoneTag />} title="Product">
            <Menu.Item key="2">
              <Link to='/admin/products'>Product List</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/admin/products/add'>Add Product</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub2" icon={<AiTwotoneContacts />} title="Categories">
            <Menu.Item key="4">
              <Link to='/admin/categories'>All Categories</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to='/admin/categories/add'>Add Category</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub3" icon={<AiTwotoneContacts />} title="Sizes">
            <Menu.Item key="6">
              <Link to='/admin/sizes'>All Sizes</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to='/admin/sizes/add'>Add Size</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub4" icon={<AiTwotoneContacts />} title="Colors">
            <Menu.Item key="8">
              <Link to='/admin/colors'>All Colors</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to='/admin/colors/add'>Add Color</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub5" icon={<AiOutlineShoppingCart />} title="Order">
            <Menu.Item key="10">
              <Link to='/admin/orders'>All order</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to='/admin/categoties/add'>Add Category</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <SubMenu key="sub6" icon={<AiOutlineShop />} title="Inventory">
            <Menu.Item key="12">
              <Link to=''>warehouse</Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to=''> Inventory</Link>
            </Menu.Item>
            {/* Add more sub-menu items as needed */}
          </SubMenu>
          <Menu.Item key="14" icon={<AiFillTags />}>
            <Link to=''>Discount</Link>
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
         <Outlet/> 
      </Layout>
    </Layout>
  );
};

export default MainLayout;
