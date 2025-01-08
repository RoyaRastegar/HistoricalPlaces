import React, { useEffect } from 'react';
import {
  fetchHistoricalPlaces,
  toggleVisited,
} from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { AppDispatch, RootState } from '../lib/redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Flowbite, Tooltip } from 'flowbite-react';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { MdOutlineVisibility } from 'react-icons/md';
const AllPlaces = () => {
  // #regionconst
  const dispatch: AppDispatch = useDispatch();
  const { places } = useSelector((state: RootState) => state.historicalPlaces);
  const customTheme = {
    card: {
      img: {
        base: ' w-full h-72 object-cover',
      },
      root: {
        children: 'flex lg:h-[10rem]  flex-col justify-center gap-2 px-4 py-3 ',
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
  // #endregionhandel
  return (
    <div className='my-4 gap-3   mx-auto p-3 flex  h-full flex-wrap rounded-xl sm:grid-cols-2 lg:grid lg:h-full lg:w-full lg:grid-cols-3 lg:items-start lg:gap-3'>
      {places &&
        places.map((place) => (
          <div className='lg:w-[30rem]lg:h-[30rem]'>
            <Flowbite key={place.id} theme={{ theme: customTheme }}>
              <Card
                imgAlt='Meaningful alt text for an image that is not purely decorative'
                imgSrc={place.image}
                className=' flex  flex-col items-center '
              >
                <h5 className='text-sm font-extrabold tracking-tight text-text'>
                  {place.name}
                </h5>
                <p className=' text-sm font-normal lg:line-clamp-3'>
                  {place.description}
                </p>
                <Tooltip content={place.visited ? 'Visited' : 'unvisited'}>
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
              </Card>
            </Flowbite>
          </div>
        ))}
    </div>
  );
};

export default AllPlaces;
