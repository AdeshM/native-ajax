/*global ActiveXObject:true*/

function XMLHTTP() {

    var XMLHTTPFactories = [
        function () {return new XMLHttpRequest();},
        function () {return new ActiveXObject("Msxml2.XMLHTTP");},
        function () {return new ActiveXObject("Msxml3.XMLHTTP");},
        function () {return new ActiveXObject("Microsoft.XMLHTTP");}
    ];

    /**
    * Create XMLHTTPObject from Factories 
    */
    var createXMLHTTPObject = function () {
    	var xmlhttp = false;
    	for (var x in XMLHTTPFactories) {
    		try {
    			xmlhttp = XMLHTTPFactories[x]();
    		} catch (e) {
    			continue;
    		}
    		break;
    	}
    	return xmlhttp;
    };

    /**
    * Send XMLHTTP Request, accepts GET/POST/PUT/HEAD etc.
    */
    this.sendRequest = function(url, callback, postData, spotId) {
			var req = createXMLHTTPObject();
			if (!req) return;
			var method = (postData) ? "POST" : "GET";   // "HEAD" - to fetch Header
			req.open(method,url,true);
	//    req.setRequestHeader('User-Agent','XMLHTTP/1.0'); // Commenting since not supported in most of browsers...
			if (postData)
				req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			req.onreadystatechange = function () {
				if (req.readyState != 4) return;
				if (req.status != 200 && req.status != 304) {
//          alert('HTTP error ' + req.status);
						return;
				}
				callback(req, postData, false, spotId);
			};
			// if (req.readyState == 4) {
			req.onload =  function() {
				//headers = req.getAllResponseHeaders();  console.log('headers: '); console.log(headers);
				return ;    //headers;
			};
			payload = obj2urlencodedString(postData); console.log(payload);
			req.send(payload);
    };
		
		obj2urlencodedString = function(obj) {
			let objArr = [];
			if(typeof obj === 'object') {
					for(let ix in obj) {
							if(obj.hasOwnProperty(ix))
									objArr.push(ix+'='+obj[ix]);
					}
					return encodeURI(objArr.join('&'));
			} else
			return '';
	}

    /**
    * Send XMLHTTP Request, accepts GET/POST/PUT/HEAD etc.
    */
    this.TEST = function(tv) {
        console.log('This is my TEST...' + tv);
    };

}

// var xmlhttp = new XMLHTTP();