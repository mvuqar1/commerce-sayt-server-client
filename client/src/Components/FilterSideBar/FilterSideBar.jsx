import React from 'react'
import {CloseOutlined} from "@ant-design/icons"

export default function FilterSideBar({showFilterSidebar,setShowFilterSidebar,filters,setFilters}) {


  const categories=[
    {
      name:"Electronics",
      value:"electronics"
    },
    {
      name:"Home",
      value:"home"
    },
    {
      name:"Fashion",
      value:"fashion"
    },
    {
      name:"Sports",
      value:"sport"
    },
    {
      name:"Books",
      value:"books"
    },
  ]

  const ages=[
    {
      name:"0-2 years old",
      value:"0-2"
    },
    {
      name:"3-5 years old",
      value:"3-5"
    },
    {
      name:"6-8 years old",
      value:"6-8"
    },
    {
      name:"9-12 years old",
      value:"9-12"
    },
    {
      name:"13+ years old",
      value:"12-20"
    },
  ]


  return (
    <div className='w-72 flex flex-col'>
        <div className="flex justify-between">
            <h1 className='text-orange-900 text-xl'>Filters</h1>
            <CloseOutlined className='text-xl' onClick={()=>setShowFilterSidebar(!showFilterSidebar)}/>
        </div>

        <div className='flex flex-col'>
          <h1 className='text-gray-600 m-1'>Categories</h1>
          <div className="flex flex-col gap-1">
            {categories.map((category,index)=>{
              return(
                <div key={index} className='flex items-center gap-2'>
                  <input
                  className='w-[20px]  selected'
                  type='checkbox'
                  name='category'
                  checked={filters.category.includes(category.value)}
                  onChange={(e)=>{
                    if(e.target.checked){
                      setFilters({
                        ...filters,
                        category:[...filters.category,category.value],
                      });
                    }else{
                      setFilters({
                        ...filters,
                        category:filters.category.filter(
                          (item)=>item!==category.value
                        )
                      })
                    }
                  }}
                  />
                  <label htmlFor='category' >{category.name}</label>
                </div>
              )
            })}
          </div>
          <h1 className='text-gray-600 m-1'>Ages</h1>
          <div className="flex flex-col ">
            {ages.map((age,index)=>{
              return(
                <div key={index} className='flex items-center gap-2'>
                  <input
                  className='w-[20px] selected'
                  type='checkbox'
                  name='category'
                  checked={filters.age.includes(age.value)}
                  onChange={(e)=>{
                    if(e.target.checked){
                      setFilters({
                        ...filters,
                        age:[...filters.age,age.value],
                      });
                    }else{
                      setFilters({
                        ...filters,
                        age:filters.age.filter(
                          (item)=>item!==age.value
                        )
                      })
                    }
                  }}
                  />
                  <label htmlFor='category'>{age.name}</label>
                </div>
              )
            })}
          </div>
        </div>

    </div>
  )
}
