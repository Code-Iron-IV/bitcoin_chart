/** */
import React from 'react'
import Box from '@mui/material/Box'
import { createChart } from 'lightweight-charts'
import CandleChart from './CandleChart'
import { getCryptoImage, GetLiveCandle } from '../utils/binanceWS.js'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'

export default function ChartContainer() {
  const [alignment, setAlignment] = React.useState('1m')
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  const [CointPrice, setCointPrice] = React.useState('')
  const [PriceOneminuteBefore, setPriceOneminuteBefore] = React.useState('')
  const candleDataMap = new Map()
  const ws = GetLiveCandle(alignment, 'BTCUSDT', (kline) => {
    const newCandle = {
      time: kline.time,
      open: kline.open,
      high: kline.high,
      low: kline.low,
      close: kline.close
    }
    setCointPrice(kline.close.toFixed(2))
    //console.log('New Candle:', newCandle)
    candleDataMap.set(`${newCandle.time}`, newCandle.close.toFixed(2))
    if (candleDataMap.size > 100) {
      candleDataMap.delete(candleDataMap.keys().next().value)
    } // Giữ lại 100 giá trị gần nhất
    //console.log('Candle Data Map:', candleDataMap)
    if (candleDataMap.size > 60) {
      const oneMinuteBeforeKey = `${newCandle.time - 60}`
      const oneMinuteBeforePrice = candleDataMap.get(oneMinuteBeforeKey)
      setPriceOneminuteBefore(oneMinuteBeforePrice)
    } else {
      setPriceOneminuteBefore('')
    }
  })
  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 60px)',
      display: 'block',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
      boxShadow: 3,
      padding: 2
    }}>
      <Box sx={{
        position: 'relative',
        borderRadius: 1,
        boxShadow: 3,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#424242' : '#fff'),
        fontSize: '0.875rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: '8px',
          color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
          fontWeight: 'bold'
        }}>
          <Tooltip title="Coin" sx={{ alignItems: 'center' }}>
            <img src={getCryptoImage('BTCUSDT')} alt="Coin" style={{ width: '24px', height: '24px', marginRight: '8px' }}/>
          </Tooltip>
          {CointPrice} USD
          {PriceOneminuteBefore}
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{
              height: '40px'
            }}
          >
            <ToggleButton value="1m">1 Minute</ToggleButton>
            <ToggleButton value="5m">5 Minute</ToggleButton>
            <ToggleButton value="30m">30 Minute</ToggleButton>
            <ToggleButton value="1h">1 Hour</ToggleButton>
            <ToggleButton value="4h">4 Hour</ToggleButton>
            <ToggleButton value="1d">1 day</ToggleButton>
            <ToggleButton value="1w">1 Week</ToggleButton>
            <ToggleButton value="1M">1 Month</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 130px)',
        position: 'relative',
        mt: '10px',
        borderRadius: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#424242' : '#fff')
      }}>
        <CandleChart timeFrame={alignment}/>
      </Box>
    </Box>
  )
}
