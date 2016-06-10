function drawChart(dataArray, hAxisMin, hAxisMax) {		
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Distancia');
	//data.addColumn('number', 'Dummy');
	data.addColumn('number', 'Max Permisible');
	data.addColumn('number', 'Eje Delantero'); 
	data.addColumn('number', 'Eje Trasero');
	data.addColumn('number', 'Min Delantero');
	data.addColumn('number', 'Min Tracción');
	data.addColumn('number', 'Carga Máxima'); 
		
	for (var i = 0; i < dataArray.length; i++) {
		data.addRow([dataArray[i][0], dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4], dataArray[i][5], dataArray[i][6]]);
	}

	var options = {
        //chart: {
        //  title: 'Box Office Earnings in First Two Weeks of Opening',
        //  subtitle: 'in millions of dollars (USD)'
        //},
		curveType: 'function',
		legend: {position: 'none'},
		backgroundColor: { fill:'transparent' },
        	chartArea: {
			left: 0,
			top: 0,
			width: document.getElementById("distCargaFinput").value / 20,
			height: 150
			}, 
		series: { 
			//0: {targetAxisIndex: 0, visibleInLegend: false, pointSize: 0, lineWidth: 0},
			0: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			1: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			2: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			3: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			4: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			5: {targetAxisIndex: 1, color:'red', lineWidth: 2}
			},
		vAxes: {
			0: {textPosition: 'none'},
			1: {textPosition: 'inside'},
		},
		hAxis: {
            		viewWindowMode:'explicit',
            		viewWindow: {
              			max:hAxisMax,
              			min:hAxisMin
            		},
			//format: '0',
			textPosition:'none',
			slantedTextAngle:90
        	},				
		vAxis: {
            		viewWindowMode:'explicit',
            		viewWindow: {
              			max: 1.1 * dataArray[0][1],
              			min: 0
            		}
        	}	
      	};

	var chart = new google.visualization.LineChart(document.getElementById('ChasisGraf'));
	chart.draw(data, options);
}
