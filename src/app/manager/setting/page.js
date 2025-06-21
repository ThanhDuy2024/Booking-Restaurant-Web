// This page will show profile
// We will build some panel here
// First: show infomation - fullName, avatar, phone, address
// Second: show status
// Third: show account for payment
'use client'

import { useEffect,useState,Suspense } from 'react';
import {selectProfile} from 'src/redux/slices/manager/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const getMe=React.lazy(()=>import('../../../services/api/authService'));

const SettingPage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error} = useSelector(state => state.admin_profile);

  useEffect(() => {
    dispatch({ type: 'admin_profile/fetchProfile' });
  }, [dispatch]);

  useEffect(() => {
    console.log(profile);
  },[profile]);

  return(
    <div className={'w-full h-full flex justify-center items-center'}>
      <div></div>
    </div>
  )
}

export default SettingPage;