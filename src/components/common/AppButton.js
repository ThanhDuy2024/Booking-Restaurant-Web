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
  const isCustomColor = !['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'].includes(color);

  const customColorMap = {
    green: '#46e6a2',
    yellow: '#FACC15',
    red: '#ff4848',
    purple: '#8B5CF6',
    teal: '#14B8A6',
    orange: '#F97316',
  };

  const customColor = customColorMap[color];
  const isContained = variant === 'contained';

  return (
    <Button
      variant={variant}
      color={isCustomColor ? 'inherit' : color}
      startIcon={!loading ? startIcon : <CircularProgress size={20} color="inherit" />}
      endIcon={!loading ? endIcon : null}
      disabled={loading || props.disabled}
      onClick={onClick}
      {...props}
      fullWidth
      sx={{
        backgroundColor: isContained && isCustomColor ? customColor : undefined,
        color: isContained && isCustomColor ? '#111827' : undefined,
        borderColor: !isContained && isCustomColor ? customColor : undefined,
        '&:hover': {
          filter: 'brightness(1.1)',
          background: isCustomColor
            ? `linear-gradient(270deg, ${customColor}, #00CC99, ${customColor})`
            : undefined,
          backgroundSize: isCustomColor ? '600% 600%' : undefined,
          animation: isCustomColor ? 'gradientMove 3s ease infinite' : undefined,
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
