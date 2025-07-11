/* eslint-disable no-console */
import React from 'react'
import axios from 'axios'

/**
 * Fetch candlestick data from Binance API
 * @param currentTimeFrame Time interval (e.g., 1m, 5m, 30m)
 * @param currentCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns Array of candlestick data
 */
export const GetCandles = async (currentTimeFrame, currentCoin) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${currentCoin}&interval=${currentTimeFrame}&limit=1000`
    )

    return response.data.map(item => ({
      openTime: item[0],
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5]),
      closeTime: item[6],
      baseAssetVolume: parseFloat(item[7]),
      numberOfTrades: item[8],
      takerBuyVolume: parseFloat(item[9]),
      takerBuyBaseAssetVolume: parseFloat(item[10]),
      ignore: parseFloat(item[11])
    }))
  } catch (error) {

    console.error('Error fetching candlestick data:', error)
    return []
  }
}

/**
 * Get 24-hour percent change and crypto info
 * @param currentCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns Crypto ticker data
 */
export const GetCryptoInfo = (currentCoin) => {
  return axios.get(
    `https://api.binance.com/api/v3/ticker?symbol=${currentCoin}`
  )
}

/**
 * Get live candlestick data from Binance WebSocket
 * @param currentTimeFrame Time interval (e.g., 1m, 5m, 30m)
 * @param currentCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns WebSocket URL
 */

export const GetLiveCandle = (currentTimeFrame, currentCoin, onMessageCallback) => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currentCoin.toLowerCase()}@kline_${currentTimeFrame}`)
  const wsKey = `${currentCoin.toLowerCase()}_${currentTimeFrame}`
  ws.onopen = () => {
    console.log(`Connected to ${currentCoin} ${currentTimeFrame} kline stream`)
  }

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (message.k) {
      const kline = {
        time: message.k.t / 1000, // Chuyển sang seconds và múi giờ VN
        open: parseFloat(message.k.o),
        high: parseFloat(message.k.h),
        low: parseFloat(message.k.l),
        close: parseFloat(message.k.c),
        volume: parseFloat(message.k.v),
        isClosed: message.k.x // Nến đã đóng hay chưa
      }
      // Gọi callback với dữ liệu mới
      onMessageCallback(kline)
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  ws.onclose = () => {
    console.log('WebSocket disconnected')
  }

  return ws // Trả về WebSocket instance để đóng kết nối sau
}


/**
 * Cryptocurrency list with image URLs
 */
export const cryptoCoins = [
  {
    cryptoName: 'BTCUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
  },
  {
    cryptoName: 'ETHUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
  },
  {
    cryptoName: 'SOLUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png'
  },
  {
    cryptoName: 'DOTUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png'
  },
  {
    cryptoName: 'BNBUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
  },
  {
    cryptoName: 'LINKUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png'
  },
  {
    cryptoName: 'CAKEUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png'
  },
  {
    cryptoName: 'MATICUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
  },
  {
    cryptoName: 'OMUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
  }
]

/**
 * Get the image URL of a cryptocurrency
 * @param getCoin Cryptocurrency symbol (e.g., BTCUSDT)
 * @returns Image URL or null
 */
export const getCryptoImage = getCoin => {
  const coin = cryptoCoins.find(crypto => crypto.cryptoName === getCoin)
  return coin ? coin.cryptoImage : null
}

/**
 * Convert Unix timestamp to human-readable date
 * @param unix Unix timestamp (milliseconds)
 * @returns Formatted date string
 */
export const unixToDate = unix => {
  return new Date(unix).toLocaleString()
}

