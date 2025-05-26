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