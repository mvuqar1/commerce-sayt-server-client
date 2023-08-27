import { Modal, Tabs } from 'antd'
import React, { useRef, useState } from 'react'
import GeneralTab from '../EditGeneralTab/EditGeneralTab'
import ImagesTab from '../EditImagesTab/EditImagesTab'

export default function EditProductsForm({ modalOpen, setModalOpen, selectProduct, setSelectedProduct, handleProductAddedOrUpdated }) {

  const [selectedTab,SetSelectedTab]=useState("1")

  const formRef = useRef()

  const items = [
    {
      key: '1',
      label: `General`,
      children: <GeneralTab
      key={"General"}
        formRef={formRef}
        setModalOpen={setModalOpen}
        selectProduct={selectProduct}
        setSelectedProduct={setSelectedProduct}
        handleProductAddedOrUpdated={handleProductAddedOrUpdated} />,
    },
    {
      key: '2',
      label: `Images`,
      children: <ImagesTab 
      key={"Images"}
      handleProductAddedOrUpdated={handleProductAddedOrUpdated} 
      setModalOpen={setModalOpen}
      selectProduct={selectProduct} 
      />,
      disabled: !selectProduct,
    },
  ];

  return (
    <>
      <Modal
        title=""
        width={1000}
        centered
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setSelectedProduct(null) }}
        {...(selectedTab ==="2" && {footer:false})}
        onOk={() => (formRef.current.submit())}
      >
        <div className='text-primary text-xl text-center font-semibold'>
          {selectProduct ? "Edit Product" : "Add Product"}
        </div>
        <Tabs defaultActiveKey='1'
          activeKey={selectedTab}
          key={items.key}
          onChange={(key)=>SetSelectedTab(key)}

          items={items} />
      </Modal>
    </>
  )
}
