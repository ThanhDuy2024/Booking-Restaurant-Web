'use client';

import Image from 'next/image';
import Link from 'next/link';
import LineChart from '@/lib/charts/Line';
import { useEffect, useState } from 'react';
import Navigator from '@/components/manager/navigatorManager/Navigator';
import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';
import { toast } from 'react-toastify';
import VerticalBarChart from '@/lib/charts/Verticalbar';

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const [daysData, setDaysData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [titleYearData, setTitleYearData] = useState([]);

  const formattedNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {}).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endPoints.admin.getRevenueByDays);
        if (response.status === 200) {
          console.log(response.data);
          setDaysData(response.data.data);
        } else toast.error('error');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endPoints.admin.getRevenueByMonths);
        if (response.status === 200) {
          setMonthData(response.data.data);
        } else toast.error('error');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endPoints.admin.getRevenueByYears);
        if (response.status === 200) {
          setTitleYearData(response.data.years);
          setYearData(response.data.totalPriceInYears);
        } else toast.error('error');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={'w-full lg:max-w-screen h-screen flex justify-start items-center lg:item flex-col '}>
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
      <div className={'w-full h-fit flex justify-center flex-wrap lg:flex-nowrap items-start flex-row my-10 px-2 relative'}>

        {/*1. Amount of branchs*/}
        <div className={'w-full sm:w-[80%] lg:w-[20%] grid grid-cols-2 lg:grid-cols-1 grid-rows-2 lg:grid-rows-3 justify-center items-start lg:items-center gap-2 sm:gap-4'}>
          <div className={' h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p><strong>Tổng chi nhánh:</strong> 14</p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
          {/*2. Ranking of branchs (by revenue)*/}
          <div className={' h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p className={'font-bold'}> XẾP HẠNG</p>
            <p>1. SERVER ASIA</p>
            <p>2. SERVER CHINA</p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
          {/*3. Amount of booking (in system)*/}
          <div className={' h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <p className={'font-bold'}>TỔNG LƯỢT ĐẶT BÀN</p>
            <p><strong>34.000</strong></p>
            <Link to={'#'} href={'#'} className={'text-blue-600 underline'}>Chi tiết</Link>
          </div>
        </div>
        {/*4. Graph of booking (in system, by revenue and another one by guests in month)*/}
        {/*We will go to visit graph first.*/}
        <div className={'w-full flex flex-col justify-center items-center sm:items-center'}>
          <div className={'w-[90%] h-fit bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <LineChart titleChart={'Lượt khách ghé thăm'}
                       labelDataset={'lượt'}
                       labelsChart={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
                       dataChart={[120, 1500, 2550, 340, 576, 3500, 4120]} />

          </div>
          {/*THEN, we come to revenue graph*/}
          <div
            className={'w-[90%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <LineChart titleChart={'Thống kê doanh thu từng ngày'}
                       labelDataset={'nghìn đồng'}
                       labelsChart={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
                       dataChart={daysData ?? []}
                       stepSize={500} />

          </div>
          <div
            className={'w-[90%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
            <LineChart titleChart={'Doanh thu theo tháng'}
                       labelDataset={'đv: ngìn đồng'}
                       labelsChart={['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']}
                       dataChart={monthData ?? []}
                       stepSize={50} />

          </div>
          <div
            className={'w-[90%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>

            <VerticalBarChart titleChart={'Thống kê doanh thu từng năm'}
                              labelDataset={'nghìn đồng'}
                              labelsChart={titleYearData}
                              dataChart={yearData ?? []}
                              stepSize={500} />
          </div>
        </div>
        {/*5. Notification (from system)*/}
      </div>
    </div>
  );
};
export default Dashboard;