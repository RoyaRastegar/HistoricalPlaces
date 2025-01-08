import { RootState } from '@reduxjs/toolkit/query';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IPlace } from '../utils/types/places';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { Button, Card, Flowbite, Tooltip } from 'flowbite-react';
import { toggleVisited } from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { AppDispatch } from '../lib/redux/store';
import { FaArrowLeft } from 'react-icons/fa6';
const PlaceDetail = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { places } = useSelector((state: RootState) => state.historicalPlaces);

  if (!id) {
    return <p>ID is missing</p>;
  }
  const selectedPlace = places.find((item: IPlace) => item.id === +id);
  if (!selectedPlace) {
    return <p>selectedPlace not found!</p>;
  }

  const visitedHandel = (id: number) => {
    dispatch(toggleVisited(id));
  };
  const customTheme = {
    card: {
      img: {
        base: ' w-full h-[30rem] lg:h-72 object-fill',
      },
      root: {
        base: 'flex',
        children:
          'flex gap-8 overflow-auto pt-8 justify-start h-[20rem] lg:h-[10rem] text-center flex-col lg:justify-center lg:gap-2 lg:px-4 py-3 ',
      },
    },
  };

  return (
    <>
      <Button
        type='button'
        onClick={() => navigate(-1)}
        className='flex absolute lg:left-80 h-10 w-10 items-center justify-center rounded-full focus:ring-0'
      >
        <FaArrowLeft
          className='h-7 w-7 lg:h-5 lg:w-5 text-current text-black hover:w-7 hover:h-7 hover:shadow-inner hover:shadow-red-300 rounded-full '
          style={{
            fill: 'currentColor',
          }}
        />
      </Button>
      <div className='  h-screen lg:rounded-lg lg:border lg:border-gray-200 bg-white lg:shadow-md lg:w-[60%] lg:mx-auto lg:mt-20 lg:h-[80%]  '>
        <div className='  lg:w-[25rem]lg:h-[35rem] '>
          <Flowbite key={selectedPlace.id} theme={{ theme: customTheme }}>
            <Card
              imgAlt='Meaningful alt text for an image that is not purely decorative'
              imgSrc={selectedPlace.image}
              className=' flex  flex-col items-center '
            >
              <h5 className=' text-3xl lg:text-sm   font-extrabold tracking-tight text-text'>
                {selectedPlace.name}
              </h5>
              <p className='font-bold pl-2 text-start text-xl lg:text-sm lg:font-normal  lg:line-clamp-3 lg:text-center'>
                {selectedPlace.description}
              </p>
            </Card>
          </Flowbite>
        </div>
        <div className='pl-6 mt-5 '>
          <Tooltip
            className='w-fit'
            content={selectedPlace.visited ? 'Visited' : 'unvisited'}
          >
            <button
              className='lg:w-8 lg:h-8'
              onClick={() => visitedHandel(selectedPlace.id)}
            >
              {selectedPlace.visited ? (
                <MdOutlineVisibility className='text-3xl lg:text-lg text-emerald-500 ' />
              ) : (
                <MdOutlineVisibilityOff className='text-3xl lg:text-lg ' />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default PlaceDetail;
