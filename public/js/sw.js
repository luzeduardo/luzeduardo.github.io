if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('public/js/sw.js').then(
  	function(reg) {
  		if(reg.installing){
  			reg.installing.postMessage('Installing in page');
  		}
    	console.log('Yey!', reg);
  	}).catch(function(err) {
    	console.log('Boo!', err);
  	});
}