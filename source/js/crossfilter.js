// // ETH/EUR
// // https://www.quandl.com/api/v3/datasets/GDAX/ETH_EUR.csv?api_key=fzanZC3297Jsid-E8vCF&start_date=2017-06-12

// // for this script should be in following example
// // var transactionsData = [
// //     {"name": "Tom", "store": "Acme", "state": "NY", "spend": 100},
// //     {"name": "Tom", "store": "Big Co.", "state": "NY", "spend": 200},
// //     {"name": "Bob", "store": "Acme", "state": "FL", "spend": 150},
// //     {"name": "Bob", "store": "Acme", "state": "NY", "spend": 200},
// //     {"name": "Bob", "store": "Big Co.", "state": "FL", "spend": 50},
// //     {"name": "Bob", "store": "Big Co.", "state": "NY", "spend": 75},
// //     {"name": "Alice", "store": "Acme", "state": "FL", "spend": 200},
// //     {"name": "Alice", "store": "Big Co.", "state": "NY", "spend": 350},
// // ];


// queue()
//     .defer(d3.csv, bitcoinPriceData)
//     .await(makeGraph2);


//  function makeGraph2(error, transactionsData) {

//     console.log(transactionsData)
//         var ndx = crossfilter(transactionsData);
//         var parseDate = d3.time.format("%d/%m/%Y").parse;
//         transactionsData.forEach(function(d){
//             d.date = parseDate(d.date);
//         });
//         var date_dim = ndx.dimension(dc.pluck('date'));
//         var total_spend_per_date = date_dim.group().reduceSum(dc.pluck('spend'));
//         var minDate = date_dim.bottom(1)[0].date;
//         var maxDate = date_dim.top(1)[0].date;
//         dc.lineChart("#ether")
//             .width(1000)
//             .height(300)
//             .margins({top: 10, right: 50, bottom: 30, left: 50})
//             .dimension(date_dim)
//             .group(total_spend_per_date)
//             .transitionDuration(500)
//             .x(d3.time.scale().domain([minDate,maxDate]))
//             .xAxisLabel("Month")
//             .yAxis().ticks(4);
//         dc.renderAll();
//     }