import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ChartBar from './components/ChartBar'
import ChartContainer from './components/ChartContainer'

function App() {
  return (
    <Box>
      <ChartBar/>
      <ChartContainer/>
    </Box>
  )
}

export default App