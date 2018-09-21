// Price
queue()
  .defer(d3.csv, bitcoinPriceData)
  .await(makeGraphs);

function makeGraphs(error, transactionsData) {
  document.getElementById('bitcoin').innerHTML = `${transactionsData[0].Open} BTC/Euro`;

  let max; let
    min;

  max = d3.max(transactionsData, d => +d.Open);
  min = d3.min(transactionsData, d => +d.Open);

  const scale = d3.scale.linear()
    .domain([0, max - min]) // boundaries for chart
    .range([0, height - 10]); // boundaries for data

  const svg = d3.select('#cost')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', bgcolor);

  // Bars
  svg.selectAll('rect')
    .data(transactionsData)
    .enter()
    .append('rect') // append svg to div
    .attr('x', (d, i) => width - width / transactionsData.length - (i * ((width - 50) / transactionsData.length)))
    .attr('y', d => height - scale(d.Open - min))
    .attr('height', d => scale(d.Open - min))
    .attr('width', d => width / transactionsData.length)
    .style('fill', chartColor)
    .append('svg:title')
    .text(d => `Date: ${d.Date} Price: ${d.Open}`);

  // Price
  svg.selectAll('text')
    .data(transactionsData)
    .enter()
    .append('text')
    .text((d, i) => parseInt(min + ((max - min) * (i * 0.1))))
    .attr('text-anchor', 'middle')
    .attr('x', () => 20)
    .attr('y', (d, i) => height - 5 - (i * (height / 10)))
    .attr('font-family', font)
    .attr('font-size', fontSize)
    .attr('fill', 'black');
}
