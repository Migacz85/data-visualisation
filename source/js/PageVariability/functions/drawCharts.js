/* eslint no-undef: 0*/
function drawCharts(date) {
  drawPriceChart(setDate(date, 'ether'), '#ether', width, height, '€');
  drawPriceChart(setDate(date, 'bitcoin'), '#bitcoin', width, height, '$');
  drawPriceChart(setDate(date, 'litecoin'), '#litecoin', width, height, '€');

  drawVarPriceChart(setDate(date, 'ether'), '#ether-var', width, height, '€');
  drawVarPriceChart(setDate(date, 'bitcoin'), '#bitcoin-var', width, height, '$');
  drawVarPriceChart(setDate(date, 'litecoin'), '#litecoin-var', width, height, '€');
}
