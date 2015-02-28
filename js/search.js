/*
 * Images searched using Google feed API
 * Google Feed API license info here
 */
var fetching  = false;
var feed;
function fetchResult(){
	var searchText = $("#searchId").val();
	//alert(searchText); 
	if(!fetching){
	feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?format="json"&num=100&tags='+searchText);
	//feed.setNumEntries(2);
	feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
	fetching = true;
	feed.load(showResult);
	}
}

function showResult(result){	
	console.log(result);
	if (!result.error) {
		fetching = false;
		var content = document.getElementById('resultId');
		var html = content.innerHTML;

		// Loop through the results and print out the title of the feed and link to the url.
		for (var i = 0; i < result.feed.entries.length; i++) {
			var entry = result.feed.entries[i];
			//console.log(entry.link);
			//console.log(entry.content);
			html += "<div><p>"+entry.title+"</p>";
			var imgHtml = entry.content.substring(entry.content.indexOf("<img"),entry.content.indexOf("</a></p>"));//hack for img src
			console.log(imgHtml);
			html += imgHtml+"</div>";
			html += "</br>";			
		}
		content.innerHTML = html;		
	}

}

function findFeeds(){
	fetchResult();
}
