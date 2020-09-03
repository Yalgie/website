$(function() {
	var $time = $(".time");
	var $date = $(".date");
	var months = [
		"jan", 
		"feb", 
		"mar", 
		"apr", 
		"may", 
		"jun", 
		"jul", 
		"aug", 
		"sep", 
		"oct", 
		"nov", 
		"dec"
	];
	
	function updateDateTime() {
		var dateTimeObj = String(new Date()).split(" ");
		var day = dateTimeObj[2];
		var month = getMonthIndex(dateTimeObj[1]);
		var year = dateTimeObj[3];
		var date = day + "/" + month + "/" + year;
		setDate(date);
		setTime(dateTimeObj[4]);
	}

	function getMonthIndex(txt) {
		month = txt.toLowerCase();
	    return months.indexOf(month) + 1;
	}

	function setTime(str) {
		var time = str.split(":");
		var minute = time[1];
		var second = time[2];
		var ampm = time[0] >= 12 ? " PM" : " AM";
		var hour = time[0] % 12;

		if (hour == 0) { hour = 12 };

		$time.html(hour + ":" + minute + ":" + second + ampm);
	}

	function setDate(str) {
		$date.html(str);
	}

	setInterval(function() {
		updateDateTime()	
	}, 1000);

	updateDateTime()
})