import React from 'react'

const Search = ({ searchName, handleSearchNameChange }) => {
  return (
    <div>
      Search:
      <input value={searchName} onChange={handleSearchNameChange} placeholder="name" />
    </div>
  )
}

export default Search
