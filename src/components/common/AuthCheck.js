'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthRequest } from '@/redux/slices/authSlice';

export default function AuthCheck() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  return null;
}