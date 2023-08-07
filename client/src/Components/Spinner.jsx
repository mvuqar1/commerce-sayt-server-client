import React from 'react'

export default function Spinner() {
  return (
    <div className='fixed bg-black z-[9999] flex items-center justify-center inset-0 opacity-50'>
        <div className='w-10 h-10 border-4 border-solid border-t-transparent border-white rounded-full animate-spin'>
        </div>
    </div>
  )
}
