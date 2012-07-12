(function(){  
	$(document).ready( function(){
		var path = document.location.pathname;
		var content = "";
		
		switch( path ){
			case "/about":
				$(".post").css("width", "850px");
				$(".post-meta").hide();
				break;
			case "/calendar":
				content = '<iframe src="https://www.google.com/calendar/hosted/edsfriends.org/embed?mode=AGENDA&amp;showTitle=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23C0D0DA&amp;src=edsfriends.org_0mlucbjm4hvrv0nk3iijg988as%40group.calendar.google.com&amp;color=%23AB8B00&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="850" height="600" frameborder="0" scrolling="no"></iframe>';
				break;
			case "/donate":
				content = '<iframe src="https://storage.whiz.to/contribute_base.php?id=15" width="475" height="1250" frameborder="0" style="margin-left: auto; margin-right: auto;" id="donateFrame"></iframe>';
				break;
		}
		
		if( content != "" ){ $("#content").html( content ); }
		
	});
})();