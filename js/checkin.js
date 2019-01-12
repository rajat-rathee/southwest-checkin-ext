chrome.runtime.onMessage.addListener(function(str) {
	var input = str.message.split(",");
	var fn = input[0];
	var ln = input[1];
	var num = input[2];
	var conNum = document.getElementsByName("recordLocator")[0];
	conNum.setAttribute('id','num');
	$('#num').val(num).trigger('focus');

	var firstName = document.getElementsByName("firstName")[0];
	firstName.setAttribute('id','fname');
	$('#fname').val(fn).trigger('focus');

	var lastName = document.getElementsByName("lastName")[0];
	lastName.setAttribute('id','lname');
	$('#lname').val(ln).trigger('focus');

	var submitButton = document.querySelectorAll('[role="submit"]')[0];
	submitButton.click();
});