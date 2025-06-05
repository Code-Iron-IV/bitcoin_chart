import Box from '@mui/material/Box'
import AreaChartIcon from '@mui/icons-material/AreaChart'
import { Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ModeSelect from './ModeSelect'

export default function ChartBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#424242' : '#1565c0')
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <AreaChartIcon sx={{
          color: 'white'
        }}/>
        <Box
          sx={
            {
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }
          }
        >
          <Typography variant='span' sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>Chart Coin</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <ModeSelect />
      </Box>
    </Box>
  )
}