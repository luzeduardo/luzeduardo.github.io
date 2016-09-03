if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('public/js/sw.js').then(function(reg) {
    console.log('Yey!', reg);
  }).catch(function(err) {
    console.log('Boo!', err);
  });
}

navigator.storageQuota.queryInfo("temporary").then(
	function(storageInfo){
		initializeCache(storageInfo.usage,
			storageInfo.quota - storageInfo.usage)
		console.log(storageInfo.usage);
		console.log(storageInfo.quota);
});
// navigator.serviceWorker.ready.then(function(registrationNotificationTag){
// 	registration.sync.register('outbox').then(function(){
// 		//success
// 	}, function(){
// 		//fail
// 	});
// });
