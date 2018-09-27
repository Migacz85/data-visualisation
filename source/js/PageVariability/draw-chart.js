// This javascript file is last.

function drawCharts(date) {
drawPriceChart(setDate(date,'ether'),'#ether',width,height, "Euro");
drawPriceChart(setDate(date,'bitcoin'),'#bitcoin',width,height, "$");
drawPriceChart(setDate(date,'litecoin'),'#litecoin',width,height, "Euro");

drawVarPriceChart(setDate(date,'ether'),'#ether-var',width,height, "Euro");
drawVarPriceChart(setDate(date,'bitcoin'),'#bitcoin-var',width,height, "$");
drawVarPriceChart(setDate(date,'litecoin'),'#litecoin-var',width,height, "Euro");
}


function year() {    
  loading=0;
  drawCharts(setDateScope(12)); 
}

function half() {    
    loading=0;
    drawCharts(setDateScope(6)); 
  }

function quater() {    
    loading=0;
    drawCharts(setDateScope(3)); 
  }

 
function month() { 
  loading=0;
  drawCharts(setDateScope(1)); 
  }


function alldata() {
   loading=0;
    drawCharts('2017-06-01');
}



alldata();
