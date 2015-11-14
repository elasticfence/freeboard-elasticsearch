(function()
{
	//Setting white-space to normal to override gridster's inherited value
	freeboard.addStyle('table.list-table', "width: 100%; white-space: normal !important; ");
	freeboard.addStyle('table.list-table td, table.list-table th', "padding: 2px 2px 2px 2px; vertical-align: top; ");
	
	var tableWidget = function (settings) {
	        var self = this;
	        var titleElement = $('<h2 class="section-title"></h2>');
	        var stateElement = $('<div><table class="list-table"><thead/></table></div>');
	        var currentSettings = settings;
		//store our calculated values in an object
		var stateObject = {};
        
		function updateState() {            			
			stateElement.find('thead').empty();
			stateElement.find('tbody').remove();
			var bodyHTML = $('<tbody/>');
			var classObject = {};
			var classCounter = 0;
			
		    var replaceValue = (_.isUndefined(currentSettings.replace_value) ? '' : currentSettings.replace_value);			

		// This function handles arrays and objects
		function eachRecursive(obj)
		{
		    for (var k in obj)
		    {
		        if (typeof obj[k] == "object" && obj[k] !== null)
		            eachRecursive(obj[k]);
		        else
		            var tr = "<tr>";
		     		tr += "<td>" + k  + "</td>" + "<td>" + obj[k] + "</td></tr>";
		    		tbody.innerHTML += tr;
		    }
		}


		// console.log('object:', stateObject);
		if (stateObject.value) {
			var tabledata = { value: {} };
			tabledata.value.data = [stateObject.value];
			tabledata.value.header = [];
			for(var k in stateObject.value) tabledata['value']['header'].unshift(k);
			// console.log(tabledata);
		}
			
			//only proceed if we have a valid JSON object
		if (tabledata && tabledata.value && tabledata.value.header && tabledata.value.data) {

				var headerRow = $('<tr/>');
				var templateRow = $('<tr/>');
				var rowHTML;
				
				//Loop through the 'header' array, building up our header row and also a template row
				try {					
					$.each(tabledata.value.header, function(headerKey, headerName){
						classObject[headerName] = 'td-' + classCounter;
						headerRow.append($('<th/>').html(headerName));						
						templateRow.append($('<td/>').addClass('td-' + classCounter).html(replaceValue));		
						classCounter++;						
					})					
				} catch (e) {
					console.log(e);
				}
				
				//Loop through each 'data' object, cloning the templateRow and using the class to set the value in the correct <td>
				try {
					$.each(tabledata.value.data, function(k, v){
						rowHTML = templateRow.clone();						
						$.each(v, function(dataKey, dataValue){									
						   if(dataKey.toLowerCase().indexOf("byte") !=-1) {
                                                        var i = Math.floor( Math.log(dataValue) / Math.log(1024) );
                                                        dataValue = ( dataValue / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                                                        rowHTML.find('.' + classObject[dataKey]).html(dataValue);
                                                   } else {
                                                        rowHTML.find('.' + classObject[dataKey]).html(dataValue);
                                                   }

						})
						bodyHTML.append(rowHTML);
					})
				} catch (e) {
					console.log(e)
				}	
				
				//Append the header and body
				stateElement.find('thead').append(headerRow);
				stateElement.find('table').append(bodyHTML);
				
				//show or hide the header based on the setting
				if (currentSettings.show_header) {					
					stateElement.find('thead').show();
				} else {
					stateElement.find('thead').hide();
				}
			}
        }

        this.render = function (element) {
            $(element).append(titleElement).append(stateElement);
        }		

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));			
            updateState();			
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            //whenver a calculated value changes, stored them in the variable 'stateObject'
			stateObject[settingName] = newValue;
            updateState();
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {    
			var height = Math.ceil(stateElement.height() / 55);			
			return (height > 0 ? height : 1);
        }

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "list",
        display_name: "Table",
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
			{
                name: "show_header",
                display_name: "Show Headers",
				default_value: true,
                type: "boolean"
            },
			{
                name: "replace_value",
                display_name: "Replace blank values",
                type: "text"
            },
			{
                name: "value",
                display_name: "Value",
                type: "calculated"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new tableWidget(settings));
        }
    });
}());	
