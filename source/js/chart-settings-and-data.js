// This javascript file is loaded first.
// Charts config
const width = 400;
const height = 200;
const marginBottom=50;
const chartColor='rgb(66, 170, 143)';
const font = 'Didact Gothic';
const fontSize = '10';
const bgcolor='white';


let setDate='2017-05-01'
let startDate='&start_date='+setDate


// Data
let bitcoinPriceData='https://www.quandl.com/api/v3/datasets/BITSTAMP/USD.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
let etherPriceData='https://www.quandl.com/api/v3/datasets/GDAX/ETH_EUR.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
let litecoinPriceData='https://www.quandl.com/api/v3/datasets/GDAX/LTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF'+startDate;
