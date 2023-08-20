import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { GetProducts } from '../../Api/productsApi'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([])
  const [filter, setfilter] = useState([])

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const getData = async () => {
    try {
        dispatch(SetLoader(true))
        const response = await GetProducts()
        if (response.success) {
          setProducts(response.data)
          console.log(products)
        }
    } catch (error) {
        console.log(error)
    }
    finally{
        dispatch(SetLoader(false))
    }
}

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <div>
      <div className='grid grid-cols-5 gap2'>
        {products?.map((product) => (
          <div 
          className='border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2' 
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
            src={product.image}
            className='w-full h-40 object-cover'
            alt='first foto'
            />
            <div className='px-2 flex flex-col gap-1'>
              <h1 className='text-lg font-semibold'>{product.name}</h1>
              <h1 className='text-sm'>{product.description}</h1>

            </div>
            
          </div>
        ))}
      </div>
      </div>
  )
}
