import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../Redux/LoaderSlice'
import { GetProducts } from '../../Api/productsApi'
import { useNavigate } from 'react-router-dom';
import { Divider, Input } from 'antd';
import FilterSideBar from '../../Components/FilterSideBar/FilterSideBar';
import {AlignLeftOutlined } from "@ant-design/icons"


export default function Home() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState(
    {
      status: "approved",
      category: [],
      age: [],
      searchQuery:""
    }
  )
  const [showFilterSidebar, setShowFilterSidebar] = useState(true)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const getData = async () => {
    try {
        dispatch(SetLoader(true))
        const response = await GetProducts(filters)
        if (response.success) {
          setProducts(response.data)
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
  useEffect(() => {
    getData(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filters])


  return (
    <div className='flex gap-5'>
      {showFilterSidebar &&
      <FilterSideBar 
      showFilterSidebar={showFilterSidebar}
      setShowFilterSidebar={setShowFilterSidebar}
      filters={filters}
      setFilters={setFilters}
      />
      }
      <div className='flex flex-col w-full gap-5'>
        <div className='flex gap-5 items-center '>
          {!showFilterSidebar && <AlignLeftOutlined onClick={() => setShowFilterSidebar(!showFilterSidebar)} />}
          <Input
            type='text'
            placeholder='Search product heare ...'
            className='border border-gray-300 rounded border-solid w-full p-2 h-14'
            name="searchQuery"
            value={filters.searchQuery}
            onChange={(e) => setFilters({
              ...filters,
              searchQuery: e.target.value
            })
            }
          />
        </div>

      <div className={`grid gap-5 ${showFilterSidebar?"grid-cols-4":"grid-cols-5"}  gap-2`}>
        {products?.map((product) => (
          <div 
          className='border border-gray-300 rounded border-solid flex flex-col pb-2 cursor-pointer' 
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
            src={product.images[0]}
            className='w-full h-40 object-cover'
            alt='first foto'
            />
            <div className='px-2 flex flex-col justify-between '>
              <h1 className='text-base font-semibold'>{product.name}</h1>
              <h1 className='text-sm my-0 max-h-[18px] overflow-hidden'>{product.description}</h1>
              <Divider className='my-1'/>
              <span className='text-lg font-semibold text-green-700'>
                {product.price} AZN
              </span>

            </div>
            
          </div>
        ))}
      </div>
      </div>
      </div>
  )
}
