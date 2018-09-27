// This function draw price chart
/* eslint no-undef: 0*/

function drawPriceChart(data, id, width, height, currency) {
  queue()
    .defer(d3.csv, data)
    .await(makeGraphs);

  function makeGraphs(error, transactionsData) {
    loading++;
    progress(loading);
    if (error) { console.log(error); }
    const a = id.substr(1);
    a.toString();
    document.getElementById(a).innerHTML = `<p>${transactionsData[0].High} ${currency} </p>`;

    let max;
    let min;
    let firstDate;
    let lastDate;

    max = d3.max(transactionsData, d => +d.High);
    min = d3.min(transactionsData, d => +d.High);
    firstDate = d3.min(transactionsData, d => d.Date);
    lastDate = d3.max(transactionsData, d => d.Date);


    const x = d3.time.scale()
      .domain([new Date(firstDate), new Date(lastDate)])
      .range([10, width - 41]); // Left right position for date chart

    const xAxis = d3.svg.axis()
      .scale(x);


    const scale = d3.scale.linear()
      .domain([0, max - min]) // Boundaries for chart
      .range([0, height - 10 - marginBottom]); // boundaries for data


    if (svg) {
      const path = svg.select(id);
      path.exit().remove();
      console.log('there is svg');
    }
    const svg = d3.select(id)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', bgcolor)
      // .call(d3.behavior.zoom().on("zoom", function () {
      //   console.log(d3.event.translate)
      //   svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      // }))
      .append('g');
    const t = d3
      .transition()
      .duration(4500);

    // Bars
    svg.selectAll('rect')
      .data(transactionsData)
      .enter()
      .append('rect') // append svg to div

      .attr('x', (d, i) => width - width / transactionsData.length - (i * ((width - 50) / transactionsData.length)))
      .attr('y', d => height - marginBottom - scale(d.High - min))
      .attr('height', d => scale(d.High - min))
      .attr('width', d => width / transactionsData.length)
      .style('fill', 'white')
      .append('svg:title')
      .text(d => `Date: ${d.Date} Price: ${d.High}`)

      .append('g');


    svg.selectAll('rect')
      .transition()
      .duration(1500)
      .style('fill', chartColor);


    // Price
    svg.selectAll('text')
      .data(transactionsData)
      .enter()
      .append('text')
      .text((d, i) => parseInt(min + ((max - min) * (i * 0.1))))
      .attr('text-anchor', 'middle')
      .attr('x', () => 20)
      .attr('y', (d, i) => height - marginBottom - fontSize + parseInt(fontSize) - (i * ((height - marginBottom - fontSize) / 10)))
      .attr('font-family', font)
      .attr('font-size', fontSize)
      .attr('fill', 'black');

    // Date
    const tmp = height - marginBottom;

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(40,${  tmp  })`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .attr('font-size', fontSize)
      .style('text-anchor', 'start');


    // // 1. Create the button
    // let button = document.createElement("button");
    // button.innerHTML = "+";
    // let button2 = document.createElement("button");
    // button2.innerHTML = "-";

    // // 2. Append somewhere
    // let body = document.getElementById(a)
    // body.appendChild(button);

    // body.appendChild(button2);

    // // 3. Add event handler
    // button.addEventListener ("click", function() {

    // });
    // button2.addEventListener ("click", function() {
    //   startDate='&start_date=2018-01-01'

    //   svg.exit().remove()

    // drawVarPriceChart(etherPriceData,'#ether-var',width,height);
    // drawVarPriceChart(bitcoinPriceData,'#bitcoin-var',width,height);

    // });
  }
}
