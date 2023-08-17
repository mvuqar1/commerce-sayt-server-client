import React from 'react'
import { Tabs } from 'antd';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';

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
          children: <h1 key={"users"}>Users</h1>,
        },
      ];
      return (
        <div className='mx-4 my-2'>
          <Tabs defaultActiveKey='1' items={items}/>
        </div>
      );
}
