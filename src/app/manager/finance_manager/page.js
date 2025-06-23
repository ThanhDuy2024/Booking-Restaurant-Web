// In this page, our customers will need more information about their revenue
// We need to show the revenue in day, in week and in month (in a year if they need)

// Information on revenue sources such as:
// total cash, total transfers, receipts and expenditures
// And show them as graph

//It is also possible to export information to a file (pdf),
// allowing the entry of revenue and expenditure data
// that is not available in the system (such as purchases or repair fees,...)

'use client';
import LineChart from '@/lib/charts/Line';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';
import VerticalBarChart from '@/lib/charts/Verticalbar';

const FinanceManagerPage = () => {

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


  // useEffect(() => {
  //   console.log(yearData);
  // }, [yearData]);

  return (
    <div className={'w-full h-full flex flex-col justify-center items-center mt-10'}>
      {/*First, we will show the total cash, total transfers and all of them*/}
      <div className={' border-2 border-gray-300 rounded-lg p-2 my-5'}>
        <div className={'w-full text-center border-b-2 border-gray-400 font-bold text-lg'}>DOANH THU HÔM NAY</div>
        <div className={'w-full flex flex-row justify-center items-center'}>
          <form className={'w-fit border-r-2 border-gray-300 mb-2 p-2'}>
            <fieldset className={''}>
              <div className={'font-bold '}>Thời gian:</div>
              <select className={'p-2 rounded-lg'} onChange={(e) => {
                e.target.form.requestSubmit();
              }}>
                <option value={'today'}>Hôm nay</option>
                <option value={'tweek'}>Tuần này</option>
                <option value={'tmonth'}>Tháng này</option>
                <option value={'tyear'}>Năm nay</option>
              </select>
              <input type={'submit'} hidden />
            </fieldset>
          </form>
          <div className={'grid grid-cols-2 grid-rows-2 gap-4 w-full p-2'}>
            <div>Tiền mặt: <strong>{formattedNumber(10000000)}</strong></div>
            <div>Chuyển khoản: <strong>10000000</strong></div>
            <div>Tổng doanh thu: <strong>20000000</strong></div>
          </div>
        </div>
      </div>
      {/*Second, we will show the expenditures*/}
      
      {/*display statistics in graph form*/}
      <div className={'w-full my-5 flex flex-col justify-center items-center'}>
        <div className={'w-[90%] h-fit bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
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
        <div className={'w-[90%] h-fit bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
          <VerticalBarChart titleChart={'Thống kê doanh thu từng năm'}
                            labelDataset={'nghìn đồng'}
                            labelsChart={titleYearData}
                            dataChart={yearData ?? []}
                            stepSize={500} />

        </div>
      </div>

      {/*Count the number of times a dish is served*/}

    </div>
  );
};
export default FinanceManagerPage;