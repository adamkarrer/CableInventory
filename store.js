const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: String,
  number: Number,
  inventory: {
    xb3: Number,
    xb6: Number,
    xb7: Number,
    xg2: Number,
    xid: Number,
    xi6: Number,
    xg1v4: Number,
    rng150: Number
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  }
});

var Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
