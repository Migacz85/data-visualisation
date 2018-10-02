/* eslint no-unused-vars: 0 */

function setDateScope(period) {
  const d = new Date();

  d.setMonth(d.getMonth() - period);
  return d.toISOString().slice(0, 10);
}


function setDate(date, type) {
  const startDate = `&start_date=${date}`;

  const bitcoinPriceData = `https://www.quandl.com/api/v3/datasets/BITSTAMP/USD.csv?api_key=fzanZC3297Jsid-E8vCF${startDate}`;
  const etherPriceData = `https://www.quandl.com/api/v3/datasets/GDAX/ETH_EUR.csv?api_key=fzanZC3297Jsid-E8vCF${startDate}`;
  const litecoinPriceData = `https://www.quandl.com/api/v3/datasets/GDAX/LTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF${startDate}`;

  if (type === 'bitcoin') return bitcoinPriceData;
  if (type === 'ether') return etherPriceData;
  if (type === 'litecoin') return litecoinPriceData;
}
