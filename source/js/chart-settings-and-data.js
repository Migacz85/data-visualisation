// This javascript file is loaded first.
// Charts config
const width = 300;
const height = 200;
const chartColor='rgb(66, 170, 143)';
const font = 'Didact Gothic';
const fontSize = '10';
const bgcolor='white';

let startDate='&start_date=2017-03-06'

// Data
const bitcoinPriceData='https://www.quandl.com/api/v3/datasets/GDAX/BTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
const etherPriceData='https://www.quandl.com/api/v3/datasets/GDAX/ETH_EUR.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
const litecoinPriceData='https://www.quandl.com/api/v3/datasets/GDAX/LTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
