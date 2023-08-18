import React from 'react'
import { Tabs } from 'antd';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';
import UsersPage from './UsersPage/UsersPage';

export default function AdminPage() {
    const items = [
        {
          key: '1',
          label: `ProductsAdmin`,
          children: <ProductsAdmin key="ProductsAdmin"/>,
        },
        {
          key: '2',
          label: `Users`,
          children: <UsersPage key={"UsersPage"}/>,
        },
      ];
      return (
        <div className='mx-4 my-2'>
          <Tabs defaultActiveKey='1' items={items}/>
        </div>
      );
}
