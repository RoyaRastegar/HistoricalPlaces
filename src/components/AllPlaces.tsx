import React, { useEffect } from 'react';
import { fetchHistoricalPlaces } from '../lib/redux/historicalPlacesSlice/historicalplacesSlice.ts';
import { AppDispatch, RootState } from '../lib/redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

const AllPlaces = () => {
  // #regionconst
  const dispatch: AppDispatch = useDispatch();
  const { places } = useSelector((state: RootState) => state.historicalPlaces);
  // #endregionconst

  // #regionhooks
  useEffect(() => {
    dispatch(fetchHistoricalPlaces());
  }, [dispatch]);
  // #endregionhooks
  console.log(places);
  return <div>all places</div>;
};

export default AllPlaces;
