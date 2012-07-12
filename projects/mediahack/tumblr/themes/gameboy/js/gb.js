var currentNav = document.location.pathname.replace(/\/$/,'');
if( document.location.pathname != '/'){
	jQuery('nav.main a[href^=' + currentNav + ']').addClass('current');
}

[feedly mini] 