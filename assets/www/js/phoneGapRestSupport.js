var testingScan = false;

function startupTTS(result) {
	    if (result == TTS.STARTED) {
	    }
  }

	function fail(result) {
	    alert("Error = " + result);
	    console.log("Error = " + result);
	}

	function scanBarcode() {
		if (testingScan) {   // running in emulator
			getProductDetailsFromWebService('626');						
		} else {
			window.plugins.barcodeScanner.scan( function(result) {
				if (result.format != '') {    // barcode   
					getProductDetailsFromWebService(result.text);						
				} else {
					alert("We got a barcode\n" +
			                  "Result: " + result.text + "\n" +
			                  "Format: " + result.format + "\n" +
			                  "Cancelled: " + result.cancelled);
				}
				
		    }, function(error) {
		        alert("Scanning failed: " + error);
		    });		
		}
	}	
	
  
  function setPhoneGapVersion() {
      var phoneGapVersion = 'PhoneGap (version '+
      device.phonegap + ')<br />' + device.platform + ' '+
      device.name + ' (version ' + device.version +   ').';
      $('#phoneGapVersion').html(phoneGapVersion);
	  getProductList();
  }

  function getProductDisplay() {
	  $("#ProductDisplay").show();
		 checkOrientation();

	  $("#ProductList").hide();
	  $("#CategoryList").hide();
	  $("#PhonegapVersion").hide();
  }
  function getProductDetails(inProductId, inProductName, inImageURL) { 
	  var html = '<div>' + inProductId + '</div>';
      html += '<div>' + inProductName.replace("inch", "\"") + '</div>';
      $('#productDetails').html(html);
      $('#productImage').attr('src', inImageURL);
	  var promoHtml = '';
      if (inProductId == '626') {
    	  promoHtml += '<div><i><b>Order now for Guaranteed Free Shipping On Christmas Day!</b></i></div>';
    	  promoHtml += '<div><img style=\"width:80%;\" src=\"../images/Santa.png\"/></div>';
	  }
      $('#productPromo').html(promoHtml);
      
      getProductDisplay();
  }

  
  function getProductList() {

	  findCategoryList(function() {
			totalProductsNotAvailable = 0;	
			  $("#ProductList").show();

			  $("#ProductDisplay").hide();
			  $("#CategoryList").hide();
			  $("#PhonegapVersion").hide();

			  getProductListFromWebService(1);
		});
  }

	  
  function getCategoryList() {
  		findCategoryList(function() {
  		  $("#CategoryList").show();

  		  $("#ProductList").hide();
  		  $("#ProductDisplay").hide();
  		  $("#PhonegapVersion").hide();
	  	});
  }
  function getPhonegapVersion() {
	  $("#PhonegapVersion").show();

	  $("#ProductDisplay").hide();
	  $("#ProductList").hide();
	  $("#CategoryList").hide();
  }
  
  
  // Adjust divs based on Phone Orientation
  function checkOrientation() {
	  var mql = window.matchMedia("(orientation: portrait)");
	  if (mql.matches) {
		  $('#divProductSpecs').css({"width": "100%"});
	      $('#divProductImage').css({"width": "100%"});
	      $('#divProductPromo').css({"width": "100%"});
	  } else {
	      $('#divProductSpecs').css({"width": "50%", "float":"left"});
	      $('#divProductImage').css({"width": "50%", "float":"left"});
	      $('#divProductPromo').css({"width": "100%"});
	  }
  }
  
  
  // Start watching the acceleration
  
  function startWatch() {
       
      var previousReading = {
          x: null,
          y: null,
          z: null
      }
       
      navigator.accelerometer.watchAcceleration(function (acceleration) {
        var changes = {},
        bound = 0.2;
        if (previousReading.x !== null) {
            changes.x = Math.abs(previousReading.x, acceleration.x);
            changes.y = Math.abs(previousReading.y, acceleration.y);
            changes.z = Math.abs(previousReading.z, acceleration.z);
        }
         
        if (changes.x > bound && changes.y > bound && changes.z > bound) {
          shaken();
        }
         
        previousReading = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
        }
         
        }, onError, { frequency: 2000 });
  }
   
  function shaken(){
      alert("Shaken");
  }
   
  // Error
  function onError() {
      alert('onError!');
  }

  function exitApplication() {
	  navigator.app.exitApp();
  }
