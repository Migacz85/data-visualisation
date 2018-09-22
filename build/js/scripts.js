"use strict";var width=400,height=200,marginBottom=50,chartColor="rgb(66, 170, 143)",font="Didact Gothic",fontSize="10",bgcolor="white",setDate="2017-05-01",startDate="&start_date="+setDate,bitcoinPriceData="https://www.quandl.com/api/v3/datasets/BITSTAMP/USD.csv?api_key=fzanZC3297Jsid-E8vCF"+startDate,etherPriceData="https://www.quandl.com/api/v3/datasets/GDAX/ETH_EUR.csv?api_key=fzanZC3297Jsid-E8vCF"+startDate,litecoinPriceData="https://www.quandl.com/api/v3/datasets/GDAX/LTC_EUR.csv?api_key=fzanZC3297Jsid-E8vCF"+startDate;
"use strict";
"use strict";drawPriceChart(etherPriceData,"#ether",width,height,"Euro"),drawPriceChart(bitcoinPriceData,"#bitcoin",width,height,"$"),drawPriceChart(litecoinPriceData,"#litecoin",width,height,"Euro"),drawVarPriceChart(etherPriceData,"#ether-var",width,height,"Euro"),drawVarPriceChart(bitcoinPriceData,"#bitcoin-var",width,height,"$"),drawVarPriceChart(litecoinPriceData,"#litecoin-var",width,height,"Euro");
"use strict";function drawPriceChart(t,n,e,r,a){queue().defer(d3.csv,t).await(function(t,o){t&&console.log(t);var i,c,l,s,u=n.substr(1);u.toString(),document.getElementById(u).innerHTML="<p>".concat(o[0].Low," ").concat(a," </p>"),i=d3.max(o,function(t){return+t.High}),c=d3.min(o,function(t){return+t.High}),l=d3.min(o,function(t){return t.Date}),s=d3.max(o,function(t){return t.Date});var d=d3.time.scale().domain([new Date(l),new Date(s)]).range([10,e-41]),f=d3.svg.axis().scale(d),g=d3.scale.linear().domain([0,i-c]).range([0,r-10-marginBottom]),m=d3.select(n).append("svg").attr("width",e).attr("height",r).style("background-color",bgcolor);d3.transition().duration(4500);console.log(o.length),m.selectAll("rect").data(o).enter().append("rect").attr("x",function(t,n){return e-e/o.length-n*((e-50)/o.length)}).attr("y",function(t){return r-marginBottom-g(t.High-c)}).attr("height",function(t){return g(t.High-c)}).attr("width",function(t){return e/o.length}).style("fill","white").append("svg:title").text(function(t){return"Date: ".concat(t.Date," Price: ").concat(t.High)}).append("g"),m.selectAll("rect").transition().duration(1500).style("fill",chartColor),m.selectAll("text").data(o).enter().append("text").text(function(t,n){return parseInt(c+.1*n*(i-c))}).attr("text-anchor","middle").attr("x",function(){return 20}).attr("y",function(t,n){return r-marginBottom-fontSize+parseInt(fontSize)-n*((r-marginBottom-fontSize)/10)}).attr("font-family",font).attr("font-size",fontSize).attr("fill","black");var h=r-marginBottom;m.append("g").attr("class","x axis").attr("transform","translate(40,"+h+")").call(f).selectAll("text").attr("y",0).attr("x",9).attr("dy",".35em").attr("transform","rotate(90)").attr("font-size",fontSize).style("text-anchor","start")})}
"use strict";function drawVarPriceChart(t,n,e,r,a){queue().defer(d3.csv,t).await(function(t,o){t&&console.log(t);var i,c,l,u,d=n.substr(1);d.toString(),document.getElementById(d).innerHTML="<p>".concat(o[0].Open," ").concat(a," </p>"),i=d3.max(o,function(t){return+t.High-t.Low}),c=d3.min(o,function(t){return+t.High-t.Low});var s=d3.mean(o,function(t){return+t.High-t.Low});l=d3.min(o,function(t){return t.Date}),u=d3.max(o,function(t){return t.Date}),s=s.toFixed(0),i=i.toFixed(0),document.getElementById(d).innerHTML=" <p> Max: ".concat(i," Average: ").concat(s," ").concat(a," </p>");var f=d3.time.scale().domain([new Date(l),new Date(u)]).range([10,e-41]),g=d3.svg.axis().scale(f),m=d3.scale.linear().domain([0,i-c]).range([0,r-10-marginBottom]),h=d3.select(n).append("svg").attr("width",e).attr("height",r).style("background-color",bgcolor);h.selectAll("rect").data(o).enter().append("rect").attr("x",function(t,n){return e+0-e/o.length-n*((e-50)/o.length)}).attr("y",function(t){return r-marginBottom-m(t.High-t.Low)}).attr("height",function(t){return m(t.High-t.Low)}).attr("width",function(t){return e/o.length}).style("fill","white"),h.selectAll("rect").transition().duration(1500).style("fill",chartColor).transition().duration(3e3).style("fill",function(t){return t.High-t.Low>s?"orange":chartColor}),h.selectAll("text").data(o).enter().append("text").text(function(t,n){return parseInt(c+.1*n*(i-c))}).attr("text-anchor","middle").attr("x",function(){return 20}).attr("y",function(t,n){return r-marginBottom-n*((r-marginBottom-fontSize)/10)}).attr("font-family",font).attr("font-size",fontSize).attr("fill","black");var x=r-marginBottom;h.append("g").attr("class","x axis").attr("transform","translate(40,"+x+")").call(g).selectAll("text").attr("y",0).attr("x",9).attr("dy",".35em").attr("transform","rotate(90)").attr("font-size",fontSize).style("text-anchor","start")})}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXJ0LXNldHRpbmdzLWFuZC1kYXRhLmpzIiwiY3Jvc3NmaWx0ZXIuanMiLCJkcmF3LWNoYXJ0LmpzIiwiZnVuY3Rpb25zL2RyYXdQcmljZUNoYXJ0LmpzIiwiZnVuY3Rpb25zL2RyYXdWYXJQcmljZUNoYXJ0LmpzIl0sIm5hbWVzIjpbIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luQm90dG9tIiwiY2hhcnRDb2xvciIsImZvbnQiLCJzZXREYXRlIiwic3RhcnREYXRlIiwibGl0ZWNvaW5QcmljZURhdGEiLCJldGhlclByaWNlRGF0YSIsImRyYXdQcmljZUNoYXJ0IiwiYml0Y29pblByaWNlRGF0YSIsImRyYXdWYXJQcmljZUNoYXJ0IiwiZGF0YSIsImlkIiwiY3VycmVuY3kiLCJxdWV1ZSIsImRlZmVyIiwiZDMiLCJjc3YiLCJhd2FpdCIsImNvbnNvbGUiLCJlcnJvciIsInRyYW5zYWN0aW9uc0RhdGEiLCJsb2ciLCJtYXgiLCJtaW4iLCJmaXJzdERhdGUiLCJsYXN0RGF0ZSIsImEiLCJzdWJzdHIiLCJ0b1N0cmluZyIsImlubmVySFRNTCIsIkxvdyIsIkhpZ2giLCJkIiwiRGF0ZSIsIngiLCJzY2FsZSIsImRvbWFpbiIsInhBeGlzIiwic3ZnIiwiYXhpcyIsImxpbmVhciIsInJhbmdlIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInN0eWxlIiwiZHVyYXRpb24iLCJsZW5ndGgiLCJzZWxlY3RBbGwiLCJlbnRlciIsInBhcnNlSW50IiwiaSIsInRleHQiLCJjb25jYXQiLCJ0cmFuc2l0aW9uIiwiZm9udFNpemUiLCJ0bXAiLCJjYWxsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIk9wZW4iLCJhdmciLCJtZWFuIiwidG9GaXhlZCIsImJnY29sb3IiXSwibWFwcGluZ3MiOiJhQUFBLElBQUFBLE1BQUEsSUFDQUMsT0FBQSxJQUNNRCxhQUFOLEdBQ01DLFdBQU4sb0JBQ01DLEtBQUFBLGdCQUNBQyxTQUFXLEtBQ1hDLFFBQU8sUUFLVEMsUUFBTyxh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TUFBS0QsTUFBQSxPQUFVOUMsWUFQdkJ1RCxhQVhDUixTQUFTLEtBMEJMRCxNQUFJVyxPQUFJekQsU0FBT0MsR0FFZnNDLE9BQUlLLEVBQUFBLEtBQU9YLEVBQVhGLElBQ0srQixFQWFYLFNBckNjNUQsYUFNYnFDLEVBQUlVLFVBQVUsUUFDWHRDLEtBQUtVLEdBQ0w2QixRQUNBTixPQUFPLFFBQ1BTLEtBQUssU0FBQ3BCLEVBQUdtQixHQUFKLE9BQVVELFNBQVMzQixFQUEwQixHQUFKNEIsR0FBZDdCLEVBQU1DLE1BQ3RDcUIsS0FBSyxjQUFlLFVBQ3BCQSxLQUFLLElBQUssV0FBQSxPQUFNLEtBQ2hCQSxLQUFLLElBQUssU0FBQ1osRUFBR21CLEdBQUosT0FBVXBELEVBQVNDLGFBQWdCbUQsSUFBTXBELEVBQU9DLGFBQWF1RCxVQUFZLE1BQ25GWCxLQUFLLGNBQWUxQyxNQUNwQjBDLEtBQUssWUFBYVcsVUFDbEJYLEtBQUssT0FBUSxTQUtYLElBQUlZLEVBQUl6RCxFQUFPQyxhQUVmc0MsRUFBSUssT0FBTyxLQUNYQyxLQUFLLFFBQVMsVUFDZEEsS0FBSyxZQUFhLGdCQUFrQlksRUFBTSxLQUMxQ0MsS0FBS3BCLEdBQ0xXLFVBQVUsUUFDVkosS0FBSyxJQUFLLEdBQ1ZBLEtBQUssSUFBSyxHQUNWQSxLQUFLLEtBQU0sU0FDWEEsS0FBSyxZQUFhLGNBQ2xCQSxLQUFLLFlBQWFXLFVBQ2xCVixNQUFNLGNBQWUiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgamF2YXNjcmlwdCBmaWxlIGlzIGxvYWRlZCBmaXJzdC5cbi8vIENoYXJ0cyBjb25maWdcbmNvbnN0IHdpZHRoID0gNDAwO1xuY29uc3QgaGVpZ2h0ID0gMjAwO1xuY29uc3QgbWFyZ2luQm90dG9tPTUwO1xuY29uc3QgY2hhcnRDb2xvcj0ncmdiKDY2LCAxNzAsIDE0MyknO1xuY29uc3QgZm9udCA9ICdEaWRhY3QgR290aGljJztcbmNvbnN0IGZvbnRTaXplID0gJzEwJztcbmNvbnN0IGJnY29sb3I9J3doaXRlJztcblxuXG5sZXQgc2V0RGF0ZT0nMjAxNy0wNS0wMSdcbmxldCBzdGFydERhdGU9JyZzdGFydF9kYXRlPScrc2V0RGF0ZVxuXG5cbi8vIERhdGFcbmxldCBiaXRjb2luUHJpY2VEYXRhPSdodHRwczovL3d3dy5xdWFuZGwuY29tL2FwaS92My9kYXRhc2V0cy9CSVRTVEFNUC9VU0QuY3N2P2FwaV9rZXk9ZnphblpDMzI5N0pzaWQtRTh2Q0YnK3N0YXJ0RGF0ZTtcbmxldCBldGhlclByaWNlRGF0YT0naHR0cHM6Ly93d3cucXVhbmRsLmNvbS9hcGkvdjMvZGF0YXNldHMvR0RBWC9FVEhfRVVSLmNzdj9hcGlfa2V5PWZ6YW5aQzMyOTdKc2lkLUU4dkNGJytzdGFydERhdGU7XG5sZXQgbGl0ZWNvaW5QcmljZURhdGE9J2h0dHBzOi8vd3d3LnF1YW5kbC5jb20vYXBpL3YzL2RhdGFzZXRzL0dEQVgvTFRDX0VVUi5jc3Y/YXBpX2tleT1memFuWkMzMjk3SnNpZC1FOHZDRicrc3RhcnREYXRlO1xuIiwiLy8gLy8gRVRIL0VVUlxuLy8gLy8gaHR0cHM6Ly93d3cucXVhbmRsLmNvbS9hcGkvdjMvZGF0YXNldHMvR0RBWC9FVEhfRVVSLmNzdj9hcGlfa2V5PWZ6YW5aQzMyOTdKc2lkLUU4dkNGJnN0YXJ0X2RhdGU9MjAxNy0wNi0xMlxuXG4vLyAvLyBmb3IgdGhpcyBzY3JpcHQgc2hvdWxkIGJlIGluIGZvbGxvd2luZyBleGFtcGxlXG4vLyAvLyB2YXIgdHJhbnNhY3Rpb25zRGF0YSA9IFtcbi8vIC8vICAgICB7XCJuYW1lXCI6IFwiVG9tXCIsIFwic3RvcmVcIjogXCJBY21lXCIsIFwic3RhdGVcIjogXCJOWVwiLCBcInNwZW5kXCI6IDEwMH0sXG4vLyAvLyAgICAge1wibmFtZVwiOiBcIlRvbVwiLCBcInN0b3JlXCI6IFwiQmlnIENvLlwiLCBcInN0YXRlXCI6IFwiTllcIiwgXCJzcGVuZFwiOiAyMDB9LFxuLy8gLy8gICAgIHtcIm5hbWVcIjogXCJCb2JcIiwgXCJzdG9yZVwiOiBcIkFjbWVcIiwgXCJzdGF0ZVwiOiBcIkZMXCIsIFwic3BlbmRcIjogMTUwfSxcbi8vIC8vICAgICB7XCJuYW1lXCI6IFwiQm9iXCIsIFwic3RvcmVcIjogXCJBY21lXCIsIFwic3RhdGVcIjogXCJOWVwiLCBcInNwZW5kXCI6IDIwMH0sXG4vLyAvLyAgICAge1wibmFtZVwiOiBcIkJvYlwiLCBcInN0b3JlXCI6IFwiQmlnIENvLlwiLCBcInN0YXRlXCI6IFwiRkxcIiwgXCJzcGVuZFwiOiA1MH0sXG4vLyAvLyAgICAge1wibmFtZVwiOiBcIkJvYlwiLCBcInN0b3JlXCI6IFwiQmlnIENvLlwiLCBcInN0YXRlXCI6IFwiTllcIiwgXCJzcGVuZFwiOiA3NX0sXG4vLyAvLyAgICAge1wibmFtZVwiOiBcIkFsaWNlXCIsIFwic3RvcmVcIjogXCJBY21lXCIsIFwic3RhdGVcIjogXCJGTFwiLCBcInNwZW5kXCI6IDIwMH0sXG4vLyAvLyAgICAge1wibmFtZVwiOiBcIkFsaWNlXCIsIFwic3RvcmVcIjogXCJCaWcgQ28uXCIsIFwic3RhdGVcIjogXCJOWVwiLCBcInNwZW5kXCI6IDM1MH0sXG4vLyAvLyBdO1xuXG5cbi8vIHF1ZXVlKClcbi8vICAgICAuZGVmZXIoZDMuY3N2LCBiaXRjb2luUHJpY2VEYXRhKVxuLy8gICAgIC5hd2FpdChtYWtlR3JhcGgyKTtcblxuXG4vLyAgZnVuY3Rpb24gbWFrZUdyYXBoMihlcnJvciwgdHJhbnNhY3Rpb25zRGF0YSkge1xuXG4vLyAgICAgY29uc29sZS5sb2codHJhbnNhY3Rpb25zRGF0YSlcbi8vICAgICAgICAgdmFyIG5keCA9IGNyb3NzZmlsdGVyKHRyYW5zYWN0aW9uc0RhdGEpO1xuLy8gICAgICAgICB2YXIgcGFyc2VEYXRlID0gZDMudGltZS5mb3JtYXQoXCIlZC8lbS8lWVwiKS5wYXJzZTtcbi8vICAgICAgICAgdHJhbnNhY3Rpb25zRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpe1xuLy8gICAgICAgICAgICAgZC5kYXRlID0gcGFyc2VEYXRlKGQuZGF0ZSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB2YXIgZGF0ZV9kaW0gPSBuZHguZGltZW5zaW9uKGRjLnBsdWNrKCdkYXRlJykpO1xuLy8gICAgICAgICB2YXIgdG90YWxfc3BlbmRfcGVyX2RhdGUgPSBkYXRlX2RpbS5ncm91cCgpLnJlZHVjZVN1bShkYy5wbHVjaygnc3BlbmQnKSk7XG4vLyAgICAgICAgIHZhciBtaW5EYXRlID0gZGF0ZV9kaW0uYm90dG9tKDEpWzBdLmRhdGU7XG4vLyAgICAgICAgIHZhciBtYXhEYXRlID0gZGF0ZV9kaW0udG9wKDEpWzBdLmRhdGU7XG4vLyAgICAgICAgIGRjLmxpbmVDaGFydChcIiNldGhlclwiKVxuLy8gICAgICAgICAgICAgLndpZHRoKDEwMDApXG4vLyAgICAgICAgICAgICAuaGVpZ2h0KDMwMClcbi8vICAgICAgICAgICAgIC5tYXJnaW5zKHt0b3A6IDEwLCByaWdodDogNTAsIGJvdHRvbTogMzAsIGxlZnQ6IDUwfSlcbi8vICAgICAgICAgICAgIC5kaW1lbnNpb24oZGF0ZV9kaW0pXG4vLyAgICAgICAgICAgICAuZ3JvdXAodG90YWxfc3BlbmRfcGVyX2RhdGUpXG4vLyAgICAgICAgICAgICAudHJhbnNpdGlvbkR1cmF0aW9uKDUwMClcbi8vICAgICAgICAgICAgIC54KGQzLnRpbWUuc2NhbGUoKS5kb21haW4oW21pbkRhdGUsbWF4RGF0ZV0pKVxuLy8gICAgICAgICAgICAgLnhBeGlzTGFiZWwoXCJNb250aFwiKVxuLy8gICAgICAgICAgICAgLnlBeGlzKCkudGlja3MoNCk7XG4vLyAgICAgICAgIGRjLnJlbmRlckFsbCgpO1xuLy8gICAgIH0iLCIvLyBUaGlzIGphdmFzY3JpcHQgZmlsZSBpcyBsYXN0LlxuXG5kcmF3UHJpY2VDaGFydChldGhlclByaWNlRGF0YSwnI2V0aGVyJyx3aWR0aCxoZWlnaHQsIFwiRXVyb1wiKTtcbmRyYXdQcmljZUNoYXJ0KGJpdGNvaW5QcmljZURhdGEsJyNiaXRjb2luJyx3aWR0aCxoZWlnaHQsIFwiJFwiKTtcbmRyYXdQcmljZUNoYXJ0KGxpdGVjb2luUHJpY2VEYXRhLCcjbGl0ZWNvaW4nLHdpZHRoLGhlaWdodCwgXCJFdXJvXCIpO1xuXG5kcmF3VmFyUHJpY2VDaGFydChldGhlclByaWNlRGF0YSwnI2V0aGVyLXZhcicsd2lkdGgsaGVpZ2h0LCBcIkV1cm9cIik7XG5kcmF3VmFyUHJpY2VDaGFydChiaXRjb2luUHJpY2VEYXRhLCcjYml0Y29pbi12YXInLHdpZHRoLGhlaWdodCwgXCIkXCIpO1xuZHJhd1ZhclByaWNlQ2hhcnQobGl0ZWNvaW5QcmljZURhdGEsJyNsaXRlY29pbi12YXInLHdpZHRoLGhlaWdodCwgXCJFdXJvXCIpOyIsIi8vIFByaWNlXG5cbmZ1bmN0aW9uIGRyYXdQcmljZUNoYXJ0KGRhdGEsIGlkLCB3aWR0aCwgaGVpZ2h0LCBjdXJyZW5jeSkge1xuXG4gIHF1ZXVlKClcbiAgICAuZGVmZXIoZDMuY3N2LCBkYXRhKVxuICAgIC5hd2FpdChtYWtlR3JhcGhzKTtcblxuICBmdW5jdGlvbiBtYWtlR3JhcGhzKGVycm9yLCB0cmFuc2FjdGlvbnNEYXRhKSB7XG4gICAgaWYgKGVycm9yKSB7IGNvbnNvbGUubG9nKGVycm9yKTsgfVxuICAgIGNvbnN0IGEgPSBpZC5zdWJzdHIoMSk7XG4gICAgYS50b1N0cmluZygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpLmlubmVySFRNTCA9IGA8cD4ke3RyYW5zYWN0aW9uc0RhdGFbMF0uTG93fSAke2N1cnJlbmN5fSA8L3A+YDtcblxuICAgIGxldCBtYXg7IFxuICAgIGxldCBtaW47XG4gICAgbGV0IGZpcnN0RGF0ZTtcbiAgICBsZXQgbGFzdERhdGU7XG5cbiAgICBtYXggPSBkMy5tYXgodHJhbnNhY3Rpb25zRGF0YSwgZCA9PiArZC5IaWdoKTtcbiAgICBtaW4gPSBkMy5taW4odHJhbnNhY3Rpb25zRGF0YSwgZCA9PiArZC5IaWdoKTtcbiAgICBmaXJzdERhdGUgPSBkMy5taW4odHJhbnNhY3Rpb25zRGF0YSwgZCA9PiBkLkRhdGUpO1xuICAgIGxhc3REYXRlID0gZDMubWF4KHRyYW5zYWN0aW9uc0RhdGEsIGQgPT4gZC5EYXRlKTtcbiAgICBcbiAgICBcbiAgICBsZXQgeCA9IGQzLnRpbWUuc2NhbGUoKVxuICAgICAgLmRvbWFpbihbbmV3IERhdGUoZmlyc3REYXRlKSwgbmV3IERhdGUobGFzdERhdGUpXSlcbiAgICAgIC5yYW5nZShbMTAsIHdpZHRoLTQxXSk7ICAgLy8gTGVmdCByaWdodCBwb3NpdGlvbiBmb3IgZGF0ZSBjaGFydFxuXG4gICAgbGV0IHhBeGlzID0gZDMuc3ZnLmF4aXMoKVxuICAgICAgLnNjYWxlKHgpO1xuXG5cbiAgICBjb25zdCBzY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAuZG9tYWluKFswLCBtYXggLSBtaW4gXSkgLy8gQm91bmRhcmllcyBmb3IgY2hhcnRcbiAgICAgIC5yYW5nZShbMCwgaGVpZ2h0IC0gMTAgLSBtYXJnaW5Cb3R0b21dKTsgLy8gYm91bmRhcmllcyBmb3IgZGF0YVxuXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KGlkKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGJnY29sb3IpXG4gICAgICAvLyAuY2FsbChkMy5iZWhhdmlvci56b29tKCkub24oXCJ6b29tXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgc3ZnLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBkMy5ldmVudC50cmFuc2xhdGUgKyBcIilcIiArIFwiIHNjYWxlKFwiICsgZDMuZXZlbnQuc2NhbGUgKyBcIilcIilcbiAgICAgIC8vIH0pKVxuICAgICAgLy8uYXBwZW5kKFwiZ1wiKVxuICAgICAgbGV0IHQ9ZDNcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig0NTAwKVxuXG5cbiAgICAgIGNvbnNvbGUubG9nKHRyYW5zYWN0aW9uc0RhdGEubGVuZ3RoKVxuICAgXG4gICAgLy8gQmFyc1xuICAgIHN2Zy5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEodHJhbnNhY3Rpb25zRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdyZWN0JykgLy8gYXBwZW5kIHN2ZyB0byBkaXZcbiAgICAgIFxuICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4gd2lkdGggLSB3aWR0aCAvIHRyYW5zYWN0aW9uc0RhdGEubGVuZ3RoIC0gKGkgKiAoKHdpZHRoIC0gNTApIC8gdHJhbnNhY3Rpb25zRGF0YS5sZW5ndGgpKSlcbiAgICAgIC5hdHRyKCd5JywgZCA9PiBoZWlnaHQgLSBtYXJnaW5Cb3R0b20gLSBzY2FsZShkLkhpZ2ggLSBtaW4pKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4gc2NhbGUoZC5IaWdoIC0gbWluKSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIGQgPT4gd2lkdGggLyB0cmFuc2FjdGlvbnNEYXRhLmxlbmd0aClcbiAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAuYXBwZW5kKCdzdmc6dGl0bGUnKVxuICAgICAgLnRleHQoZCA9PiBgRGF0ZTogJHtkLkRhdGV9IFByaWNlOiAke2QuSGlnaH1gKVxuICAgICAgLmFwcGVuZChcImdcIik7XG4gICBcbiAgICAgIFxuICAgICAgc3ZnLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTUwMClcbiAgICAgIC5zdHlsZShcImZpbGxcIixjaGFydENvbG9yKTtcbiAgICAgXG4gICAgICBcbiAgICAvLyBQcmljZVxuICAgIHN2Zy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgLmRhdGEodHJhbnNhY3Rpb25zRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC50ZXh0KChkLCBpKSA9PiBwYXJzZUludChtaW4gKyAoKG1heCAtIG1pbikgKiAoaSAqIDAuMSkpKSlcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmF0dHIoJ3gnLCAoKSA9PiAyMClcbiAgICAgIC5hdHRyKCd5JywgKGQsIGkpID0+IGhlaWdodC1tYXJnaW5Cb3R0b20tZm9udFNpemUgKyBwYXJzZUludChmb250U2l6ZSkgLSAoaSAqICgoaGVpZ2h0LW1hcmdpbkJvdHRvbS1mb250U2l6ZSkgLyAxMCkpKVxuICAgICAgLmF0dHIoJ2ZvbnQtZmFtaWx5JywgZm9udClcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCBmb250U2l6ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ2JsYWNrJyk7XG5cbiAgICAgLy8gRGF0ZVxuICAgICAgICAgbGV0IHRtcD1oZWlnaHQtbWFyZ2luQm90dG9tO1xuICAgICAgICAgXG4gICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDQwLFwiICsgdG1wICsgXCIpXCIpXG4gICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcInlcIiwgMClcbiAgICAgICAgLmF0dHIoXCJ4XCIsIDkpXG4gICAgICAgIC5hdHRyKFwiZHlcIiwgXCIuMzVlbVwiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSg5MClcIilcbiAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsIGZvbnRTaXplKVxuICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpO1xuXG5cbi8vIC8vIDEuIENyZWF0ZSB0aGUgYnV0dG9uXG4vLyBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbi8vIGJ1dHRvbi5pbm5lckhUTUwgPSBcIitcIjtcbi8vIGxldCBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbi8vIGJ1dHRvbjIuaW5uZXJIVE1MID0gXCItXCI7XG5cbi8vIC8vIDIuIEFwcGVuZCBzb21ld2hlcmVcbi8vIGxldCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSlcbi8vIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuLy8gYm9keS5hcHBlbmRDaGlsZChidXR0b24yKTtcblxuLy8gLy8gMy4gQWRkIGV2ZW50IGhhbmRsZXJcbi8vIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyIChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuIFxuLy8gfSk7XG4vLyBidXR0b24yLmFkZEV2ZW50TGlzdGVuZXIgKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4vLyAgIHN0YXJ0RGF0ZT0nJnN0YXJ0X2RhdGU9MjAxOC0wMS0wMSdcblxuLy8gICBzdmcuZXhpdCgpLnJlbW92ZSgpXG5cbi8vIGRyYXdWYXJQcmljZUNoYXJ0KGV0aGVyUHJpY2VEYXRhLCcjZXRoZXItdmFyJyx3aWR0aCxoZWlnaHQpO1xuLy8gZHJhd1ZhclByaWNlQ2hhcnQoYml0Y29pblByaWNlRGF0YSwnI2JpdGNvaW4tdmFyJyx3aWR0aCxoZWlnaHQpO1xuXG4vLyB9KTtcbiAgICAgIFxuICB9XG59XG4iLCIvLyBQcmljZVxuXG5mdW5jdGlvbiBkcmF3VmFyUHJpY2VDaGFydChkYXRhLCBpZCwgd2lkdGgsIGhlaWdodCwgY3VycmVuY3kpIHtcblxuXG5cbiAgcXVldWUoKVxuICAgIC5kZWZlcihkMy5jc3YsIGRhdGEpXG4gICAgLmF3YWl0KG1ha2VHcmFwaHMpO1xuXG4gIGZ1bmN0aW9uIG1ha2VHcmFwaHMoZXJyb3IsIHRyYW5zYWN0aW9uc0RhdGEpIHtcbiAgICBpZiAoZXJyb3IpIHsgY29uc29sZS5sb2coZXJyb3IpOyB9XG4gICAgY29uc3QgYSA9IGlkLnN1YnN0cigxKTtcbiAgICBhLnRvU3RyaW5nKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSkuaW5uZXJIVE1MID0gYDxwPiR7dHJhbnNhY3Rpb25zRGF0YVswXS5PcGVufSAke2N1cnJlbmN5fSA8L3A+YDtcblxuICAgIGxldCBtYXg7IFxuICAgIGxldCBtaW47XG4gICAgbGV0IGZpcnN0RGF0ZTtcbiAgICBsZXQgbGFzdERhdGU7XG5cbiAgICBtYXggPSBkMy5tYXgodHJhbnNhY3Rpb25zRGF0YSwgZCA9PiArZC5IaWdoLWQuTG93KTtcbiAgICBtaW4gPSBkMy5taW4odHJhbnNhY3Rpb25zRGF0YSwgZCA9PiArZC5IaWdoLWQuTG93KTtcbiAgICBsZXQgYXZnID0gZDMubWVhbih0cmFuc2FjdGlvbnNEYXRhLCBkID0+ICtkLkhpZ2ggLSBkLkxvdyk7XG4gICAgZmlyc3REYXRlID0gZDMubWluKHRyYW5zYWN0aW9uc0RhdGEsIGQgPT4gZC5EYXRlKTtcbiAgICBsYXN0RGF0ZSA9IGQzLm1heCh0cmFuc2FjdGlvbnNEYXRhLCBkID0+IGQuRGF0ZSk7XG4gICAgXG5cbiAgICBhdmcgPSBhdmcudG9GaXhlZCgwKTtcbiAgICBtYXggPSBtYXgudG9GaXhlZCgwKTtcbiAgICAvL21pbiA9IG1pbi50b0ZpeGVkKDApO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpLmlubmVySFRNTCA9IGAgPHA+IE1heDogJHttYXh9IEF2ZXJhZ2U6ICR7YXZnfSAke2N1cnJlbmN5fSA8L3A+YDtcbiAgICBcblxuICAgIGxldCB4ID0gZDMudGltZS5zY2FsZSgpXG4gICAgICAuZG9tYWluKFtuZXcgRGF0ZShmaXJzdERhdGUpLCBuZXcgRGF0ZShsYXN0RGF0ZSldKVxuICAgICAgLnJhbmdlKFsxMCwgd2lkdGgtNDFdKTsgICAvLyBMZWZ0IHJpZ2h0IHBvc2l0aW9uIGZvciBkYXRlIGNoYXJ0XG5cbiAgICBsZXQgeEF4aXMgPSBkMy5zdmcuYXhpcygpXG4gICAgICAuc2NhbGUoeCk7XG5cblxuICAgIGNvbnN0IHNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIG1heCAtIG1pbiBdKSAvLyBCb3VuZGFyaWVzIGZvciBjaGFydFxuICAgICAgLnJhbmdlKFswLCBoZWlnaHQgLSAxMCAtIG1hcmdpbkJvdHRvbV0pOyAvLyBib3VuZGFyaWVzIGZvciBkYXRhXG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoaWQpXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgYmdjb2xvcik7XG5cblxuICAgIHN2Zy5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEodHJhbnNhY3Rpb25zRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdyZWN0JykgLy8gYXBwZW5kIHN2ZyB0byBkaXZcbiAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHdpZHRoICsgMCAtIHdpZHRoIC8gdHJhbnNhY3Rpb25zRGF0YS5sZW5ndGggLSAoaSAqICgod2lkdGggLSA1MCkgLyB0cmFuc2FjdGlvbnNEYXRhLmxlbmd0aCkpKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IGhlaWdodCAtIG1hcmdpbkJvdHRvbSAtIHNjYWxlKGQuSGlnaCAtIGQuTG93KSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IHNjYWxlKGQuSGlnaCAtIGQuTG93KSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIGQgPT4gd2lkdGggLyB0cmFuc2FjdGlvbnNEYXRhLmxlbmd0aClcbiAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgIFxuXG4gICAgIFxuICAgIHN2Zy5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZHVyYXRpb24oMTUwMClcbiAgICAuc3R5bGUoXCJmaWxsXCIsY2hhcnRDb2xvcilcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmR1cmF0aW9uKDMwMDApXG4gICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIGlmIChkLkhpZ2gtZC5Mb3cgPiBhdmcpIHsgICAvL1RocmVzaG9sZCBvZiAxNVxuICAgICAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hhcnRDb2xvcjtcbiAgICAgIH1cbiAgfSlcblxuXG4gICAgLy8gUHJpY2VcbiAgICBzdmcuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgIC5kYXRhKHRyYW5zYWN0aW9uc0RhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAudGV4dCgoZCwgaSkgPT4gcGFyc2VJbnQobWluICsgKChtYXggLSBtaW4pICogKGkgKiAwLjEpKSkpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5hdHRyKCd4JywgKCkgPT4gMjApXG4gICAgICAuYXR0cigneScsIChkLCBpKSA9PiBoZWlnaHQgLSBtYXJnaW5Cb3R0b20gLSAoaSAqICgoaGVpZ2h0LW1hcmdpbkJvdHRvbS1mb250U2l6ZSkgLyAxMCkpKVxuICAgICAgLmF0dHIoJ2ZvbnQtZmFtaWx5JywgZm9udClcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCBmb250U2l6ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ2JsYWNrJyk7XG5cbiAgICAgIFxuXG4gICAgIC8vIERhdGVcbiAgICAgICAgIGxldCB0bXA9aGVpZ2h0LW1hcmdpbkJvdHRvbTtcbiAgICAgICAgIFxuICAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSg0MCxcIiArIHRtcCArIFwiKVwiKVxuICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgICAgIC5hdHRyKFwieFwiLCA5KVxuICAgICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoOTApXCIpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCBmb250U2l6ZSlcbiAgICAgICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcblxuXG5cbiAgfVxufVxuXG5cbiJdfQ==