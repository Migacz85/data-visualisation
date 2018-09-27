// Draw price chart

function drawVarPriceChart(data, id, width, height, currency) {
  queue()
    .defer(d3.csv, data)
    .await(makeGraphs);

  function makeGraphs(error, transactionsData) {
    loading++;
    progress(loading);
    
    if (error) {
    console.log(error);
    }
    const a = id.substr(1);
    a.toString();
    document.getElementById(a).innerHTML = `<p>${transactionsData[0].Open} ${currency} </p>`;

    let max;
    let min;
    let firstDate;
    let lastDate;

    max = d3.max(transactionsData, d => +d.High - d.Low);
    min = d3.min(transactionsData, d => +d.High - d.Low);
    let avg = d3.mean(transactionsData, d => +d.High - d.Low);
    firstDate = d3.min(transactionsData, d => d.Date);
    lastDate = d3.max(transactionsData, d => d.Date);


    avg = avg.toFixed(0);
    max = max.toFixed(0);
    // min = min.toFixed(0);
    document.getElementById(a).innerHTML = ` <p> Max: ${max} Average: ${avg} ${currency} </p>`;


    const x = d3.time.scale()
      .domain([new Date(firstDate), new Date(lastDate)])
      .range([10, width - 41]); // Left right position for date chart

    const xAxis = d3.svg.axis()
      .scale(x);


    const scale = d3.scale.linear()
      .domain([0, max - min]) // Boundaries for chart
      .range([0, height - 10 - marginBottom]); // boundaries for data

    const svg = d3.select(id)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', bgcolor);


    svg.selectAll('rect')
      .data(transactionsData)
      .enter()
      .append('rect') // append svg to div
      .attr('x', (d, i) => width + 0 - width / transactionsData.length - (i * ((width - 50) / transactionsData.length)))
      .attr('y', d => height - marginBottom - scale(d.High - d.Low))
      .attr('height', d => scale(d.High - d.Low))
      .attr('width', d => width / transactionsData.length)
      .style('fill', 'white');



    svg.selectAll('rect')
      .transition()
      .duration(1500)
      .style('fill', chartColor)
      .transition()
      .duration(3000)
      .style('fill', (d) => {
      if (d.High-d.Low > avg) {   //Threshold of 15
          return "orange";
      } else {
          return chartColor;
      }
  });


    // Price
    svg.selectAll('text')
      .data(transactionsData)
      .enter()
      .append('text')
      .text((d, i) => parseInt(min + ((max - min) * (i * 0.1))))
      .attr('text-anchor', 'middle')
      .attr('x', () => 20)
      .attr('y', (d, i) => height - marginBottom - (i * ((height - marginBottom - fontSize) / 10)))
      .attr('font-family', font)
      .attr('font-size', fontSize)
      .attr('fill', 'black');

    // Date
    const tmp = height - marginBottom;

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(40,' + tmp + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .attr('font-size', fontSize)
      .style('text-anchor', 'start');
  }
  return 'done';
}
