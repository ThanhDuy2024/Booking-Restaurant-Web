'use client'
import Link from 'next/link';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { navigate } from 'next/dist/client/components/segment-cache';
import { useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';


const Navigator = ({ widthDevice }) => {
  const [activeTab, setActiveTab] = useState(new Array(5).fill(false));
  const [currentTab, setCurrentTab] = useState(-1);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [widthOffset, setWidthOffset] = useState('0');

  const handleEnter = (index) => {
    // Need to reformat this code
    setActiveTab((prev) => {
      const newContent = [...prev];
      if (currentTab < 0) {
        setCurrentTab(index);
        newContent[index] = !newContent[index];
      } else if (currentTab !== index) {
        setCurrentTab(index);
        newContent[currentTab] = !newContent[currentTab];
        newContent[index] = !newContent[index];
      } else {
        setCurrentTab(-1);
        newContent[index] = !newContent[index];
      }
      return newContent;
    });
  };

  const handleCloseMenu = () => {
    setIsShowMenu(false);
    setCurrentTab(-1);
    setActiveTab(Array.from(new Array(5).fill(false)));
  };

  const handleShowMenu = () => {
    setIsShowMenu(true);
  };

  const handleNavigate = (path) => {
    if (path) {
      setIsShowMenu(false);
      navigate(path);
    }
  };

  const getMotionMobileConfig = (isClosed, distance) => {
    return {
      initial: {
        left: isClosed ? distance : '-10px',
      },
      animate: {
        left: isClosed ? '-10px' : distance,
      },
      transition: {
        left: {
          duration: 0.5,
        },
      },
      exit: {
        left: isClosed ? distance : '-21px',
      },
    };
  };

  useEffect(() => {
    if (widthDevice <= 640) {
      setWidthOffset('-350px');
    } else setWidthOffset('0');
  }, [widthDevice]);

  return (
    <div
      className={
        'w-full h-max sm:flex sm:flex-col sm:justify-center sm:items-center'
      }
    >
      <div
        className={`w-fit h-fit p-2 sm:bg-emerald-600 cursor-pointer sm:hidden`}
        onClick={handleShowMenu}
      >
        <BsList color={'white'} size={25} />
      </div>
      <MotionConfig>
        <AnimatePresence initial={false}>
          <motion.div
            key="menu-panel"
            {...getMotionMobileConfig(isShowMenu, widthOffset)}
            className=" bg-white -top-5  min-w-fit sm:w-full h-max absolute sm:relative shadow-lg sm:shadow-none shadow-gray-500 text-black z-[10]"
          >
            <ul className="w-full h-full">
              <li className={'px-2.5 py-2 font-bold border-b-2 border-[var(--primary)]'}>
                <Link to={'/public'} href={''} onClick={()=>handleCloseMenu()}>Trang chủ</Link>
              </li>
              <li className={'px-2.5 py-2 font-bold border-b-2 border-[var(--primary)]'}>
                <Link to={'/public'} href={''} onClick={()=>handleCloseMenu()}>Quản lí</Link>
              </li>
              <li className={'px-2.5 py-2 font-bold border-b-2 border-[var(--primary)]'}>
                <Link to={'/public'} href={''} onClick={()=>handleCloseMenu()}>Yêu cầu</Link>
              </li>
              <li className={'px-2.5 py-2 font-bold border-b-2 border-[var(--primary)]'}>
                <Link to={'/public'} href={''} onClick={()=>handleCloseMenu()}>Doanh thu</Link>
              </li>
              <li className={'px-2.5 py-2 font-bold'}>
                <Link to={'/public'} href={''} onClick={()=>handleCloseMenu()}>Cài đặt</Link>
              </li>
            </ul>
          </motion.div>
          {widthOffset !== '0' ? (
            <motion.div
              key="backdrop"
              {...getMotionMobileConfig(isShowMenu, '-600vw')}
              className={
                'w-screen h-screen absolute -top-5 left-0 bg-[#5d5d5d4d] z-[1] cursor-pointer'
              }
              onClick={handleCloseMenu}
            ></motion.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </div>


  );
};
export default Navigator;