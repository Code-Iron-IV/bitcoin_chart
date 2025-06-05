import { createTheme } from '@mui/material'

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light'
      }
    },
    dark: {
      palette: {
        mode: 'dark'
      }
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true
      },
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontSize: '0.875rem',
          padding: '6px 16px',
          borderRadius: '4px',
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1565c0'
        })
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: 'top'
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important'
          }
        })
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 6,
          marginTop: '8px',
          minWidth: 180,
          color: 'white',
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1565c0',
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              marginRight: '8px',
              marginLeft: '8px'
            },
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#0d47a1'
            }
          }
        })
      }
    }
  }
})

export default theme