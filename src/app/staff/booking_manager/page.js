'use client'

import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import viLocale from '@fullcalendar/core/locales/vi';
import tippy from 'tippy.js';
import { useDispatch, useSelector } from 'react-redux';
import { parseTimeAll } from '@/lib/utils';


export default function BookingCalendar() {
  const { user } = useSelector((state)=> state.auth)
  const { bookingList, error, loading, query } = useSelector((state) => state.staff_booking)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'staff_booking/fetchBookingList' })
  }, [query, dispatch]);
  console.log("bookingList", bookingList);

  const filteredEvents = bookingList
    .map(booking => ({
      id: booking._id,
      title: `- Lịch đặt`,
      start: parseTimeAll(booking.timeAll),
      extendedProps: {
        fullName: booking.fullName,
        totalPerson: booking.totalPerson,
        phone: booking.phone,
        note: booking.note,
        timeAll: booking.timeAll,
      }
    }));

  return (
    <div className={`w-full`}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents}
        height="auto"
        selectable={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        eventDidMount={(info) => {
          const { fullName, totalPerson, note, phone, timeAll } = info.event.extendedProps;

          tippy(info.el, {
            content: `
      <div style="
        padding: 10px;
        max-width: 240px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 13px;
        line-height: 1.5;
        color: #333;
      ">
        <strong style="font-size: 14px; color: #111;">${fullName}</strong><br/>
        📅 <strong>${timeAll || '--'}</strong><br/>
        👥 ${totalPerson || 0} người<br/>
        📞 ${phone || '---'}<br/>
        📝 ${note || 'Không có ghi chú'}
      </div>
    `,
            allowHTML: true,
            placement: 'top',
            theme: 'light',
            animation: 'shift-away',
            interactive: false,
          });
        }}
      />
    </div>
  );
}
