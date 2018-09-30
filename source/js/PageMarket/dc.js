const gainOrLossChart = dc.pieChart('#gain-loss-chart');
const fluctuationChart = dc.barChart('#fluctuation-chart');
const dayOfWeekChart = dc.rowChart('#day-of-week-chart');
const moveChart = dc.lineChart('#monthly-move-chart');
const volumeChart = dc.barChart('#monthly-volume-chart');
const monthlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');

const width = 340;
const height = 300;

d3.csv('https://www.quandl.com/api/v3/datasets/BCHARTS/COINBASEEUR.csv?api_key=fzanZC3297Jsid-E8vCF').then((data) => {
  // Format the data
  let dateFormatSpecifier = '%Y-%m-%d';
  let dateFormat = d3.timeFormat(dateFormatSpecifier);
  let dateFormatParser = d3.timeParse(dateFormatSpecifier);
  let numberFormat = d3.format('.2f');

  data.forEach((d) => {
        d.dd = dateFormatParser(d.Date);
        d.month = d3.timeMonth(d.dd); // pre-calculate month
        d.Close = +d.Close; // change to number
        d.Open = +d.Open;
    });
  // Find first and last date
  const minDate = d3.min(data, d => d.Date);
  const maxDate = d3.max(data, d => d.Date);

  // Create Crossfilter Dimensions and Groups
  let ndx = crossfilter(data);
  let all = ndx.groupAll();

  // Dimension by month
  let monthlyDimension = ndx.dimension((d) => {
         if (d.dd.getMonth()+1==1) return  "Jan "
         if (d.dd.getMonth()+1==2) return  "Feb"
         if (d.dd.getMonth()+1==3) return  "Mar"
         if (d.dd.getMonth()+1==4) return  "Apr"
         if (d.dd.getMonth()+1==5) return  "May"
         if (d.dd.getMonth()+1==6) return  "Jun"
         if (d.dd.getMonth()+1==7) return  "Jul"
         if (d.dd.getMonth()+1==8) return  "Aug"
         if (d.dd.getMonth()+1==9) return  "Sep"
         if (d.dd.getMonth()+1==10) return  "Oct"
         if (d.dd.getMonth()+1==11) return  "Nov"
         if (d.dd.getMonth()+1==12) return  "Dece"
    });

  // Maintain running tallies by month as filters are applied or removed
  let monthlyPerformanceGroup = monthlyDimension.group().reduce(
    /* callback for when data is added to the current filter results */
    (p, v) => {
            ++p.count;
            p.absGain += v.Close - v.Open;
            p.fluctuation += Math.abs(v.Close - v.Open);
            p.sumIndex += (v.Open + v.Close) / 2;
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
            p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
            return p;
        },
    /* callback for when data is removed from the current filter results */
    (p, v) => {
            --p.count;
            p.absGain -= v.Close - v.Open;
            p.fluctuation -= Math.abs(v.Close - v.Open);
            p.sumIndex -= (v.Open + v.Close) / 2;
            p.avgIndex = p.count ? p.sumIndex / p.count : 0;
            p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
            p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
            return p;
        },
    /* initialize p */
    () => {
            return {
                count: 0,
                absGain: 0,
                fluctuation: 0,
                fluctuationPercentage: 0,
                sumIndex: 0,
                avgIndex: 0,
                percentageGain: 0
            };
        },
  );

  // Dimension by full date
  let dateDimension = ndx.dimension((d) => {
        return d.dd;
    });

  // Dimension by month
  let moveMonths = ndx.dimension((d) => {
        return d.month;
    });
    // Group by total movement within month
  let monthlyMoveGroup = moveMonths.group().reduceSum((d) => {
        return Math.abs(d.Close - d.Open);
    });
    // Group by total volume within move, and scale down result
  let volumeByMonthGroup = moveMonths.group().reduceSum((d) => {
        return d['Volume (Currency)']/100000000
    });
  let indexAvgByMonthGroup = moveMonths.group().reduce(
    (p, v) => {
            ++p.days;
            p.total += (v.Open + v.Close) / 2;
            p.avg = Math.round(p.total / p.days);
            return p;
        },
    (p, v) => {
            --p.days;
            p.total -= (v.Open + v.Close) / 2;
            p.avg = p.days ? Math.round(p.total / p.days) : 0;
            return p;
        },
    () => {
            return {days: 0, total: 0, avg: 0};
        },
  );

  // Create categorical dimension
  let gainOrLoss = ndx.dimension((d) => {
        return d.Open > d.Close ? 'Loss' : 'Gain';
    });
    // Produce counts records in the dimension
  let gainOrLossGroup = gainOrLoss.group();

  // Determine a histogram of percent changes
  let fluctuation = ndx.dimension((d) => {
        return Math.round((d.Close - d.Open) / d.Open * 100);
    });
  let fluctuationGroup = fluctuation.group();

  // Counts per weekday
  let dayOfWeek = ndx.dimension((d) => {
        var day = d.dd.getDay();
        var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day + '.' + name[day];
    });
  let dayOfWeekGroup = dayOfWeek.group();

  monthlyBubbleChart /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */
  // (_optional_) define chart width, `default = 200`
    .width(width)
  // (_optional_) define chart height, `default = 200`
    .height(height)
  // (_optional_) define chart transition duration, `default = 750`
    .transitionDuration(1500)
    .margins({ 
top: 10, right: 50, bottom: 55, left: 40
 })
    .dimension(monthlyDimension)
  // The bubble chart expects the groups are reduced to multiple values which are used
  // to generate x, y, and radius for each key (bubble) in the group
    .group(monthlyPerformanceGroup)
  // (_optional_) define color function or array for bubbles: [ColorBrewer](http://colorbrewer2.org/)
    .colors(d3.schemeRdYlGn[9])
  // (optional) define color domain to match your data domain if you want to bind data or color
    .colorDomain([-500, 500])
    // ##### Accessors

  // Accessor functions are applied to each value returned by the grouping

  // `.colorAccessor` - the returned value will be passed to the `.colors()` scale to determine a fill color
    .colorAccessor((d) => {
            return d.value.absGain;
        })
  // `.keyAccessor` - the `X` value will be passed to the `.x()` scale to determine pixel location
    .keyAccessor((p) => {
            return p.value.absGain;
        })
  // `.valueAccessor` - the `Y` value will be passed to the `.y()` scale to determine pixel location
    .valueAccessor((p) => {
            return p.value.percentageGain;
        })
  // `.radiusValueAccessor` - the value will be passed to the `.r()` scale to determine radius size;
  //   by default this maps linearly to [0,100]
    .radiusValueAccessor((p) => {
            return p.value.fluctuationPercentage;
        })
    .maxBubbleRelativeSize(0.3)
    .x(d3.scaleLinear().domain([-2500, 2500]))
    .y(d3.scaleLinear().domain([-100, 100]))
    .r(d3.scaleLinear().domain([0, 4000]))
  // ##### Elastic Scaling

  // `.elasticY` and `.elasticX` determine whether the chart should rescale each axis to fit the data.
    .elasticY(true)
    .elasticX(true)
  // `.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
  // domains as the Accessors.
    .yAxisPadding(100)
    .xAxisPadding(500)
  // (_optional_) render horizontal grid lines, `default=false`
    .renderHorizontalGridLines(true)
  // (_optional_) render vertical grid lines, `default=false`
    .renderVerticalGridLines(true)
  // (_optional_) render an axis label below the x axis
    .xAxisLabel('Crytpo Gain $')
  // (_optional_) render a vertical axis lable left of the y axis
    .yAxisLabel('Crypto Gain %')
  // ##### Labels and  Titles

  // Labels are displayed on the chart for each bubble. Titles displayed on mouseover.
  // (_optional_) whether chart should render labels, `default = true`
    .renderLabel(true)
    .label((p) => {
            return p.key;
        })
  // (_optional_) whether chart should render titles, `default = false`
    .renderTitle(true)
    .title((p) => {
            return [
                p.key,
                'Index Gain: ' + numberFormat(p.value.absGain),
                'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
            ].join('\n');
        })
  // #### Customize Axes

  // Set a custom tick format. Both `.yAxis()` and `.xAxis()` return an axis object,
  // so any additional method chaining applies to the axis, not the chart.
    .yAxis()
.tickFormat((v) => {
            return v + '%';
        });

  // #### Pie/Donut Charts

  gainOrLossChart /* dc.pieChart('#gain-loss-chart', 'chartGroup') */
    // (_optional_) define chart width, `default = 200`
    .width(width)
    // (optional) define chart height, `default = 200`
    .height(height)
    // Define pie radius
    .radius(80)
    // Set dimension
    .dimension(gainOrLoss)
    // Set group
    .group(gainOrLossGroup)

    // (_optional_) by default pie chart will use `group.key` as its label but you can overwrite it with a closure.
    .label((d) => {
            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        });

  dayOfWeekChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
    .width(width)
    .height(height)
    .margins({
 top: 20, left: 10, right: 10, bottom: 20
 })
    .group(dayOfWeekGroup)
    .dimension(dayOfWeek)
  // Assign colors to each value in the x scale domain
    .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
    .label((d) => {
            return d.key.split('.')[1];
        })
  // Title sets the row text
    .title((d) => {
            return d.value;
        })
    .elasticX(true)
    .xAxis()
.ticks(4);

  // #### Bar Chart

  // Create a bar chart and use the given css selector as anchor. You can also specify
  // an optional chart group for this chart to be scoped within. When a chart belongs
  // to a specific group then any interaction with such chart will only trigger redraw
  // on other charts within the same chart group.
  // <br>API: [Bar Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bar-chart)
  fluctuationChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
    .width(width)
    .height(height)
    .margins({ 
top: 10, right: 50, bottom: 30, left: 40 
})
    .dimension(fluctuation)
    .group(fluctuationGroup)
    .elasticY(true)
  // (_optional_) whether bar should be center to its x value. Not needed for ordinal chart, `default=false`
    .centerBar(true)
  // (_optional_) set gap between bars manually in px, `default=2`
    .gap(1)
  // (_optional_) set filter brush rounding
    .round(dc.round.floor)
    .alwaysUseRounding(true)
    .x(d3.scaleLinear().domain([-25, 25]))
    .renderHorizontalGridLines(true)
  // Customize the filter displayed in the control span
    .filterPrinter((filters) => {
            var filter = filters[0], s = '';
            s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
            return s;
        });

  // Customize axes
  fluctuationChart.xAxis().tickFormat(
    (v) => { return v + '%'; }
);
  fluctuationChart.yAxis().ticks(5);

  // #### Stacked Area Chart

  // Specify an area chart by using a line chart with `.renderArea(true)`.
  // <br>API: [Stack Mixin](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#stack-mixin),
  // [Line Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#line-chart)
  moveChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
    .renderArea(true)
    .width(width)
    .height(150)
    .transitionDuration(1000)
    .margins({
 top: 30, right: 50, bottom: 55, left: 52 
})
    .dimension(moveMonths)
    .mouseZoomable(true)
    // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
    .rangeChart(volumeChart)
    .x(d3.scaleTime().domain([new Date(minDate), new Date(maxDate)]))
    .round(d3.timeMonth.round)
    .xUnits(d3.timeMonths)
    .elasticY(true)
    .renderHorizontalGridLines(true)
    

    // ##### Legend

  // Position the legend relative to the chart origin and specify items' height and separation.
    .legend(dc.legend().x(800).y(10).itemHeight(13)
.gap(5))
    .brushOn(false)
  // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
  // legend.
  // The `.valueAccessor` will be used for the base layer
    .group(indexAvgByMonthGroup, 'Monthly Index Average')
    .valueAccessor((d) => {
            return d.value.avg;
        })
  // Stack additional layers with `.stack`. The first paramenter is a new group.
  // The second parameter is the series name. The third is a value accessor.
    .stack(monthlyMoveGroup, 'Monthly Index Move', (d) => {
            return d.value;
        })
  // Title can be called by any stack layer.
    .title((d) => {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return dateFormat(d.key) + '\n' + numberFormat(value);
        });

  // #### Range Chart

  // Since this bar chart is specified as "range chart" for the area chart, its brush extent
  // will always match the zoom of the area chart.
  volumeChart.width(width) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
    .height(150)
    .margins({ 
top: 0, right: 50, bottom: 55, left: 40
 })
    .dimension(moveMonths)
    .group(volumeByMonthGroup)
    .centerBar(true)
    .gap(1)
    .x(d3.scaleTime().domain([new Date(minDate), new Date(maxDate)]))
    .round(d3.timeMonth.round)
    .alwaysUseRounding(true)
    .xUnits(d3.timeMonths)
    .yAxisLabel('Billions $')

  // #### Rendering

  dc.renderAll();
});
