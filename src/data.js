const PouchDB = require('pouchdb-browser');
const db = new PouchDB('prices');

export function addTodo(product) {
  var todo = {
    _id: product.codeResult.code
    date: new Date().toISOString(),
    title: product.productName,
    price: product.productPrice
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a product!');
    }
  });
}

export function deleteButtonPressed(product) {
  db.remove(product);
}

// https://www.upccodesearch.com/api/v1/search?query=7898409957970
