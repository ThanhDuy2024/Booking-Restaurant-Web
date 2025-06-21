import { toast } from 'react-toastify';
import { clsx } from 'clsx';


export function cn(...args) {
  return args.filter(Boolean).join(' ');
}


export const buildUrlWithParams = (baseUrl, queryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    for (const key in queryParams) {
      const value = queryParams[key];
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    }
  }

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};



export const showToast = (message, options = {}) => {
  toast(message, {
    type: options.type || 'success',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const urlToFile = async (url, filename = 'avatar.jpg', mimeType = 'image/jpeg') => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });

};


export function parseTimeAll(timeAllStr) {
  const [time, date] = timeAllStr.split(' - ');
  const [day, month, year] = date.split('/');
  const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  return `${isoDate}T${time}:00`;
}

export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // ví dụ: "2025-06-11"
};