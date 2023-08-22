import { Button, Upload, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { DeleteOutlined} from "@ant-design/icons"
import { SetLoader } from '../../Redux/LoaderSlice';
import { DeleteImage, UploadImage } from '../../Api/productsApi';


export default function EditImagesTab({ setModalOpen, selectProduct, handleProductAddedOrUpdated }) {
  const [showPreview,SetShowPreview]=useState(true)
  const [images, SetImages] = useState(selectProduct?.images || []);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch()

  const upload = async () => {
    try {
      dispatch(SetLoader(true))
      
      const formData = new FormData();
      formData.append("productId", selectProduct._id);
      formData.append("file", file.originFileObj);
  
      const response = await UploadImage(formData)
      dispatch(SetLoader(false))
      
      if (response.success) {
        message.success(response.message)
        SetImages([...images,response.data])
        setFile(null)
        SetShowPreview(false)

        handleProductAddedOrUpdated()
      }
      else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message)
    }
  }

  const deleteImage = (event,image) => {
    event.stopPropagation();
    const updatedImages = images.filter(img => img !== image);
    SetImages(updatedImages);
    DeleteImage(selectProduct._id,updatedImages)
  };

  return (
    <>
      <Upload
        listType='picture'
        onChange={(info) => {
          setFile(info.file)
          SetShowPreview(true)
        }}
        showUploadList={showPreview}
        // fileList={file ? [file] : []}
        // onRemove={() => setFile(null)}
      >
        <div className='flex gap-2 pb-2'>
          {Array.isArray(images) && images.map((image) => {
            return <div className='flex flex-col  gap-2 border-solid border-gray-300 rounded p-2 items-center' >
              <img className='h-20 w-20 object-cover ' src={image} alt="img" />

              <div className='flex gap-12'>
              <DeleteOutlined key={image}  onClick={(event) => deleteImage(event,image)} />
              </div>
            </div>
          })}
        </div>
        <Button >Upload</Button>
      </Upload>



      <div className='flex gap-2 mt-5 justify-end'>
        <Button
          type='default'
          onClick={() => { setModalOpen(false) }}
        >
          Cancel
        </Button>

        <Button
          disabled={!file}
          type='primary'
          onClick={upload}
        >
          Upload
        </Button>
      </div >
    </>
  )
}
