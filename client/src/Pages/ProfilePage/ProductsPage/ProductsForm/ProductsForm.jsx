import { Modal, Tabs } from 'antd'
import React, { useRef} from 'react'
import GeneralTab from './GeneralTab/GeneralTab'
import ImagesTab from './ImagesTab/ImagesTab'

export default function ProductsForm({ modalOpen, setModalOpen,selectProduct,setSelectedProduct,handleProductAddedOrUpdated }) {



    const formRef = useRef()


    const items = [
      {
        key: '1',
        label: `General`,
        children: <GeneralTab
          formRef={formRef}
          setModalOpen={setModalOpen}
          selectProduct={selectProduct}
          setSelectedProduct={setSelectedProduct}
          handleProductAddedOrUpdated={handleProductAddedOrUpdated} />,
      },
        {
          key: '2',
          label: `Images`,
          children:<ImagesTab/>,
        },
      ];
    return (
        <>
            <Modal
                title=""
                width={1000}
                centered
                open={modalOpen}
                onCancel={() => {setModalOpen(false);setSelectedProduct(null)}}
                onOk={() => (formRef.current.submit() )}
            >
              <div className='text-primary text-xl text-center font-semibold'>
                {selectProduct ?"Edit Product" : "Add Product"}
              </div>
                <Tabs defaultActiveKey='1' items={items}/>
            </Modal>
        </>
    )
}
