import React, { useEffect, useState } from 'react';
import {
  fetchHistoricalPlaces,
  toggleVisited,
} from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { AppDispatch, RootState } from '../lib/redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Flowbite, Pagination, Tooltip } from 'flowbite-react';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { MdOutlineVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AllPlaces = () => {
  // #regionconst
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { places } = useSelector((state: RootState) => state.historicalPlaces);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const totalPage = Math.ceil(places.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const currentItems = places.slice(startIndex, startIndex + 6);
  const customTheme = {
    card: {
      img: {
        base: ' w-full h-72 object-cover',
      },
      root: {
        base: 'flex',
        children:
          'flex lg:h-[10rem]  flex-col justify-center gap-2 px-4 py-3 text-center ',
      },
    },
  };
  const customThemePag = {
    pagination: {
      pages: {
        base: '  inline-flex items-center  mr-3',
        showIcon: 'inline-flex',
        previous: {
          base: '   rounded-full  bg-white  py-2 px-2 text-text  enabled:hover:bg-green-400 enabled:hover:text-white ',
          icon: '  h-5 w-5 enabled:hover:text-background ',
        },
        next: {
          base: ' mr-3  rounded-full  bg-white  py-2 px-2 text-text  enabled:hover:bg-green-400  enabled:hover:text-white ',
          icon: ' h-5 w-5 enabled:hover:text-background ',
        },
        selector: {
          base: 'w-8 mr-3 rounded-full bg-white ont-semibold text-base  py-2 px-3 leading-4 text-text enabled:hover:text-white enabled:hover:bg-green-400 ',
          active:
            'bg-green-400 text-white enabled:focus:bg-green-400 enabled:focus:text-white  ',
        },
      },
    },
  };
  // #endregionconst

  // #regionhooks
  useEffect(() => {
    dispatch(fetchHistoricalPlaces());
  }, [dispatch]);
  // #endregionhooks

  // #regionhandel
  const visitedHandel = (id: number) => {
    dispatch(toggleVisited(id));
  };
  const handleCardClick = (id: number) => {
    navigate(`/placedetails/${id}`);
  };
  // #endregionhandel
  return (
    <div className='my-4 gap-3 mx-auto justify-center p-3 flex h-full flex-wrap rounded-xl sm:grid-cols-2 lg:grid lg:h-full lg:w-full lg:grid-cols-3 lg:items-start lg:gap-3'>
      {currentItems && (
        <AnimatePresence mode='wait'>
          {currentItems.map((place) => (
            <div className=' lg:w-[30rem]lg:h-[30rem] rounded-lg border border-gray-200 bg-white shadow-md  lg:hover:shadow-xl lg:hover:shadow-gray-500'>
              <div
                onClick={() => handleCardClick(place.id)}
                className='lg:w-[25rem]lg:h-[25rem]  cursor-pointer '
              >
                <Flowbite key={place.id} theme={{ theme: customTheme }}>
                  <Card
                    imgAlt='Meaningful alt text for an image that is not purely decorative'
                    imgSrc={place.image}
                    className=' flex  flex-col items-center '
                  >
                    <h5 className='text-sm font-extrabold tracking-tight text-text'>
                      {place.name}
                    </h5>
                    <p className=' text-sm font-normal line-clamp-3'>
                      {place.description}
                    </p>
                  </Card>
                </Flowbite>
              </div>
              <div className='pl-6'>
                <Tooltip
                  className='w-fit'
                  content={place.visited ? 'Visited' : 'unvisited'}
                >
                  <button
                    className='lg:w-8 lg:h-8'
                    onClick={() => visitedHandel(place.id)}
                  >
                    {place.visited ? (
                      <MdOutlineVisibility className='lg:text-lg text-emerald-500 ' />
                    ) : (
                      <MdOutlineVisibilityOff className='lg:text-lg ' />
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </AnimatePresence>
      )}
      <Flowbite theme={{ theme: customThemePag }}>
        <div className='flex justify-center overflow-x-auto bg-transparent pt-3 sm:justify-center lg:w-full lg:justify-end lg:pl-2 lg:ml-[70%]'>
          <Pagination
            layout='pagination'
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
            showIcons
            previousLabel=''
            nextLabel=''
          />
        </div>
      </Flowbite>
    </div>
  );
};

export default AllPlaces;
