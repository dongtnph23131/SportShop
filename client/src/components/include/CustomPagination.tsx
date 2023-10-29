import React from 'react';
import { Pagination } from 'antd';

const CustomPagination = () => {
  return (
    <div>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

export default CustomPagination;
