import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CompanyGrid from '../../components/CompanyGrid';

const Search = () => {

  return (
    <main>
    <Header/>
    <div className='w-full flex items-center justify-center'>
    <img className="w-4/5 h-auto object-contain" src="/public/images/delivery.png" alt="OrderImage" />
  </div>
    <h1 className='text-4xl text-[#00A082] py-4 font-oleo text-center p-0'>Nuestros aliados</h1>
    <SearchBar/>
    <div className="container mx-auto p-4">
      {/* <SearchBar onSearch={handleSearch} /> */}
      <ul className="list-disc pl-5">
        {/* {filteredItems.map((item, index) => (
          <li key={index} className="py-2">{item}</li>
        ))} */}
      </ul>
    </div>
    <CompanyGrid></CompanyGrid>
    <Footer/>
    </main>
  );
};

export default Search;