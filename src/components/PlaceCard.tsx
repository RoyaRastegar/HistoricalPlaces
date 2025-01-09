import { Button, Card, Flowbite, Tooltip } from 'flowbite-react';
import React from 'react';
import { IPlace } from '../utils/types/places';
import { toggleVisited } from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { MdOutlineVisibility } from 'react-icons/md';
import { AppDispatch } from '../lib/redux/store.ts';
import { useDispatch } from 'react-redux';

interface IProps {
  place: IPlace;
}
const PlaceCard = (props: IProps) => {
  // #regionconst
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
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
  //   #endregionconst

  // #regionhandel
  const visitedHandel = (id: number) => {
    dispatch(toggleVisited(id));
  };
  const handleCardClick = (id: number) => {
    navigate(`/placedetails/${id}`);
  };
  //  #endregionhandel
  return (
    <div className=' lg:w-[30rem]lg:h-[30rem] rounded-lg border border-gray-200 bg-white shadow-md  lg:hover:shadow-xl lg:hover:shadow-gray-500'>
      <div
        onClick={() => handleCardClick(props.place.id)}
        className='lg:w-[25rem]lg:h-[25rem]  cursor-pointer '
      >
        <Flowbite key={props.place.id} theme={{ theme: customTheme }}>
          <Card
            imgAlt='Meaningful alt text for an image that is not purely decorative'
            imgSrc={props.place.image}
            className=' flex  flex-col items-center '
          >
            <h5 className='text-sm font-extrabold tracking-tight text-text'>
              {props.place.name}
            </h5>
            <p className=' text-sm font-normal line-clamp-3'>
              {props.place.description}
            </p>
            <Button className='bg-green-500'>
              Read more
              <svg
                className='-mr-1 ml-2 h-4 w-4'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </Card>
        </Flowbite>
      </div>
      <div className='pl-6'>
        <Tooltip
          className='w-fit'
          content={props.place.visited ? 'Visited' : 'unvisited'}
        >
          <button
            className='lg:w-8 lg:h-8'
            onClick={() => visitedHandel(props.place.id)}
          >
            {props.place.visited ? (
              <MdOutlineVisibility className='lg:text-lg text-emerald-500 ' />
            ) : (
              <MdOutlineVisibilityOff className='lg:text-lg ' />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default PlaceCard;
