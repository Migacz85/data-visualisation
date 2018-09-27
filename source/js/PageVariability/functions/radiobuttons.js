// User inputs from radiobutons
/* eslint no-undef:  0 */
function drawChartsSelectMonths(numberMonths) {
  if (loading == 6) { // prevent starting this functions while user is clicking on radio buttons to fast
    loading = 0;
    drawCharts(setDateScope(numberMonths));
  }
}

function alldata() {
  if (loading == 6) {
    loading = 0;
    drawCharts('2017-07-01');
  }
}
