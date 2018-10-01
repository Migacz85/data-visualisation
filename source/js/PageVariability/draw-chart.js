// This javascript file is last.
// Initialization functions on page start.

// When page is loading first time load preset with all data for charts.
/* eslint no-undef: 0 */
drawCharts('2017-07-01');

// Check if the browser is offline
if(!navigator.onLine) {
    alert('This website need to be connected to internet in order to work properly')
}
