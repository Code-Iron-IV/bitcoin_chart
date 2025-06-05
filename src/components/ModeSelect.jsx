import React from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { useColorScheme } from '@mui/material/styles'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LigthModeIcon from '@mui/icons-material/LightMode'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
        marginLeft: theme.spacing(1.5)
      }
    }
  }
}))

export default function ModeSelect() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <div>
      <Button
        id="button-mode-select"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ width: '110px',
          minWidth: '120px'
        }}
      >
        {mode === 'system' ? <><SettingsIcon fontSize='small' />System</> : ''}
        {mode === 'dark' ? <><DarkModeIcon fontSize='small' />Dark</> : ''}
        {mode === 'light' ? <><LigthModeIcon fontSize='small' />Light</> : ''}
      </Button>
      <StyledMenu
        id='button-mode-select'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          maxWidth: '1px',
          minWidth: '1000px'
        }}
      >
        <MenuItem onClick={() => {setMode('system')}} disableRipple>
          <SettingsIcon fontSize='small' sx={{ color: 'white' }}/>
          System
        </MenuItem>
        <MenuItem onClick={() => {setMode('dark')}} disableRipple>
          <DarkModeIcon fontSize='small' sx={{ color: 'white' }}/>
          DARK
        </MenuItem>
        <MenuItem onClick={() => {setMode('light')}} disableRipple>
          <LigthModeIcon fontSize='small' sx={{ color: 'white' }}/>
          LIGHT
        </MenuItem>
      </StyledMenu>
    </div>
  )
}