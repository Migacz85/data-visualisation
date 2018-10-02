/* eslint no-unused-vars: 0 no-undef: 0 */
// Draw price chart

function drawVarPriceChart(data, id, width, height, currency) {
  function makeGraphs(error, transactionsData) {
    loading += 1;
    progress(loading);

    if (error) {
      console.log(error);
    }
    const a = id.substr(1);
    a.toString();
    document.getElementById(a).innerHTML = `<p>${transactionsData[0].Open} ${currency} </p>`;


    const max = d3.max(transactionsData, d => +d.High - d.Low).toFixed(1);
    const min = d3.min(transactionsData, d => +d.High - d.Low);
    const avg = d3.mean(transactionsData, d => +d.High - d.Low).toFixed(1);
    const firstDate = d3.min(transactionsData, d => d.Date);
    const lastDate = d3.max(transactionsData, d => d.Date);

    // Print stats

    document.getElementById(`${a}-stat`).innerHTML = `
      <li class="list-group-item">Dates:</li>
      <li class="list-group-item">${firstDate} to ${lastDate}</li>
      <li class="list-group-item">Maximal change in price per day: </li>
      <li class="list-group-item"> ${max} ${currency}</li>
      <li class="list-group-item">Minimal change in price per day: </li>
      <li class="list-group-item"> ${min.toFixed(1)} ${currency}</li>
      <li class="list-group-item">Average Variability in Price:</li>
      <li class="list-group-item"> ${avg} ${currency}</li>
      `;


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
      .attr('x', (d, i) => width - width / transactionsData.length - (i * ((width - 50) / transactionsData.length)))
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
        if (d.High - d.Low > avg) { // Threshold of 15
          return 'orange';
        }
        return chartColor;
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
      .attr('transform', `translate(40,${tmp})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .attr('font-size', fontSize)
      .style('text-anchor', 'start');
  }

  queue()
    .defer(d3.csv, data)
    .await(makeGraphs);
}
