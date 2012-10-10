var totalProductsNotAvailable = 0;
var saveTotalProductsNotAvailable = 0;

function getProductListFromWebService(rowNumber) {
	if (rowNumber > 5) {
		if (totalProductsNotAvailable != saveTotalProductsNotAvailable) {
			window.plugins.tts.speak("There are . " + totalProductsNotAvailable + " items that are not available.");
			saveTotalProductsNotAvailable = totalProductsNotAvailable;
		}
		return false;
	}
  	var searchingHtml = '<div>Searching the selected categories for items not available . . . </div>';
	var productsDisplayed = '';
	var html = '';
	var tempSearchCategory = $('#categoryId' + rowNumber).val();
	var tempCounter = $('#maxProducts' + rowNumber).val();
	if (tempSearchCategory && tempSearchCategory != '') {
		$('#divProductList' + rowNumber).html('<div><b>Category: ' + tempSearchCategory + '</b></div>' + searchingHtml);
		// Get the items in the category.
		var baseURL = $('#baseURL').val();
		$.getJSON(baseURL + '/services/category/' + tempSearchCategory + '/entities.do?entityTypes=4&sourceId=4&pageSize=' + tempCounter, function(data) {
			if (data && data.dataset.entities.values) {
				var totalItemsToSearch = data.dataset.entities.values.length;
				if (totalItemsToSearch > tempCounter) {
					totalItemsToSearch = tempCounter;
				}
				for (var xx = 0; xx < totalItemsToSearch; xx++) {
					var value = data.dataset.entities.values[xx];
  			  		if (html == '') {
	  			  		html = '<div style="height:1%">&nbsp;</div>';
	  			  		html += '<div style="color:blue;font-weight:bold">Category: ' + tempSearchCategory + ' - Products Not Available</div>';
	  			  		html += '<div style="height:1%">&nbsp;</div>';
	  			  		html += '<div style="color:blue;"><div style="float:left;width:25%">Product</div><div style="float:left;width:75%">Description</div></div>';
	  			  		html += '<div style="height:1%">&nbsp;</div>';
					}
	  			  	if (value.display_price == null && productsDisplayed.indexOf('*' + value.id + '*') == -1) {
	  			  		totalProductsNotAvailable++;
	  			  		var imageFileURL = value.images.main_image.file_url;
						imageFileURL = imageFileURL.replace("http://images.ocp_ws.pg.micros-retail.com", "http://184.73.30.145");
						var tempDisplayName = value.display_name;
						tempDisplayName = tempDisplayName.replace("\"", "inch");
						html += '<div><div style="float:left;width:25%"><a href="javascript:getProductDetails(' + value.id + ', \'' + tempDisplayName + '\', \'' + imageFileURL + '\');">' + value.id + '</a></div><div style="float:left;width:75%">' + value.display_name + '</div></div>';
						productsDisplayed += '*' + value.category.id + '*';
	  			  	}
				}				
				$('#divProductList' + rowNumber).html(html);
			}
			getProductListFromWebService(rowNumber + 1);
    	});
	} else {
		getProductListFromWebService(rowNumber + 1);
	}
  }
  
  function getProductDetailsFromWebService(inProductId) {
		var baseURL = $('#baseURL').val();
		$.getJSON(baseURL + '/services/product/' + inProductId + '.do?doc=false', function(data) { 
				if (data && data.dataset.product) {
  			  		var imageFileURL = data.dataset.product.values.images.main_image.file_url;
					imageFileURL = imageFileURL.replace("http://images.ocp_ws.pg.micros-retail.com", "http://184.73.30.145");
					var tempDisplayName = data.dataset.product.values.name;
					tempDisplayName = tempDisplayName.replace("\"", "inch");
					getProductDetails(data.dataset.product.values.id, tempDisplayName, imageFileURL);
				}
    	});
  }  
