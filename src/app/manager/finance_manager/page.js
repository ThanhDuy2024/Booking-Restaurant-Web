// In this page, our customers will need more information about their revenue
// We need to show the revenue in day, in week and in month (in a year if they need)

// Information on revenue sources such as:
// total cash, total transfers, receipts and expenditures
// And show them as graph

//It is also possible to export information to a file (pdf),
// allowing the entry of revenue and expenditure data
// that is not available in the system (such as purchases or repair fees,...)

'use client'
import LineChart from '@/lib/charts/Line';

const FinanceManagerPage = () => {

  const formattedNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {}).format(number);
  };

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
      <div className={' border-2 border-gray-300 rounded-lg p-2'}>
        <div className={'w-full text-center border-b-2 border-gray-400 font-bold text-lg'}>CHI TIÊU HÔM NAY</div>
        <div className={'w-full flex flex-row justify-center items-center'}>
          <form className={'w-fit border-r-2 border-gray-300 mb-2 p-2 my-5'}>
            <fieldset className={''}>
              <div className={'font-bold '}>Thời gian:</div>
              <select className={'p-2 rounded-lg'}>
                <option>Hôm nay</option>
                <option>Tuần này</option>
                <option>Tháng này</option>
                <option>Năm nay</option>
                <option>Năm nay</option>
              </select>
              <input type={'submit'} hidden />
            </fieldset>
          </form>
          <div className={'grid grid-cols-2 grid-rows-2 gap-4 w-full p-2'}>
            <div>Số lần chi: <strong>1</strong></div>
            <div>Số tiền chi: <strong>200000</strong></div>
          </div>
        </div>
      </div>
      {/*display statistics in graph form*/}
      <div className={'w-full my-5 flex flex-col justify-center items-center'}>
        <div className={'w-[90%] h-fit bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>
          <LineChart titleChart={'Thống kê doanh thu theo tuần'}
                     labelDataset={'nghìn đồng'}
                     labelsChart={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
                     dataChart={[3400, 1500, 2550, 3040, 5760, 3500, 4120]}
                     stepSize={500} />

        </div>
        <div
          className={'w-[90%] h-fit p-3 bg-gray-100 border-2 border-amber-600 rounded-lg text-center m-2'}>

          <LineChart titleChart={'Doanh thu theo tháng'}
                     labelDataset={'đv: triệu đồng'}
                     labelsChart={['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']}
                     dataChart={[90, 100, 150, 102, 98, 97.6, 105.3, 120, 100, 150.3, 99.2, 161]}
                     stepSize={50} />
        </div>
      </div>

      {/*Count the number of times a dish is served*/}

    </div>
  );
};
export default FinanceManagerPage;