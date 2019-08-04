"use strict";var gainOrLossChart=dc.pieChart("#gain-loss-chart"),fluctuationChart=dc.barChart("#fluctuation-chart"),dayOfWeekChart=dc.rowChart("#day-of-week-chart"),moveChart=dc.lineChart("#monthly-move-chart"),volumeChart=dc.barChart("#monthly-volume-chart"),monthlyBubbleChart=dc.bubbleChart("#yearly-bubble-chart"),width=340,height=300,Calculator={current:0,operator:"",button_value:0,equation:""};navigator.onLine||alert("This website need to be connected to internet in order to work properly"),d3.csv("https://www.quandl.com/api/v3/datasets/BCHARTS/COINFALCONEUR.csv?api_key=fzanZC3297Jsid-E8vCF").then(function(e){document.getElementById("loader").style.display="none",document.getElementById("container").style.display="block",document.getElementById("footer").style.display="block";var t=d3.timeFormat("%Y-%m-%d"),n=d3.timeParse("%Y-%m-%d"),a=d3.format(".2f");e.forEach(function(e){e.dd=n(e.Date),e.month=d3.timeMonth(e.dd),e.Close=+e.Close,e.Open=+e.Open});var r=d3.min(e,function(e){return e.Date}),o=d3.max(e,function(e){return e.Date}),i=crossfilter(e),u=i.groupAll(),d=i.dimension(function(e){return e.dd.getMonth()+1==1?"Jan ":e.dd.getMonth()+1==2?"Feb":e.dd.getMonth()+1==3?"Mar":e.dd.getMonth()+1==4?"Apr":e.dd.getMonth()+1==5?"May":e.dd.getMonth()+1==6?"Jun":e.dd.getMonth()+1==7?"Jul":e.dd.getMonth()+1==8?"Aug":e.dd.getMonth()+1==9?"Sep":e.dd.getMonth()+1==10?"Oct":e.dd.getMonth()+1==11?"Nov":e.dd.getMonth()+1==12?"Dece":void 0}),l=d.group().reduce(function(e,t){return++e.count,e.absGain+=t.Close-t.Open,e.fluctuation+=Math.abs(t.Close-t.Open),e.sumIndex+=(t.Open+t.Close)/2,e.avgIndex=e.sumIndex/e.count,e.percentageGain=e.avgIndex?e.absGain/e.avgIndex*100:0,e.fluctuationPercentage=e.avgIndex?e.fluctuation/e.avgIndex*100:0,e},function(e,t){return--e.count,e.absGain-=t.Close-t.Open,e.fluctuation-=Math.abs(t.Close-t.Open),e.sumIndex-=(t.Open+t.Close)/2,e.avgIndex=e.count?e.sumIndex/e.count:0,e.percentageGain=e.avgIndex?e.absGain/e.avgIndex*100:0,e.fluctuationPercentage=e.avgIndex?e.fluctuation/e.avgIndex*100:0,e},function(){return{count:0,absGain:0,fluctuation:0,fluctuationPercentage:0,sumIndex:0,avgIndex:0,percentageGain:0}}),s=(i.dimension(function(e){return e.dd}),i.dimension(function(e){return e.month})),c=s.group().reduceSum(function(e){return Math.abs(e.Close-e.Open)}),h=s.group().reduceSum(function(e){return e["Volume (Currency)"]/1e8}),g=s.group().reduce(function(e,t){return++e.days,e.total+=(t.Open+t.Close)/2,e.avg=Math.round(e.total/e.days),e},function(e,t){return--e.days,e.total-=(t.Open+t.Close)/2,e.avg=e.days?Math.round(e.total/e.days):0,e},function(){return{days:0,total:0,avg:0}}),m=i.dimension(function(e){return e.Open>e.Close?"Loss":"Gain"}),f=m.group(),v=i.dimension(function(e){return Math.round((e.Close-e.Open)/e.Open*100)}),p=v.group(),y=i.dimension(function(e){var t=e.dd.getDay();return t+"."+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t]}),b=y.group();monthlyBubbleChart.width(width).height(height).transitionDuration(1500).margins({top:10,right:50,bottom:55,left:40}).dimension(d).group(l).colors(d3.schemeRdYlGn[9]).colorDomain([-500,500]).colorAccessor(function(e){return e.value.absGain}).keyAccessor(function(e){return e.value.absGain}).valueAccessor(function(e){return e.value.percentageGain}).radiusValueAccessor(function(e){return e.value.fluctuationPercentage}).maxBubbleRelativeSize(.3).x(d3.scaleLinear().domain([-2500,2500])).y(d3.scaleLinear().domain([-100,100])).r(d3.scaleLinear().domain([0,4e3])).elasticY(!0).elasticX(!0).yAxisPadding(100).xAxisPadding(500).renderHorizontalGridLines(!0).renderVerticalGridLines(!0).xAxisLabel("Crytpo Gain $").yAxisLabel("Crypto Gain %").renderLabel(!0).label(function(e){return e.key}).renderTitle(!0).title(function(e){return[e.key,"Index Gain: "+a(e.value.absGain),"Index Gain in Percentage: "+a(e.value.percentageGain)+"%","Fluctuation / Index Ratio: "+a(e.value.fluctuationPercentage)+"%"].join("\n")}).yAxis().tickFormat(function(e){return e+"%"}),gainOrLossChart.width(width).height(height).radius(80).dimension(m).group(f).label(function(e){if(gainOrLossChart.hasFilter()&&!gainOrLossChart.hasFilter(e.key))return e.key+"(0%)";var t=e.key;return u.value()&&(t+="("+Math.floor(e.value/u.value()*100)+"%)"),t}),dayOfWeekChart.width(width).height(height).margins({top:20,left:10,right:10,bottom:20}).group(b).dimension(y).ordinalColors(["#3182bd","#6baed6","#9ecae1","#c6dbef","#dadaeb"]).label(function(e){return e.key.split(".")[1]}).title(function(e){return e.value}).elasticX(!0).xAxis().ticks(4),fluctuationChart.width(width).height(height).margins({top:10,right:50,bottom:30,left:40}).dimension(v).group(p).elasticY(!0).centerBar(!0).gap(1).round(dc.round.floor).alwaysUseRounding(!0).x(d3.scaleLinear().domain([-25,25])).renderHorizontalGridLines(!0).filterPrinter(function(e){var t=e[0],n="";return n+=a(t[0])+"% -> "+a(t[1])+"%"}),fluctuationChart.xAxis().tickFormat(function(e){return e+"%"}),fluctuationChart.yAxis().ticks(5),moveChart.renderArea(!0).width(width).height(150).transitionDuration(1e3).margins({top:30,right:50,bottom:55,left:52}).dimension(s).mouseZoomable(!0).rangeChart(volumeChart).x(d3.scaleTime().domain([new Date(r),new Date(o)])).round(d3.timeMonth.round).xUnits(d3.timeMonths).elasticY(!0).renderHorizontalGridLines(!0).legend(dc.legend().x(800).y(10).itemHeight(13).gap(5)).brushOn(!1).group(g,"Monthly Index Average").valueAccessor(function(e){return e.value.avg}).stack(c,"Monthly Index Move",function(e){return e.value}).title(function(e){var n=e.value.avg?e.value.avg:e.value;return isNaN(n)&&(n=0),t(e.key)+"\n"+a(n)}),volumeChart.width(width).height(150).margins({top:0,right:50,bottom:55,left:40}).dimension(s).group(h).centerBar(!0).gap(1).x(d3.scaleTime().domain([new Date(r),new Date(o)])).round(d3.timeMonth.round).alwaysUseRounding(!0).xUnits(d3.timeMonths).yAxisLabel("Billions $"),dc.renderAll()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRjLmpzIl0sIm5hbWVzIjpbImdhaW5Pckxvc3NDaGFydCIsImRjIiwicGllQ2hhcnQiLCJmbHVjdHVhdGlvbkNoYXJ0IiwiYmFyQ2hhcnQiLCJsaW5lQ2hhcnQiLCJkYXlPZldlZWtDaGFydCIsIm1vdmVDaGFydCIsImJ1YmJsZUNoYXJ0IiwibW9udGhseUJ1YmJsZUNoYXJ0Iiwid2lkdGgiLCJDYWxjdWxhdG9yIiwiY3VycmVudCIsIm9wZXJhdG9yIiwiYnV0dG9uX3ZhbHVlIiwiZXF1YXRpb24iLCJuYXZpZ2F0b3IiLCJvbkxpbmUiLCJhbGVydCIsImQzIiwiY3N2IiwidGhlbiIsImRhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJkaXNwbGF5IiwiZGF0ZUZvcm1hdFBhcnNlciIsInRpbWVGb3JtYXQiLCJudW1iZXJGb3JtYXQiLCJmb3JtYXQiLCJkIiwibW9udGgiLCJkZCIsIkRhdGUiLCJDbG9zZSIsIk9wZW4iLCJtaW5EYXRlIiwibWluIiwibWF4RGF0ZSIsIm1heCIsIm5keCIsImNyb3NzZmlsdGVyIiwiYWxsIiwiZ3JvdXBBbGwiLCJkaW1lbnNpb24iLCJnZXRNb250aCIsIm1vbnRobHlEaW1lbnNpb24iLCJtb250aGx5UGVyZm9ybWFuY2VHcm91cCIsImdyb3VwIiwicmVkdWNlIiwicCIsInYiLCJmbHVjdHVhdGlvblBlcmNlbnRhZ2UiLCJjb3VudCIsImFic0dhaW4iLCJmbHVjdHVhdGlvbiIsImFicyIsInN1bUluZGV4IiwiYXZnSW5kZXgiLCJwZXJjZW50YWdlR2FpbiIsIm1vdmVNb250aHMiLCJtb250aGx5TW92ZUdyb3VwIiwicmVkdWNlU3VtIiwiTWF0aCIsInZvbHVtZUJ5TW9udGhHcm91cCIsImluZGV4QXZnQnlNb250aEdyb3VwIiwidG90YWwiLCJhdmciLCJkYXlzIiwicm91bmQiLCJnYWluT3JMb3NzIiwiZ2Fpbk9yTG9zc0dyb3VwIiwiZGF5T2ZXZWVrIiwiZmx1Y3R1YXRpb25Hcm91cCIsImRheU9mV2Vla0dyb3VwIiwiZGF5IiwiaGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29sb3JzIiwiY29sb3JEb21haW4iLCJsZWZ0IiwidmFsdWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF4QnViYmxlUmVsYXRpdmVTaXplIiwieUF4aXNQYWRkaW5nIiwicmVuZGVySG9yaXpvbnRhbEdyaWRMaW5lcyIsInlBeGlzTGFiZWwiLCJyYWRpdXNWYWx1ZUFjY2Vzc29yIiwicmVuZGVyVGl0bGUiLCJ0aXRsZSIsIngiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInkiLCJ5QXhpcyIsImVsYXN0aWNYIiwicmFkaXVzIiwicmVuZGVyVmVydGljYWxHcmlkTGluZXMiLCJoYXNGaWx0ZXIiLCJ4QXhpc0xhYmVsIiwicmVuZGVyTGFiZWwiLCJsYWJlbCIsImtleSIsInNwbGl0IiwidGlja0Zvcm1hdCIsInJpZ2h0IiwiY2VudGVyQmFyIiwiZmlsdGVyIiwicyIsInRpY2tzIiwiZmxvb3IiLCJyZW5kZXJBcmVhIiwib3JkaW5hbENvbG9ycyIsImxlZ2VuZCIsInN0YWNrIiwieEF4aXMiLCJtYXJnaW5zIiwidm9sdW1lQ2hhcnQiLCJnYXAiLCJhbHdheXNVc2VSb3VuZGluZyIsImZpbHRlclByaW50ZXIiLCJmaWx0ZXJzIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwibW91c2Vab29tYWJsZSIsInJhbmdlQ2hhcnQiLCJzY2FsZVRpbWUiLCJ0aW1lTW9udGgiLCJ4VW5pdHMiLCJ0aW1lTW9udGhzIiwiZWxhc3RpY1kiLCJpdGVtSGVpZ2h0IiwiYnJ1c2hPbiIsImlzTmFOIiwiZGF0ZUZvcm1hdCIsInJlbmRlckFsbCJdLCJtYXBwaW5ncyI6ImFBQUEsSUFBTUEsZ0JBQWtCQyxHQUFHQyxTQUFTLG9CQUM5QkMsaUJBQW1CRixHQUFHRyxTQUFTLHNCQUQvQkosZUFBa0JDLEdBQUdDLFNBQVMsc0JBQzlCQyxVQUFBQSxHQUFnQkUsVUFBTUQsdUJBQ3RCRSxZQUFjTCxHQUFLRyxTQUFGLHlCQUNqQkcsbUJBQWVGLEdBQVVHLFlBQUEsd0JBRXpC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QyxTQUNMeEMsSUFBSyxFQUFHNkIsTUFBTyxHQUFJNUIsT0FBUSxHQUFJRyxLQUFNLEtBRWhDckMsVUFBVWdCLEdBQ1ZaLE1BQU1nQixHQUNOMkMsV0FBVSxHQUNWWSxJQUFJLEdBQ0o1QixFQUFFekUsR0FBRzRHLFlBQVlqQyxRQUFRLElBQUk1RCxLQUFLRyxHQUFVLElBQUlILEtBQUtLLE1BQ3JEK0IsTUFBTW5ELEdBQUc2RyxVQUFVMUQsT0FDbkJtRCxtQkFBa0IsR0FDbEJRLE9BQU85RyxHQUFHK0csWUFDVjFDLFdBQVcsY0FJZHZGLEdBQUd1SSIsImZpbGUiOiJtYXJrZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnYWluT3JMb3NzQ2hhcnQgPSBkYy5waWVDaGFydCgnI2dhaW4tbG9zcy1jaGFydCcpO1xuY29uc3QgZmx1Y3R1YXRpb25DaGFydCA9IGRjLmJhckNoYXJ0KCcjZmx1Y3R1YXRpb24tY2hhcnQnKTtcbmNvbnN0IGRheU9mV2Vla0NoYXJ0ID0gZGMucm93Q2hhcnQoJyNkYXktb2Ytd2Vlay1jaGFydCcpO1xuY29uc3QgbW92ZUNoYXJ0ID0gZGMubGluZUNoYXJ0KCcjbW9udGhseS1tb3ZlLWNoYXJ0Jyk7XG5jb25zdCB2b2x1bWVDaGFydCA9IGRjLmJhckNoYXJ0KCcjbW9udGhseS12b2x1bWUtY2hhcnQnKTtcbmNvbnN0IG1vbnRobHlCdWJibGVDaGFydCA9IGRjLmJ1YmJsZUNoYXJ0KCcjeWVhcmx5LWJ1YmJsZS1jaGFydCcpO1xuXG5jb25zdCB3aWR0aCA9IDM0MDtcbmNvbnN0IGhlaWdodCA9IDMwMDtcblxubGV0IENhbGN1bGF0b3IgPSB7XG4gIGN1cnJlbnQ6IDAsXG4gIG9wZXJhdG9yOiBcIlwiLFxuICBidXR0b25fdmFsdWU6IDAsXG4gIGVxdWF0aW9uOiBcIlwiIH1cblxuLy8gQ2hlY2sgaWYgYnJvd3NlciBpcyBvZmZsaW5lXG5pZighbmF2aWdhdG9yLm9uTGluZSkge1xuICBhbGVydCgnVGhpcyB3ZWJzaXRlIG5lZWQgdG8gYmUgY29ubmVjdGVkIHRvIGludGVybmV0IGluIG9yZGVyIHRvIHdvcmsgcHJvcGVybHknKVxufVxuIFxuZDMuY3N2KCdodHRwczovL3d3dy5xdWFuZGwuY29tL2FwaS92My9kYXRhc2V0cy9CQ0hBUlRTL0NPSU5GQUxDT05FVVIuY3N2P2FwaV9rZXk9ZnphblpDMzI5N0pzaWQtRTh2Q0YnKS50aGVuKChkYXRhKSA9PiB7XG4gIFxuICAvLyBIaWRlIGxvYWRlciwgYW5kIHNob3cgc2l0ZSBjb250ZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgXG4gIC8vIEZvcm1hdCB0aGUgZGF0YVxuICBsZXQgZGF0ZUZvcm1hdFNwZWNpZmllciA9ICclWS0lbS0lZCc7XG4gIGxldCBkYXRlRm9ybWF0ID0gZDMudGltZUZvcm1hdChkYXRlRm9ybWF0U3BlY2lmaWVyKTtcbiAgbGV0IGRhdGVGb3JtYXRQYXJzZXIgPSBkMy50aW1lUGFyc2UoZGF0ZUZvcm1hdFNwZWNpZmllcik7XG4gIGxldCBudW1iZXJGb3JtYXQgPSBkMy5mb3JtYXQoJy4yZicpO1xuXG4gIGRhdGEuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICBkLmRkID0gZGF0ZUZvcm1hdFBhcnNlcihkLkRhdGUpO1xuICAgICAgICBkLm1vbnRoID0gZDMudGltZU1vbnRoKGQuZGQpOyAvLyBwcmUtY2FsY3VsYXRlIG1vbnRoXG4gICAgICAgIGQuQ2xvc2UgPSArZC5DbG9zZTsgLy8gY2hhbmdlIHRvIG51bWJlclxuICAgICAgICBkLk9wZW4gPSArZC5PcGVuO1xuICAgIH0pO1xuICAvLyBGaW5kIGZpcnN0IGFuZCBsYXN0IGRhdGVcbiAgY29uc3QgbWluRGF0ZSA9IGQzLm1pbihkYXRhLCBkID0+IGQuRGF0ZSk7XG4gIGNvbnN0IG1heERhdGUgPSBkMy5tYXgoZGF0YSwgZCA9PiBkLkRhdGUpO1xuXG4gIC8vIENyZWF0ZSBDcm9zc2ZpbHRlciBEaW1lbnNpb25zIGFuZCBHcm91cHNcbiAgbGV0IG5keCA9IGNyb3NzZmlsdGVyKGRhdGEpO1xuICBsZXQgYWxsID0gbmR4Lmdyb3VwQWxsKCk7XG5cbiAgLy8gRGltZW5zaW9uIGJ5IG1vbnRoXG4gIGxldCBtb250aGx5RGltZW5zaW9uID0gbmR4LmRpbWVuc2lvbigoZCkgPT4ge1xuICAgICAgICAgaWYgKGQuZGQuZ2V0TW9udGgoKSsxPT0xKSByZXR1cm4gIFwiSmFuIFwiXG4gICAgICAgICBpZiAoZC5kZC5nZXRNb250aCgpKzE9PTIpIHJldHVybiAgXCJGZWJcIlxuICAgICAgICAgaWYgKGQuZGQuZ2V0TW9udGgoKSsxPT0zKSByZXR1cm4gIFwiTWFyXCJcbiAgICAgICAgIGlmIChkLmRkLmdldE1vbnRoKCkrMT09NCkgcmV0dXJuICBcIkFwclwiXG4gICAgICAgICBpZiAoZC5kZC5nZXRNb250aCgpKzE9PTUpIHJldHVybiAgXCJNYXlcIlxuICAgICAgICAgaWYgKGQuZGQuZ2V0TW9udGgoKSsxPT02KSByZXR1cm4gIFwiSnVuXCJcbiAgICAgICAgIGlmIChkLmRkLmdldE1vbnRoKCkrMT09NykgcmV0dXJuICBcIkp1bFwiXG4gICAgICAgICBpZiAoZC5kZC5nZXRNb250aCgpKzE9PTgpIHJldHVybiAgXCJBdWdcIlxuICAgICAgICAgaWYgKGQuZGQuZ2V0TW9udGgoKSsxPT05KSByZXR1cm4gIFwiU2VwXCJcbiAgICAgICAgIGlmIChkLmRkLmdldE1vbnRoKCkrMT09MTApIHJldHVybiAgXCJPY3RcIlxuICAgICAgICAgaWYgKGQuZGQuZ2V0TW9udGgoKSsxPT0xMSkgcmV0dXJuICBcIk5vdlwiXG4gICAgICAgICBpZiAoZC5kZC5nZXRNb250aCgpKzE9PTEyKSByZXR1cm4gIFwiRGVjZVwiXG4gICAgfSk7XG5cbiAgLy8gTWFpbnRhaW4gcnVubmluZyB0YWxsaWVzIGJ5IG1vbnRoIGFzIGZpbHRlcnMgYXJlIGFwcGxpZWQgb3IgcmVtb3ZlZFxuICBsZXQgbW9udGhseVBlcmZvcm1hbmNlR3JvdXAgPSBtb250aGx5RGltZW5zaW9uLmdyb3VwKCkucmVkdWNlKFxuICAgIC8qIGNhbGxiYWNrIGZvciB3aGVuIGRhdGEgaXMgYWRkZWQgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIHJlc3VsdHMgKi9cbiAgICAocCwgdikgPT4ge1xuICAgICAgICAgICAgKytwLmNvdW50O1xuICAgICAgICAgICAgcC5hYnNHYWluICs9IHYuQ2xvc2UgLSB2Lk9wZW47XG4gICAgICAgICAgICBwLmZsdWN0dWF0aW9uICs9IE1hdGguYWJzKHYuQ2xvc2UgLSB2Lk9wZW4pO1xuICAgICAgICAgICAgcC5zdW1JbmRleCArPSAodi5PcGVuICsgdi5DbG9zZSkgLyAyO1xuICAgICAgICAgICAgcC5hdmdJbmRleCA9IHAuc3VtSW5kZXggLyBwLmNvdW50O1xuICAgICAgICAgICAgcC5wZXJjZW50YWdlR2FpbiA9IHAuYXZnSW5kZXggPyAocC5hYnNHYWluIC8gcC5hdmdJbmRleCkgKiAxMDAgOiAwO1xuICAgICAgICAgICAgcC5mbHVjdHVhdGlvblBlcmNlbnRhZ2UgPSBwLmF2Z0luZGV4ID8gKHAuZmx1Y3R1YXRpb24gLyBwLmF2Z0luZGV4KSAqIDEwMCA6IDA7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSxcbiAgICAvKiBjYWxsYmFjayBmb3Igd2hlbiBkYXRhIGlzIHJlbW92ZWQgZnJvbSB0aGUgY3VycmVudCBmaWx0ZXIgcmVzdWx0cyAqL1xuICAgIChwLCB2KSA9PiB7XG4gICAgICAgICAgICAtLXAuY291bnQ7XG4gICAgICAgICAgICBwLmFic0dhaW4gLT0gdi5DbG9zZSAtIHYuT3BlbjtcbiAgICAgICAgICAgIHAuZmx1Y3R1YXRpb24gLT0gTWF0aC5hYnModi5DbG9zZSAtIHYuT3Blbik7XG4gICAgICAgICAgICBwLnN1bUluZGV4IC09ICh2Lk9wZW4gKyB2LkNsb3NlKSAvIDI7XG4gICAgICAgICAgICBwLmF2Z0luZGV4ID0gcC5jb3VudCA/IHAuc3VtSW5kZXggLyBwLmNvdW50IDogMDtcbiAgICAgICAgICAgIHAucGVyY2VudGFnZUdhaW4gPSBwLmF2Z0luZGV4ID8gKHAuYWJzR2FpbiAvIHAuYXZnSW5kZXgpICogMTAwIDogMDtcbiAgICAgICAgICAgIHAuZmx1Y3R1YXRpb25QZXJjZW50YWdlID0gcC5hdmdJbmRleCA/IChwLmZsdWN0dWF0aW9uIC8gcC5hdmdJbmRleCkgKiAxMDAgOiAwO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0sXG4gICAgLyogaW5pdGlhbGl6ZSBwICovXG4gICAgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgICAgICBhYnNHYWluOiAwLFxuICAgICAgICAgICAgICAgIGZsdWN0dWF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZsdWN0dWF0aW9uUGVyY2VudGFnZTogMCxcbiAgICAgICAgICAgICAgICBzdW1JbmRleDogMCxcbiAgICAgICAgICAgICAgICBhdmdJbmRleDogMCxcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlR2FpbjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgKTtcblxuICAvLyBEaW1lbnNpb24gYnkgZnVsbCBkYXRlXG4gIGxldCBkYXRlRGltZW5zaW9uID0gbmR4LmRpbWVuc2lvbigoZCkgPT4ge1xuICAgICAgICByZXR1cm4gZC5kZDtcbiAgICB9KTtcblxuICAvLyBEaW1lbnNpb24gYnkgbW9udGhcbiAgbGV0IG1vdmVNb250aHMgPSBuZHguZGltZW5zaW9uKChkKSA9PiB7XG4gICAgICAgIHJldHVybiBkLm1vbnRoO1xuICAgIH0pO1xuICAgIC8vIEdyb3VwIGJ5IHRvdGFsIG1vdmVtZW50IHdpdGhpbiBtb250aFxuICBsZXQgbW9udGhseU1vdmVHcm91cCA9IG1vdmVNb250aHMuZ3JvdXAoKS5yZWR1Y2VTdW0oKGQpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGQuQ2xvc2UgLSBkLk9wZW4pO1xuICAgIH0pO1xuICAgIC8vIEdyb3VwIGJ5IHRvdGFsIHZvbHVtZSB3aXRoaW4gbW92ZSwgYW5kIHNjYWxlIGRvd24gcmVzdWx0XG4gIGxldCB2b2x1bWVCeU1vbnRoR3JvdXAgPSBtb3ZlTW9udGhzLmdyb3VwKCkucmVkdWNlU3VtKChkKSA9PiB7XG4gICAgICAgIHJldHVybiBkWydWb2x1bWUgKEN1cnJlbmN5KSddLzEwMDAwMDAwMFxuICAgIH0pO1xuICBsZXQgaW5kZXhBdmdCeU1vbnRoR3JvdXAgPSBtb3ZlTW9udGhzLmdyb3VwKCkucmVkdWNlKFxuICAgIChwLCB2KSA9PiB7XG4gICAgICAgICAgICArK3AuZGF5cztcbiAgICAgICAgICAgIHAudG90YWwgKz0gKHYuT3BlbiArIHYuQ2xvc2UpIC8gMjtcbiAgICAgICAgICAgIHAuYXZnID0gTWF0aC5yb3VuZChwLnRvdGFsIC8gcC5kYXlzKTtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9LFxuICAgIChwLCB2KSA9PiB7XG4gICAgICAgICAgICAtLXAuZGF5cztcbiAgICAgICAgICAgIHAudG90YWwgLT0gKHYuT3BlbiArIHYuQ2xvc2UpIC8gMjtcbiAgICAgICAgICAgIHAuYXZnID0gcC5kYXlzID8gTWF0aC5yb3VuZChwLnRvdGFsIC8gcC5kYXlzKSA6IDA7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge2RheXM6IDAsIHRvdGFsOiAwLCBhdmc6IDB9O1xuICAgICAgICB9LFxuICApO1xuXG4gIC8vIENyZWF0ZSBjYXRlZ29yaWNhbCBkaW1lbnNpb25cbiAgbGV0IGdhaW5Pckxvc3MgPSBuZHguZGltZW5zaW9uKChkKSA9PiB7XG4gICAgICAgIHJldHVybiBkLk9wZW4gPiBkLkNsb3NlID8gJ0xvc3MnIDogJ0dhaW4nO1xuICAgIH0pO1xuICAgIC8vIFByb2R1Y2UgY291bnRzIHJlY29yZHMgaW4gdGhlIGRpbWVuc2lvblxuICBsZXQgZ2Fpbk9yTG9zc0dyb3VwID0gZ2Fpbk9yTG9zcy5ncm91cCgpO1xuXG4gIC8vIERldGVybWluZSBhIGhpc3RvZ3JhbSBvZiBwZXJjZW50IGNoYW5nZXNcbiAgbGV0IGZsdWN0dWF0aW9uID0gbmR4LmRpbWVuc2lvbigoZCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgoZC5DbG9zZSAtIGQuT3BlbikgLyBkLk9wZW4gKiAxMDApO1xuICAgIH0pO1xuICBsZXQgZmx1Y3R1YXRpb25Hcm91cCA9IGZsdWN0dWF0aW9uLmdyb3VwKCk7XG5cbiAgLy8gQ291bnRzIHBlciB3ZWVrZGF5XG4gIGxldCBkYXlPZldlZWsgPSBuZHguZGltZW5zaW9uKChkKSA9PiB7XG4gICAgICAgIHZhciBkYXkgPSBkLmRkLmdldERheSgpO1xuICAgICAgICB2YXIgbmFtZSA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J107XG4gICAgICAgIHJldHVybiBkYXkgKyAnLicgKyBuYW1lW2RheV07XG4gICAgfSk7XG4gIGxldCBkYXlPZldlZWtHcm91cCA9IGRheU9mV2Vlay5ncm91cCgpO1xuXG4gIG1vbnRobHlCdWJibGVDaGFydCAvKiBkYy5idWJibGVDaGFydCgnI3llYXJseS1idWJibGUtY2hhcnQnLCAnY2hhcnRHcm91cCcpICovXG4gIC8vIChfb3B0aW9uYWxfKSBkZWZpbmUgY2hhcnQgd2lkdGgsIGBkZWZhdWx0ID0gMjAwYFxuICAgIC53aWR0aCh3aWR0aClcbiAgLy8gKF9vcHRpb25hbF8pIGRlZmluZSBjaGFydCBoZWlnaHQsIGBkZWZhdWx0ID0gMjAwYFxuICAgIC5oZWlnaHQoaGVpZ2h0KVxuICAvLyAoX29wdGlvbmFsXykgZGVmaW5lIGNoYXJ0IHRyYW5zaXRpb24gZHVyYXRpb24sIGBkZWZhdWx0ID0gNzUwYFxuICAgIC50cmFuc2l0aW9uRHVyYXRpb24oMTUwMClcbiAgICAubWFyZ2lucyh7IFxudG9wOiAxMCwgcmlnaHQ6IDUwLCBib3R0b206IDU1LCBsZWZ0OiA0MFxuIH0pXG4gICAgLmRpbWVuc2lvbihtb250aGx5RGltZW5zaW9uKVxuICAvLyBUaGUgYnViYmxlIGNoYXJ0IGV4cGVjdHMgdGhlIGdyb3VwcyBhcmUgcmVkdWNlZCB0byBtdWx0aXBsZSB2YWx1ZXMgd2hpY2ggYXJlIHVzZWRcbiAgLy8gdG8gZ2VuZXJhdGUgeCwgeSwgYW5kIHJhZGl1cyBmb3IgZWFjaCBrZXkgKGJ1YmJsZSkgaW4gdGhlIGdyb3VwXG4gICAgLmdyb3VwKG1vbnRobHlQZXJmb3JtYW5jZUdyb3VwKVxuICAvLyAoX29wdGlvbmFsXykgZGVmaW5lIGNvbG9yIGZ1bmN0aW9uIG9yIGFycmF5IGZvciBidWJibGVzOiBbQ29sb3JCcmV3ZXJdKGh0dHA6Ly9jb2xvcmJyZXdlcjIub3JnLylcbiAgICAuY29sb3JzKGQzLnNjaGVtZVJkWWxHbls5XSlcbiAgLy8gKG9wdGlvbmFsKSBkZWZpbmUgY29sb3IgZG9tYWluIHRvIG1hdGNoIHlvdXIgZGF0YSBkb21haW4gaWYgeW91IHdhbnQgdG8gYmluZCBkYXRhIG9yIGNvbG9yXG4gICAgLmNvbG9yRG9tYWluKFstNTAwLCA1MDBdKVxuICAgIC8vICMjIyMjIEFjY2Vzc29yc1xuXG4gIC8vIEFjY2Vzc29yIGZ1bmN0aW9ucyBhcmUgYXBwbGllZCB0byBlYWNoIHZhbHVlIHJldHVybmVkIGJ5IHRoZSBncm91cGluZ1xuXG4gIC8vIGAuY29sb3JBY2Nlc3NvcmAgLSB0aGUgcmV0dXJuZWQgdmFsdWUgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGAuY29sb3JzKClgIHNjYWxlIHRvIGRldGVybWluZSBhIGZpbGwgY29sb3JcbiAgICAuY29sb3JBY2Nlc3NvcigoZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWUuYWJzR2FpbjtcbiAgICAgICAgfSlcbiAgLy8gYC5rZXlBY2Nlc3NvcmAgLSB0aGUgYFhgIHZhbHVlIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBgLngoKWAgc2NhbGUgdG8gZGV0ZXJtaW5lIHBpeGVsIGxvY2F0aW9uXG4gICAgLmtleUFjY2Vzc29yKChwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcC52YWx1ZS5hYnNHYWluO1xuICAgICAgICB9KVxuICAvLyBgLnZhbHVlQWNjZXNzb3JgIC0gdGhlIGBZYCB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYC55KClgIHNjYWxlIHRvIGRldGVybWluZSBwaXhlbCBsb2NhdGlvblxuICAgIC52YWx1ZUFjY2Vzc29yKChwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcC52YWx1ZS5wZXJjZW50YWdlR2FpbjtcbiAgICAgICAgfSlcbiAgLy8gYC5yYWRpdXNWYWx1ZUFjY2Vzc29yYCAtIHRoZSB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYC5yKClgIHNjYWxlIHRvIGRldGVybWluZSByYWRpdXMgc2l6ZTtcbiAgLy8gICBieSBkZWZhdWx0IHRoaXMgbWFwcyBsaW5lYXJseSB0byBbMCwxMDBdXG4gICAgLnJhZGl1c1ZhbHVlQWNjZXNzb3IoKHApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwLnZhbHVlLmZsdWN0dWF0aW9uUGVyY2VudGFnZTtcbiAgICAgICAgfSlcbiAgICAubWF4QnViYmxlUmVsYXRpdmVTaXplKDAuMylcbiAgICAueChkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbLTI1MDAsIDI1MDBdKSlcbiAgICAueShkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbLTEwMCwgMTAwXSkpXG4gICAgLnIoZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWzAsIDQwMDBdKSlcbiAgLy8gIyMjIyMgRWxhc3RpYyBTY2FsaW5nXG5cbiAgLy8gYC5lbGFzdGljWWAgYW5kIGAuZWxhc3RpY1hgIGRldGVybWluZSB3aGV0aGVyIHRoZSBjaGFydCBzaG91bGQgcmVzY2FsZSBlYWNoIGF4aXMgdG8gZml0IHRoZSBkYXRhLlxuICAgIC5lbGFzdGljWSh0cnVlKVxuICAgIC5lbGFzdGljWCh0cnVlKVxuICAvLyBgLnlBeGlzUGFkZGluZ2AgYW5kIGAueEF4aXNQYWRkaW5nYCBhZGQgcGFkZGluZyB0byBkYXRhIGFib3ZlIGFuZCBiZWxvdyB0aGVpciBtYXggdmFsdWVzIGluIHRoZSBzYW1lIHVuaXRcbiAgLy8gZG9tYWlucyBhcyB0aGUgQWNjZXNzb3JzLlxuICAgIC55QXhpc1BhZGRpbmcoMTAwKVxuICAgIC54QXhpc1BhZGRpbmcoNTAwKVxuICAvLyAoX29wdGlvbmFsXykgcmVuZGVyIGhvcml6b250YWwgZ3JpZCBsaW5lcywgYGRlZmF1bHQ9ZmFsc2VgXG4gICAgLnJlbmRlckhvcml6b250YWxHcmlkTGluZXModHJ1ZSlcbiAgLy8gKF9vcHRpb25hbF8pIHJlbmRlciB2ZXJ0aWNhbCBncmlkIGxpbmVzLCBgZGVmYXVsdD1mYWxzZWBcbiAgICAucmVuZGVyVmVydGljYWxHcmlkTGluZXModHJ1ZSlcbiAgLy8gKF9vcHRpb25hbF8pIHJlbmRlciBhbiBheGlzIGxhYmVsIGJlbG93IHRoZSB4IGF4aXNcbiAgICAueEF4aXNMYWJlbCgnQ3J5dHBvIEdhaW4gJCcpXG4gIC8vIChfb3B0aW9uYWxfKSByZW5kZXIgYSB2ZXJ0aWNhbCBheGlzIGxhYmxlIGxlZnQgb2YgdGhlIHkgYXhpc1xuICAgIC55QXhpc0xhYmVsKCdDcnlwdG8gR2FpbiAlJylcbiAgLy8gIyMjIyMgTGFiZWxzIGFuZCAgVGl0bGVzXG5cbiAgLy8gTGFiZWxzIGFyZSBkaXNwbGF5ZWQgb24gdGhlIGNoYXJ0IGZvciBlYWNoIGJ1YmJsZS4gVGl0bGVzIGRpc3BsYXllZCBvbiBtb3VzZW92ZXIuXG4gIC8vIChfb3B0aW9uYWxfKSB3aGV0aGVyIGNoYXJ0IHNob3VsZCByZW5kZXIgbGFiZWxzLCBgZGVmYXVsdCA9IHRydWVgXG4gICAgLnJlbmRlckxhYmVsKHRydWUpXG4gICAgLmxhYmVsKChwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcC5rZXk7XG4gICAgICAgIH0pXG4gIC8vIChfb3B0aW9uYWxfKSB3aGV0aGVyIGNoYXJ0IHNob3VsZCByZW5kZXIgdGl0bGVzLCBgZGVmYXVsdCA9IGZhbHNlYFxuICAgIC5yZW5kZXJUaXRsZSh0cnVlKVxuICAgIC50aXRsZSgocCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBwLmtleSxcbiAgICAgICAgICAgICAgICAnSW5kZXggR2FpbjogJyArIG51bWJlckZvcm1hdChwLnZhbHVlLmFic0dhaW4pLFxuICAgICAgICAgICAgICAgICdJbmRleCBHYWluIGluIFBlcmNlbnRhZ2U6ICcgKyBudW1iZXJGb3JtYXQocC52YWx1ZS5wZXJjZW50YWdlR2FpbikgKyAnJScsXG4gICAgICAgICAgICAgICAgJ0ZsdWN0dWF0aW9uIC8gSW5kZXggUmF0aW86ICcgKyBudW1iZXJGb3JtYXQocC52YWx1ZS5mbHVjdHVhdGlvblBlcmNlbnRhZ2UpICsgJyUnXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpO1xuICAgICAgICB9KVxuICAvLyAjIyMjIEN1c3RvbWl6ZSBBeGVzXG5cbiAgLy8gU2V0IGEgY3VzdG9tIHRpY2sgZm9ybWF0LiBCb3RoIGAueUF4aXMoKWAgYW5kIGAueEF4aXMoKWAgcmV0dXJuIGFuIGF4aXMgb2JqZWN0LFxuICAvLyBzbyBhbnkgYWRkaXRpb25hbCBtZXRob2QgY2hhaW5pbmcgYXBwbGllcyB0byB0aGUgYXhpcywgbm90IHRoZSBjaGFydC5cbiAgICAueUF4aXMoKVxuLnRpY2tGb3JtYXQoKHYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgJyUnO1xuICAgICAgICB9KTtcblxuICAvLyAjIyMjIFBpZS9Eb251dCBDaGFydHNcblxuICBnYWluT3JMb3NzQ2hhcnQgLyogZGMucGllQ2hhcnQoJyNnYWluLWxvc3MtY2hhcnQnLCAnY2hhcnRHcm91cCcpICovXG4gICAgLy8gKF9vcHRpb25hbF8pIGRlZmluZSBjaGFydCB3aWR0aCwgYGRlZmF1bHQgPSAyMDBgXG4gICAgLndpZHRoKHdpZHRoKVxuICAgIC8vIChvcHRpb25hbCkgZGVmaW5lIGNoYXJ0IGhlaWdodCwgYGRlZmF1bHQgPSAyMDBgXG4gICAgLmhlaWdodChoZWlnaHQpXG4gICAgLy8gRGVmaW5lIHBpZSByYWRpdXNcbiAgICAucmFkaXVzKDgwKVxuICAgIC8vIFNldCBkaW1lbnNpb25cbiAgICAuZGltZW5zaW9uKGdhaW5Pckxvc3MpXG4gICAgLy8gU2V0IGdyb3VwXG4gICAgLmdyb3VwKGdhaW5Pckxvc3NHcm91cClcblxuICAgIC8vIChfb3B0aW9uYWxfKSBieSBkZWZhdWx0IHBpZSBjaGFydCB3aWxsIHVzZSBgZ3JvdXAua2V5YCBhcyBpdHMgbGFiZWwgYnV0IHlvdSBjYW4gb3ZlcndyaXRlIGl0IHdpdGggYSBjbG9zdXJlLlxuICAgIC5sYWJlbCgoZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdhaW5Pckxvc3NDaGFydC5oYXNGaWx0ZXIoKSAmJiAhZ2Fpbk9yTG9zc0NoYXJ0Lmhhc0ZpbHRlcihkLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5rZXkgKyAnKDAlKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBkLmtleTtcbiAgICAgICAgICAgIGlmIChhbGwudmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIGxhYmVsICs9ICcoJyArIE1hdGguZmxvb3IoZC52YWx1ZSAvIGFsbC52YWx1ZSgpICogMTAwKSArICclKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgICAgIH0pO1xuXG4gIGRheU9mV2Vla0NoYXJ0IC8qIGRjLnJvd0NoYXJ0KCcjZGF5LW9mLXdlZWstY2hhcnQnLCAnY2hhcnRHcm91cCcpICovXG4gICAgLndpZHRoKHdpZHRoKVxuICAgIC5oZWlnaHQoaGVpZ2h0KVxuICAgIC5tYXJnaW5zKHtcbiB0b3A6IDIwLCBsZWZ0OiAxMCwgcmlnaHQ6IDEwLCBib3R0b206IDIwXG4gfSlcbiAgICAuZ3JvdXAoZGF5T2ZXZWVrR3JvdXApXG4gICAgLmRpbWVuc2lvbihkYXlPZldlZWspXG4gIC8vIEFzc2lnbiBjb2xvcnMgdG8gZWFjaCB2YWx1ZSBpbiB0aGUgeCBzY2FsZSBkb21haW5cbiAgICAub3JkaW5hbENvbG9ycyhbJyMzMTgyYmQnLCAnIzZiYWVkNicsICcjOWVjYWUxJywgJyNjNmRiZWYnLCAnI2RhZGFlYiddKVxuICAgIC5sYWJlbCgoZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQua2V5LnNwbGl0KCcuJylbMV07XG4gICAgICAgIH0pXG4gIC8vIFRpdGxlIHNldHMgdGhlIHJvdyB0ZXh0XG4gICAgLnRpdGxlKChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSlcbiAgICAuZWxhc3RpY1godHJ1ZSlcbiAgICAueEF4aXMoKVxuLnRpY2tzKDQpO1xuXG4gIC8vICMjIyMgQmFyIENoYXJ0XG5cbiAgLy8gQ3JlYXRlIGEgYmFyIGNoYXJ0IGFuZCB1c2UgdGhlIGdpdmVuIGNzcyBzZWxlY3RvciBhcyBhbmNob3IuIFlvdSBjYW4gYWxzbyBzcGVjaWZ5XG4gIC8vIGFuIG9wdGlvbmFsIGNoYXJ0IGdyb3VwIGZvciB0aGlzIGNoYXJ0IHRvIGJlIHNjb3BlZCB3aXRoaW4uIFdoZW4gYSBjaGFydCBiZWxvbmdzXG4gIC8vIHRvIGEgc3BlY2lmaWMgZ3JvdXAgdGhlbiBhbnkgaW50ZXJhY3Rpb24gd2l0aCBzdWNoIGNoYXJ0IHdpbGwgb25seSB0cmlnZ2VyIHJlZHJhd1xuICAvLyBvbiBvdGhlciBjaGFydHMgd2l0aGluIHRoZSBzYW1lIGNoYXJ0IGdyb3VwLlxuICAvLyA8YnI+QVBJOiBbQmFyIENoYXJ0XShodHRwczovL2dpdGh1Yi5jb20vZGMtanMvZGMuanMvYmxvYi9tYXN0ZXIvd2ViL2RvY3MvYXBpLWxhdGVzdC5tZCNiYXItY2hhcnQpXG4gIGZsdWN0dWF0aW9uQ2hhcnQgLyogZGMuYmFyQ2hhcnQoJyN2b2x1bWUtbW9udGgtY2hhcnQnLCAnY2hhcnRHcm91cCcpICovXG4gICAgLndpZHRoKHdpZHRoKVxuICAgIC5oZWlnaHQoaGVpZ2h0KVxuICAgIC5tYXJnaW5zKHsgXG50b3A6IDEwLCByaWdodDogNTAsIGJvdHRvbTogMzAsIGxlZnQ6IDQwIFxufSlcbiAgICAuZGltZW5zaW9uKGZsdWN0dWF0aW9uKVxuICAgIC5ncm91cChmbHVjdHVhdGlvbkdyb3VwKVxuICAgIC5lbGFzdGljWSh0cnVlKVxuICAvLyAoX29wdGlvbmFsXykgd2hldGhlciBiYXIgc2hvdWxkIGJlIGNlbnRlciB0byBpdHMgeCB2YWx1ZS4gTm90IG5lZWRlZCBmb3Igb3JkaW5hbCBjaGFydCwgYGRlZmF1bHQ9ZmFsc2VgXG4gICAgLmNlbnRlckJhcih0cnVlKVxuICAvLyAoX29wdGlvbmFsXykgc2V0IGdhcCBiZXR3ZWVuIGJhcnMgbWFudWFsbHkgaW4gcHgsIGBkZWZhdWx0PTJgXG4gICAgLmdhcCgxKVxuICAvLyAoX29wdGlvbmFsXykgc2V0IGZpbHRlciBicnVzaCByb3VuZGluZ1xuICAgIC5yb3VuZChkYy5yb3VuZC5mbG9vcilcbiAgICAuYWx3YXlzVXNlUm91bmRpbmcodHJ1ZSlcbiAgICAueChkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbLTI1LCAyNV0pKVxuICAgIC5yZW5kZXJIb3Jpem9udGFsR3JpZExpbmVzKHRydWUpXG4gIC8vIEN1c3RvbWl6ZSB0aGUgZmlsdGVyIGRpc3BsYXllZCBpbiB0aGUgY29udHJvbCBzcGFuXG4gICAgLmZpbHRlclByaW50ZXIoKGZpbHRlcnMpID0+IHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSBmaWx0ZXJzWzBdLCBzID0gJyc7XG4gICAgICAgICAgICBzICs9IG51bWJlckZvcm1hdChmaWx0ZXJbMF0pICsgJyUgLT4gJyArIG51bWJlckZvcm1hdChmaWx0ZXJbMV0pICsgJyUnO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0pO1xuXG4gIC8vIEN1c3RvbWl6ZSBheGVzXG4gIGZsdWN0dWF0aW9uQ2hhcnQueEF4aXMoKS50aWNrRm9ybWF0KFxuICAgICh2KSA9PiB7IHJldHVybiB2ICsgJyUnOyB9XG4pO1xuICBmbHVjdHVhdGlvbkNoYXJ0LnlBeGlzKCkudGlja3MoNSk7XG5cbiAgLy8gIyMjIyBTdGFja2VkIEFyZWEgQ2hhcnRcblxuICAvLyBTcGVjaWZ5IGFuIGFyZWEgY2hhcnQgYnkgdXNpbmcgYSBsaW5lIGNoYXJ0IHdpdGggYC5yZW5kZXJBcmVhKHRydWUpYC5cbiAgLy8gPGJyPkFQSTogW1N0YWNrIE1peGluXShodHRwczovL2dpdGh1Yi5jb20vZGMtanMvZGMuanMvYmxvYi9tYXN0ZXIvd2ViL2RvY3MvYXBpLWxhdGVzdC5tZCNzdGFjay1taXhpbiksXG4gIC8vIFtMaW5lIENoYXJ0XShodHRwczovL2dpdGh1Yi5jb20vZGMtanMvZGMuanMvYmxvYi9tYXN0ZXIvd2ViL2RvY3MvYXBpLWxhdGVzdC5tZCNsaW5lLWNoYXJ0KVxuICBtb3ZlQ2hhcnQgLyogZGMubGluZUNoYXJ0KCcjbW9udGhseS1tb3ZlLWNoYXJ0JywgJ2NoYXJ0R3JvdXAnKSAqL1xuICAgIC5yZW5kZXJBcmVhKHRydWUpXG4gICAgLndpZHRoKHdpZHRoKVxuICAgIC5oZWlnaHQoMTUwKVxuICAgIC50cmFuc2l0aW9uRHVyYXRpb24oMTAwMClcbiAgICAubWFyZ2lucyh7XG4gdG9wOiAzMCwgcmlnaHQ6IDUwLCBib3R0b206IDU1LCBsZWZ0OiA1MiBcbn0pXG4gICAgLmRpbWVuc2lvbihtb3ZlTW9udGhzKVxuICAgIC5tb3VzZVpvb21hYmxlKHRydWUpXG4gICAgLy8gU3BlY2lmeSBhIFwicmFuZ2UgY2hhcnRcIiB0byBsaW5rIGl0cyBicnVzaCBleHRlbnQgd2l0aCB0aGUgem9vbSBvZiB0aGUgY3VycmVudCBcImZvY3VzIGNoYXJ0XCIuXG4gICAgLnJhbmdlQ2hhcnQodm9sdW1lQ2hhcnQpXG4gICAgLngoZDMuc2NhbGVUaW1lKCkuZG9tYWluKFtuZXcgRGF0ZShtaW5EYXRlKSwgbmV3IERhdGUobWF4RGF0ZSldKSlcbiAgICAucm91bmQoZDMudGltZU1vbnRoLnJvdW5kKVxuICAgIC54VW5pdHMoZDMudGltZU1vbnRocylcbiAgICAuZWxhc3RpY1kodHJ1ZSlcbiAgICAucmVuZGVySG9yaXpvbnRhbEdyaWRMaW5lcyh0cnVlKVxuICAgIFxuXG4gICAgLy8gIyMjIyMgTGVnZW5kXG5cbiAgLy8gUG9zaXRpb24gdGhlIGxlZ2VuZCByZWxhdGl2ZSB0byB0aGUgY2hhcnQgb3JpZ2luIGFuZCBzcGVjaWZ5IGl0ZW1zJyBoZWlnaHQgYW5kIHNlcGFyYXRpb24uXG4gICAgLmxlZ2VuZChkYy5sZWdlbmQoKS54KDgwMCkueSgxMCkuaXRlbUhlaWdodCgxMylcbi5nYXAoNSkpXG4gICAgLmJydXNoT24oZmFsc2UpXG4gIC8vIEFkZCB0aGUgYmFzZSBsYXllciBvZiB0aGUgc3RhY2sgd2l0aCBncm91cC4gVGhlIHNlY29uZCBwYXJhbWV0ZXIgc3BlY2lmaWVzIGEgc2VyaWVzIG5hbWUgZm9yIHVzZSBpbiB0aGVcbiAgLy8gbGVnZW5kLlxuICAvLyBUaGUgYC52YWx1ZUFjY2Vzc29yYCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBiYXNlIGxheWVyXG4gICAgLmdyb3VwKGluZGV4QXZnQnlNb250aEdyb3VwLCAnTW9udGhseSBJbmRleCBBdmVyYWdlJylcbiAgICAudmFsdWVBY2Nlc3NvcigoZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWUuYXZnO1xuICAgICAgICB9KVxuICAvLyBTdGFjayBhZGRpdGlvbmFsIGxheWVycyB3aXRoIGAuc3RhY2tgLiBUaGUgZmlyc3QgcGFyYW1lbnRlciBpcyBhIG5ldyBncm91cC5cbiAgLy8gVGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgdGhlIHNlcmllcyBuYW1lLiBUaGUgdGhpcmQgaXMgYSB2YWx1ZSBhY2Nlc3Nvci5cbiAgICAuc3RhY2sobW9udGhseU1vdmVHcm91cCwgJ01vbnRobHkgSW5kZXggTW92ZScsIChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSlcbiAgLy8gVGl0bGUgY2FuIGJlIGNhbGxlZCBieSBhbnkgc3RhY2sgbGF5ZXIuXG4gICAgLnRpdGxlKChkKSA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkLnZhbHVlLmF2ZyA/IGQudmFsdWUuYXZnIDogZC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0ZUZvcm1hdChkLmtleSkgKyAnXFxuJyArIG51bWJlckZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gIC8vICMjIyMgUmFuZ2UgQ2hhcnRcblxuICAvLyBTaW5jZSB0aGlzIGJhciBjaGFydCBpcyBzcGVjaWZpZWQgYXMgXCJyYW5nZSBjaGFydFwiIGZvciB0aGUgYXJlYSBjaGFydCwgaXRzIGJydXNoIGV4dGVudFxuICAvLyB3aWxsIGFsd2F5cyBtYXRjaCB0aGUgem9vbSBvZiB0aGUgYXJlYSBjaGFydC5cbiAgdm9sdW1lQ2hhcnQud2lkdGgod2lkdGgpIC8qIGRjLmJhckNoYXJ0KCcjbW9udGhseS12b2x1bWUtY2hhcnQnLCAnY2hhcnRHcm91cCcpOyAqL1xuICAgIC5oZWlnaHQoMTUwKVxuICAgIC5tYXJnaW5zKHsgXG50b3A6IDAsIHJpZ2h0OiA1MCwgYm90dG9tOiA1NSwgbGVmdDogNDBcbiB9KVxuICAgIC5kaW1lbnNpb24obW92ZU1vbnRocylcbiAgICAuZ3JvdXAodm9sdW1lQnlNb250aEdyb3VwKVxuICAgIC5jZW50ZXJCYXIodHJ1ZSlcbiAgICAuZ2FwKDEpXG4gICAgLngoZDMuc2NhbGVUaW1lKCkuZG9tYWluKFtuZXcgRGF0ZShtaW5EYXRlKSwgbmV3IERhdGUobWF4RGF0ZSldKSlcbiAgICAucm91bmQoZDMudGltZU1vbnRoLnJvdW5kKVxuICAgIC5hbHdheXNVc2VSb3VuZGluZyh0cnVlKVxuICAgIC54VW5pdHMoZDMudGltZU1vbnRocylcbiAgICAueUF4aXNMYWJlbCgnQmlsbGlvbnMgJCcpXG5cbiAgLy8gIyMjIyBSZW5kZXJpbmdcblxuICBkYy5yZW5kZXJBbGwoKTtcbn0pO1xuIl19
