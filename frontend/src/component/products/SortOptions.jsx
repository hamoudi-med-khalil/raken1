import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {

  const [searchParams, setsearchParams ] =useSearchParams()
  const handleSortChange = (e)=>{
    const sortBy =e.target.value;
    searchParams.set("sortBy", sortBy)
    setsearchParams(searchParams)
  }


  return (
    <div className='flex mb-4 justify-end items-center mr-4'>
      <select 
      onChange={handleSortChange} 
      id="sort" 
      className='border rounded-md p-2 focus:outline-none '
      value={searchParams.get("sortBy" || '')}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: low to high </option>
        <option value="priceDesc">Price: high to low</option>
        <option value="popularity">Popularity </option>
      </select>
      
    </div>
  )
}

export default SortOptions