import React from 'react';
import { Tabs } from 'antd';
import ProductsPage from './ProductsPage/ProductsPage';

export default function ProfilePage() {

  const items = [
    {
      key: '1',
      label: `Buy / Sell`,
      children: <ProductsPage key="Buy / Sell"/>,
    },
    {
      key: '2',
      label: `Bids`,
      children: <h1 key={"Bids"}>Bids</h1>,
    },
    {
      key: '3',
      label: `General`,
      children: <h1 key={"General"}>General</h1>,
    },
  ];
  return (
    <div className='mx-4 my-2'>
      <Tabs defaultActiveKey='1' key={items.key} items={items}/>
    </div>
  );
}