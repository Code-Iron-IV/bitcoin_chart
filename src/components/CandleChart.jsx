import React, { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { GetCandles, GetLiveCandle } from '../utils/binanceWS.js'
import { AreaSeries, BarSeries, BaselineSeries, CandlestickSeries, HistogramSeries } from 'lightweight-charts'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles' // Sử dụng useTheme để lấy theme hiện tại

const CandleChart = ({ timeFrame }) => {
  const chartContainerRef = useRef(null)
  const theme = useTheme() // Sử dụng useTheme thay vì useColorScheme
  const backgroundColor = theme.palette.background.default // Màu nền tùy theo chế độ sáng/tối
  const textColor = theme.palette.text.primary

  useEffect(() => {
    const loadChart = async () => {
      const candleData = await GetCandles(timeFrame, 'BTCUSDT')

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor }, // Màu nền chart
          textColor: textColor // Màu chữ
        },
        autoSize: true,
        timeScale: {
          timeVisible: true,
          secondsVisible: false
        }
      })

      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350'
      })
      candleSeries.setData(candleData.map(c => ({
        time: c.openTime / 1000, // Chuyển sang timestamp seconds
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close
      })))

      // Thêm volume chart (30% height)
      const volumeSeries = chart.addSeries(HistogramSeries, {
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: 'volume'
      })

      chart.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0
        }
      })

      volumeSeries.setData(candleData.map(c => ({
        time: c.openTime / 1000,
        value: c.volume
      })))
      //Kết nối WebSocket để nhận dữ liệu nến trực tiếp
      const ws = GetLiveCandle(timeFrame, 'BTCUSDT', (kline) => {
        const newCandle = {
          time: kline.time,
          open: kline.open,
          high: kline.high,
          low: kline.low,
          close: kline.close
        }
        candleSeries.update(newCandle)
        volumeSeries.update({ time: kline.time, value: kline.volume })
      })
    }
    // Xóa chart cũ nếu có
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = ''
    }
    // Tải chart mới

    loadChart()
  }, [timeFrame, backgroundColor, chartContainerRef, textColor])

  return <Box ref={chartContainerRef} sx={{ position: 'relative', width: '100%', height: '100%' }} />
}

export default CandleChart