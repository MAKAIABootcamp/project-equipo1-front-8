import React from "react";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CompanyGrid from "../../components/CompanyGrid";

const CompanyDetails = () => {
  
  return (
    <main>
    <Header/>
    <div className="p-9 m-16 bg-bg-gray">
    <h1 className="text-3xl font-oleo mb-2 flex justify-center">
            Hormiguitas
          </h1>
      <div className="flex items-center justify-center m-5">
  <div className="flex mb-5 justify-center items-center text-center">
    <img
      src="https://i.pinimg.com/550x/ab/87/5c/ab875c997ae110b72b5ccb0d21f74a2e.jpg"
      className="w-40 h-40 mr-5"
      alt="Hormiguitas"
    />
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col font-poppins text-center">
          <p>Dirección: Cra 27 calle 89-100 Barrio La esperanza</p>
          <p>Horario: 9 a 12 y de 1 a 10</p>
        </div>
        <div className="flex items-center mr-2">
        {[...Array(5)].map((_, index) => (
          <svg
            className={'w-5 h-5 text-yellow-500'}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
          </svg>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
      <p className="mb-5 font-oleo">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque nihil distinctio ad incidunt voluptate accusamus similique sequi fuga ullam eaque, quis mollitia, veniam, consequatur harum unde est aliquam inventore nobis provident necessitatibus architecto nemo aspernatur eos. Soluta explicabo dolor voluptate, tempore fugiat eos consectetur reprehenderit laborum quibusdam sed aspernatur quidem quo ipsum quae voluptatibus debitis et distinctio asperiores error id saepe excepturi pariatur. Distinctio perspiciatis dolore dolorum cumque quas nobis perferendis itaque, aut, voluptates beatae, omnis recusandae accusamus officiis porro at saepe illo officia magni id nisi nam quae! Ut officia neque quaerat, necessitatibus error deleniti nesciunt, accusamus dolorum qui quidem ipsam, hic illum. Officiis dolorem sed, inventore ex expedita nostrum repellat, itaque exercitationem error ullam alias et magnam unde eaque illo omnis aliquam deserunt perferendis placeat ipsa impedit consequatur? Nam rerum cupiditate in reiciendis impedit, odio mollitia eum illo labore quaerat voluptatibus saepe quo facere, quidem iure expedita cumque commodi sequi dolorum quae error libero tempore laudantium quas? Maxime, reprehenderit non magni impedit autem earum? Deleniti doloribus cum illo? Quis accusantium odit ut officiis possimus autem porro perferendis voluptate quae? Suscipit doloribus, debitis eius temporibus repudiandae officiis mollitia impedit soluta, dolorum cum, rerum omnis optio asperiores saepe voluptatibus eligendi.
      </p>
      <div className="flex justify-center mt-5 pt-5">
      <button className="bg-[#00A082] text-white py-1 px-6 rounded-full hover:bg-blue-600 font-oleo">
        Hacer Pedido
      </button>
      </div>
      </div>
    <div className="p-1 m-11">
      <h1 className="text-4xl font-oleo mb-5 flex justify-center">Más aliados</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-32 p-0 m-4">
        <div className="bg-bg-gray shadow-lg flex items-center transform transition-transform duration-300 hover:scale-105">
          <img src="https://www.shutterstock.com/image-vector/home-delivery-man-motorcycle-icon-260nw-1431768602.jpg" alt="compañia1" className="w-36 h-36 object-cover ml-2 p-1" />
          <div className="p-4">
            <h2 className="text-lg font-poppins">Hormiguitas</h2>
            <p className="text-black mt-2 font-poppins">8:00 am a 10:00 pm</p>
            <div className="flex items-center mt-1">
                <svg
                  className='w-5 h-5 text-yellow-500'
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
                </svg>
            </div>
            <button className="mt-4 bg-[#00A082] text-white px-16 py-1.5 rounded-3xl hover:bg-blue-600 font-oleo">
              Seleccionar
            </button>
          </div>
        </div>
    </div>
    </div>
    <Footer/>
    </main>
  );
};

export default CompanyDetails;


