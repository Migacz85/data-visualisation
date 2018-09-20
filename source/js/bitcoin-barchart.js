// data //https://www.quandl.com/api/v3/datasets/BCHAIN/CPTRA.csv?api_key=fzanZC3297Jsid-E8vCF
// https://www.quandl.com/api/v3/datasets/BCHAIN/CPTRA.json?api_key=fzanZC3297Jsid-E8vCF
// https://www.quandl.com/data/BCHAIN/CPTRA-Bitcoin-Cost-Per-Transaction

// https://www.quandl.com/api/v3/datasets/GDAX/BTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF
queue()
  .defer(d3.csv, 'https://www.quandl.com/api/v3/datasets/GDAX/BTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF')
  .await(makeGraphs);


function makeGraphs(error, transactionsData) {
  const ndx = crossfilter(transactionsData);
  document.getElementById('bitcoin').innerHTML=
  `${transactionsData[0].Open} BTC/Euro`;
  const parseDate = d3.time.format('%Y/%m/%d').parse;

  console.log(parseDate);
  console.log(transactionsData);

  const width = 300;
  const height = 200;
  let max;
  max = d3.max(transactionsData, d => +d.Open);

  
  const scale = d3.scale.linear()
    .domain([0, d3.max(transactionsData, d => +d.Open)]) // boundaries for chart
    .range([0, height - 10]); // boundaries for data

  const svg = d3.select('#cost')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

    .style('background-color', 'white');

  // bars
  svg.selectAll('rect')
    .data(transactionsData)
    .enter()
    .append('rect') // append svg to div
    .attr('x', (d, i) => width+0 - width / transactionsData.length - (i * ((width) / transactionsData.length)))
    .attr('y', d => height - scale(d.Open))
    .attr('height', d => scale(d.Open))
    .attr('width', d => width / transactionsData.length)
    .style('fill', 'rgb(66, 100, 143)')
    .append('svg:title')
    .text(d => `Date: ${d.Date} Price: ${d.Open}`)
    
  
    // price
  svg.selectAll('text')
    .data(transactionsData)
    .enter()
    .append('text')
    .text((d, i) => parseInt(((i + 1) * 0.1) * max))
    .attr('text-anchor', 'middle')
    .attr('x', () => 20)
    .attr('y', (d, i) => height-5 - (i * (height / 10)))
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'black');

  //   // date
  //   svg.selectAll('circle')
  //     .data(transactionsData)
  //     .enter()
  //     .append('text')
  //     .text((d, i) => d.Date)
  //     .attr('text-anchor', 'middle')
  //     .attr('x', (d, i) => width - (i * (width / 10)))
  //     .attr('y', (d, i) => height - 10)
  //     .attr('font-family', 'sans-serif')
  //     .attr('font-size', '11px')
  //     .attr('fill', 'white');

  // labels
  svg.selectAll('text')
    .data(transactionsData)
    .enter()
    .append('text')
    .text(d => (d.High - d.Open).toFixed(0))
    .attr('text-anchor', 'middle')
    .attr('x', (d, i) => width - (i * (width / transactionsData.length)))
    .attr('y', d => height - scale(d.Open))

    .attr('font-family', 'sans-serif')
    .attr('font-size', '1px')
    .attr('fill', 'white');
}
