	var productsList = '';
	var newProductsList = '';
	function findCategoryList(callback) {
	  	var db = window.sqlitePlugin.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

	  	db.transaction(function(tx) {
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS category_list (id integer primary key, category_id text, max_products integer)');
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS demo_configuration (id integer primary key, base_url text)');
	  	});
	  	
		$("#baseURL").val('');
			  	
	  	db.transaction(function(tx) {
	  		tx.executeSql("select base_url from demo_configuration;", [], function(tx, res) {
				$("#baseURL").val(res.rows.item(0).base_url);
	        });
	   	});
		// Clear out rows
		for (var rowX = 1; rowX < 6; rowX++) {
			$("#categoryId" + rowX).val('');
			$("#maxProducts" + rowX).val('');
		}
	  	
	  	db.transaction(function(tx) {
	  		tx.executeSql("select category_id, max_products from category_list;", [], function(tx, res) {
	  			for (var x = 0; x < res.rows.length; x++) {
					var i = x + 1;
					$("#categoryId" + i).val(res.rows.item(x).category_id);
					$("#maxProducts" + i).val(res.rows.item(x).max_products);
	  			}
	  		  	if (callback && typeof(callback) === "function") {  
	  		        callback();  
	  		    }  else {
	  		    	console.log('callback = ' + callback);
	  		    }
	        });
	   	});
	}  
	function saveCategoryList() {
	  	var db = window.sqlitePlugin.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

	  	db.transaction(function(tx) {
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS category_list (id integer primary key, category_id text, max_products integer)');
	    	tx.executeSql('CREATE TABLE IF NOT EXISTS demo_configuration (id integer primary key, base_url text)');
	    	tx.executeSql('delete from category_list');
	    	tx.executeSql('delete from demo_configuration');
	  	});
	  	
	  	for (var i = 1; i < 6; i++) {
	  		var tempCategoryId = $("#categoryId" + i).val();
	  		var tempMaxProducts = $("#maxProducts" + i).val();
			if (isNaN(tempMaxProducts) || tempMaxProducts == '') {
				tempMaxProducts = 20;
			} 
	  		if (tempCategoryId != '') {
			  	db.transaction(function(tx) {
			  		tx.executeSql("INSERT INTO category_list (category_id, max_products) VALUES (?,?)", [tempCategoryId, tempMaxProducts], function(tx, res) {
			  	    	console.log("insertId: " + res.insertId);
			  		});
	  		   	});
		  	}
	  	}
  		var tempBaseURL = $("#baseURL").val();
  		if (tempBaseURL != '') {
		  	db.transaction(function(tx) {
		  		tx.executeSql("INSERT INTO demo_configuration (base_url) VALUES (?)", [tempBaseURL], function(tx, res) {
		  	    	console.log("insertId: " + res.insertId);
		  		});
  		   	});
	  	}
	}  
