function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
var msg;
var id;
var autoallowed = false;
var submit = false;
var num = "aaa";
chrome.alarms.onAlarm.addListener(function(){
	chrome.tabs.create({url: 'https://mobile.southwest.com/check-in'});
	chrome.power.releaseKeepAwake()
	autoallowed = true;
});
chrome.tabs.onCreated.addListener(function(tab) {
	id = tab.id;
	if (autoallowed == true){
		wait(30000); //time until webpage would be timed out
		/* Add retry if webpage times out so Check-In won't fail after first attempt.
		*/
		console.log(tab.url)
		chrome.tabs.sendMessage(id,msg);
		autoallowed = false;
		submit = true;
	}
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "ex") {
    	msg = message;
    	var input = msg.message.split(",");
		num = input[2];
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url == "https://mobile.southwest.com/check-in/reservation/" + num) {
		chrome.tabs.sendMessage(id,"submit");
		submit = false;
	}
});