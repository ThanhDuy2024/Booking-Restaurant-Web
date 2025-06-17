'use client'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function LayoutWrapper () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'client_branch/fetchBranch'});
    dispatch({type: 'client_category/fetchCategory'});
    dispatch({type: 'client_food/fetchFood'});
  }, []);

  return null;
}