function year() {
    loading = 0;
    drawCharts(setDateScope(12));
}

function half() {
    loading = 0;
    drawCharts(setDateScope(6));
}

function quater() {
    loading = 0;
    drawCharts(setDateScope(3));
}


function month() {
    loading = 0;
    drawCharts(setDateScope(1));
}


function alldata() {
    loading = 0;
    drawCharts('2017-06-01');
}