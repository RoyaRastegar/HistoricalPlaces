import React, { useEffect, useState } from 'react';
import { fetchHistoricalPlaces } from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { AppDispatch, RootState } from '../lib/redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Flowbite, Pagination } from 'flowbite-react';
import { AnimatePresence } from 'framer-motion';
import PlaceCard from './PlaceCard.tsx';

const AllPlaces = () => {
  //#regionconst
  const dispatch: AppDispatch = useDispatch();
  const { places } = useSelector((state: RootState) => state.historicalPlaces);
  const [currentPage, setCurrentPage] = useState(1);
  const [randomPlace, setRandomPlace] = useState<number | null>(null);
  const onPageChange = (page: number) => setCurrentPage(page);
  const totalPage = Math.ceil(places.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const currentItems = places.slice(startIndex, startIndex + 6);
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

  useEffect(() => {
    dispatch(fetchHistoricalPlaces());
  }, [dispatch]);

  // #regionhandel
  const randomHandel = () => {
    if (!currentItems || currentItems.length === 0) {
      console.error('No items available for selection!');
      return;
    }
    const randomNumber = Math.floor(Math.random() * currentItems.length);
    setRandomPlace(randomNumber);
  };
  const clearRandomHandel = () => {
    setRandomPlace(null);
  };
  // #endregion
  return (
    <div className='flex flex-col'>
      <div className='h-fit text-center p-3 text-2xl'>
        {' '}
        <h2 className=''>Historical Places App </h2>
      </div>
      <div>
        {' '}
        {randomPlace ? (
          <div className='lg:w-[30rem] justify-self-center my-6'>
            <PlaceCard place={currentItems[randomPlace]} />
          </div>
        ) : (
          currentItems && (
            <div className=' gap-3 mx-auto justify-center p-3 flex h-full flex-wrap rounded-xl sm:grid-cols-2 lg:grid lg:h-full lg:w-full lg:grid-cols-3 lg:items-start lg:gap-3'>
              {' '}
              <AnimatePresence mode='wait'>
                {currentItems.map((place) => (
                  <PlaceCard place={place} />
                ))}
              </AnimatePresence>
            </div>
          )
        )}
      </div>

      <div className='flex justify-center p-3 gap-5 mb-5'>
        <button
          onClick={clearRandomHandel}
          className='text-white text-[10px] bg-green-400 rounded-full px-3 lg:text-sm hover:bg-gradient-to-r from-green-300 from-10%  via-50% to-emerald-500 to-90%'
        >
          Show Places
        </button>
        <Flowbite theme={{ theme: customThemePag }}>
          <div className='flex justify-center overflow-x-auto bg-transparent sm:justify-center  lg:justify-end  '>
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
        <button
          onClick={randomHandel}
          className='text-white bg-green-400 rounded-full px-3 text-[10px] lg:text-sm hover:bg-gradient-to-r from-green-300 from-10%  via-50% to-emerald-500 to-90%'
        >
          Random Place
        </button>
      </div>
    </div>
  );
};

export default AllPlaces;
