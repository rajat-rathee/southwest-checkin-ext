//splits url to get form answers from users
function splitUrl(x)
{
       var url = window.location.search.substring(1);
       var items = url.split("&");
       for (var i = 0; i < items.length; i++) {
               var keyval = items[i].split("=");
               if(keyval[0] == x){
               	return keyval[1];
               }
       }
       return false;
}
//save form ansers to indv vars
var fn = splitUrl("First+Name");
var ln  = splitUrl("Last+Name");
var num = splitUrl("Confirmation+Number");
var date = splitUrl("Scheduled+Departure+Date").replace(/%2F/g,"/");
var time = splitUrl("Scheduled+Departure+Time").replace("%3A",":");

var dates = date.split("/");
var month = dates[0] - 1;
var day  = dates[1];
var year = dates[2];

var times = time.split(":");
var hour = times[0];
var minutes = times[1];

var final = new Date("20"+year, month, day, hour, minutes, 0, 0);

//clear all previous alarms
chrome.alarms.clearAll();

//make sure system doenst sleep until check in complete
chrome.power.requestKeepAwake('system');

//calc time in miliseconds
var timeleft = final - Date.now();

var mili = (Date.now() + timeleft) - 86390000;

alert(fn  + " " + ln  +  ", "  + "your Southwest flight on " + date + 
	" at "  + time + " with Confirmation Number " + num +  " will automatically be checked into!");
//create alarm to execute check in 
chrome.alarms.create({when: mili});

var full = (fn+","+ln+","+num);
chrome.runtime.sendMessage({from:"ex",message:full});
