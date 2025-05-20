import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const AppButton = ({
                     children,
                     startIcon,
                     endIcon,
                     variant = 'outlined',
                     color = 'primary',
                     loading = false,
                     onClick,
                     ...props
                   }) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={!loading ? startIcon : <CircularProgress size={20} color="inherit" />}
      endIcon={!loading ? endIcon : null}
      disabled={loading || props.disabled}
      onClick={onClick}
      {...props}
      fullWidth={true}
      sx={{
        '&:hover': {
          filter: 'brightness(1.1)',
          background: 'linear-gradient(270deg, #facc15, #00CC99, #facc15)',
          backgroundSize: '600% 600%',
          animation: 'gradientMove 3s ease infinite',
          color: '#111827',
        },
        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {loading ? 'Đang xử lý...' : children}
    </Button>
  );
};

export default AppButton;
