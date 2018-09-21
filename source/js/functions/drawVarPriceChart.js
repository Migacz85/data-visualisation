// Bitcoin variability

function drawVarPriceChart(data, id, width, height) {
  queue()
    .defer(d3.csv, data)
    .await(makeVarGraph);

  function makeVarGraph(error, transactionsData) {
    let max;
    let min;

    const a = id.substr(1);
    a.toString();


    max = d3.max(transactionsData, d => +d.High - d.Open);
    min = d3.min(transactionsData, d => +d.High - d.Open);

    max = max.toFixed(0);
    min = min.toFixed(0);
    document.getElementById(a).innerHTML = ` <p> Max: ${max} Average: ${((min + max) / 2)} </p>`;

    const scale = d3.scale.linear()
      .domain([0, max - min]) // boundaries for chart
      .range([0, height - 10]); // boundaries for data

    const svg = d3.select(id)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', bgcolor);

    // Bars
    svg.selectAll('rect')
      .data(transactionsData)
      .enter()
      .append('rect') // append svg to div
      .attr('x', (d, i) => width + 0 - width / transactionsData.length - (i * ((width - 50) / transactionsData.length)))
      .attr('y', d => height - scale(d.High - d.Low))
      .attr('height', d => scale(d.High - d.Low))
      .attr('width', d => width / transactionsData.length)
      .style('fill', chartColor)
      .append('svg:title')
      .text(d => `Date: ${d.Date} Variability: ${parseInt(d.High - d.Low)} Euro`);

    // Price
    svg.selectAll('text')
      .data(transactionsData)
      .enter()
      .append('text')
      .text((d, i) => parseInt(min + ((max - min) * (i * 0.1))))
      .attr('text-anchor', 'middle')
      .attr('x', () => 20)
      .attr('y', (d, i) => height + parseInt(fontSize) - (i * (height / 10)))
      .attr('font-family', font)
      .attr('font-size', fontSize)
      .attr('fill', 'black');

    // labels
    svg.selectAll('circle')
      .data(transactionsData)
      .enter()
      .append('text')
      .text(d => (d.High - d.Open).toFixed(0))
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => width - (i * (width / transactionsData.length)))
      .attr('y', d => height - scale(d.Open))
      .attr('font-family', font)
      .attr('font-size', fontSize)
      .attr('fill', 'black');
  }
}
