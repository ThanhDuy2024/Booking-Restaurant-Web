'use client';

import Image from 'next/image';
import Link from 'next/link';
import LineChart from '@/lib/charts/Line';
import { useState } from 'react';
import Navigator from 'src/components/common/navigatorManager/Navigator';

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={'w-screen lg:max-w-screen h-screen flex justify-start items-center lg:item flex-col '}>
      {/*title*/}
      <div className={'w-full h-fit p-3 bg-[var(--heading)] flex justify-between items-center flex-row sm:hidden'}>
        {/*menu button here*/}
        <div className={'w-[30%] flex flex-row justify-end items-center relative sm:hidden'}>
          <Navigator widthDevice={0} />
        </div>

        {/*name here*/}
        <div className={'w-[40%] text-white text-center text-2xl font-bold'}>
          ARENA OF VALOR
        </div>
        {/*logo here*/}
        <div className={'w-[30%] flex justify-center items-center'}>
          <Image width={40} height={40} src={'/'} alt="logo" />
        </div>
      </div>

      {/*main content*/}
      {/*In this page, we will show some information:*/}
      <div className={'w-full h-fit flex justify-start flex-wrap lg:flex-nowrap items-start flex-row my-10 px-4 relative'}>

        {/*1. Amount of branchs*/}
        <div className={'flex flex-row lg:flex-col justify-start items-start lg:items-center w-full lg:w-fit'}>
          <div className={'w-fit h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p><strong>Tổng chi nhánh:</strong> 14</p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
          {/*2. Ranking of branchs (by revenue)*/}
          <div className={'w-fit h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p className={'font-bold'}> XẾP HẠNG</p>
            <p>1. SERVER ASIA</p>
            <p>2. SERVER CHINA</p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
          {/*3. Amount of booking (in system)*/}
          <div className={'w-fit h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p className={'font-bold'}>TỔNG LƯỢT ĐẶT BÀN</p>
            <p><strong>34.000</strong></p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
        </div>
        {/*4. Graph of booking (in system, by revenue and another one by guests in month)*/}
        {/*We will go to visit graph first.*/}
        <div className={'flex flex-col justify-center items-center sm:items-start w-full'}>
          <div className={'w-full sm:w-[80%] h-fit bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <LineChart titleChart={'Lượt khách ghé thăm'}
                       labelDataset={'lượt'}
                       labelsChart={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
                       dataChart={[120, 1500, 2550, 340, 576, 3500, 4120]} />

          </div>
          {/*THEN, we come to revenue graph*/}
          <div
            className={'w-full sm:w-[80%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <LineChart titleChart={'Doanh thu trong tuần'}
                       labelDataset={'đv: 000đ'}
                       labelsChart={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
                       dataChart={[120, 1500, 2550, 340, 576, 3500, 4120]} />

          </div>
          <div
            className={'w-full sm:w-[80%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>

            <LineChart titleChart={'Doanh thu trong tháng'}
                       labelDataset={'đv: 000đ'}
                       labelsChart={['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']}
                       dataChart={[120, 1500, 2550, 340, 576, 3500, 4120, 120, 1500, 2550, 340, 5761]} />
          </div>
        </div>
        {/*5. Notification (from system)*/}
      </div>
    </div>
  );
};
export default Dashboard;