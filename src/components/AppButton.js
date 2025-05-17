import React from 'react';
import Button from '@mui/material/AppButton';
import CircularProgress from '@mui/material/CircularProgress';

const AppButton = ({
                     children,
                     startIcon,
                     endIcon,
                     variant = 'outlined',
                     color = 'primary',
                     ...props
                   }) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={!loading ? startIcon : <CircularProgress size={20} color="inherit" />}
      endIcon={!loading ? endIcon : null}
      disabled={loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Đang xử lý...' : children}
    </Button>
  );
};

export default AppButton;