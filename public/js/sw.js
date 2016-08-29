if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/my-app/sw.js').then(function(reg) {
    console.log('Yey!', reg);
  }).catch(function(err) {
    console.log('Boo!', err);
  });
}