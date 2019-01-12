chrome.runtime.onMessage.addListener(function(str) {
	while (document.readyState === "loading" || document.readyState === "interactive") {
		console.log("notready");
	}
	console.log("reached");
	var submitButton2 = document.querySelectorAll('[role="submit"]')[0];
	submitButton2.click();
});