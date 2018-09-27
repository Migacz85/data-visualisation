queue()
    .defer(d3.csv, 'fifa_ranking.csv')
    .await(makeGraph2);

    function makeGraph2(error, transactionsData) {


        var ndx = crossfilter(transactionsData);
       
        showType(ndx)
        show(ndx);
        pie(ndx);

        dc.renderAll();
    }

    function showType(ndx){
       let dim = ndx.dimension(dc.pluck('rank_date'));
       let group = dim.group()
        
        dc.selectMenu("#type-selector")
        .dimension(dim)
        .group(group);
    }

    function show(ndx){
        let dim = ndx.dimension(dc.pluck('rank_change'));
        let group = dim.group();
        
        dc.barChart("#chart1")
            .width(2000)
            .height(400)
            .margins({top:10, right:50, bottom:30, left:50})
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Car Make")
            .yAxis().ticks(10);
    }

    function pie(ndx){
        let name_dim = ndx.dimension(dc.pluck('country_full'));
        let group = name_dim.group();a
        
        dc.pieChart('#chart2')
            .height(330)
            .radius(490)
            .transitionDuration(1500)
            .dimension(name_dim)
            .group(group);
    }