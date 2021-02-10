const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Store = require ('./store');

require('dotenv').config();

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwlm3.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static( __dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`ShaBAM listening at http://localhost:${port}`);
})

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/stores/:number', async(req, res) => {
  const store = await Store.findOne({number: req.params.number});
  res.render("storeInventory", { store: store });
});

app.get('/new', function (req, res) {
  res.render("new");
});

app.post('/new', async(req, res) => {
  const store = new Store({
    name: req.body.storeName,
    number: parseInt(req.body.storeNumber),
    inventory:
    {
      xb3: parseInt(req.body.xb3),
      xb6: parseInt(req.body.xb6),
      xb7: parseInt(req.body.xb7),
      xg2: parseInt(req.body.xg2),
      xid: parseInt(req.body.xid),
      xi6: parseInt(req.body.xi6),
      xg1v4: parseInt(req.body.xg1v4),
      rng150: parseInt(req.body.rng150),
    },
    address:
    {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }
  });
  await store.save()
  res.redirect(`/stores/${req.body.storeNumber}`);
});

app.post('/stores', function(req, res){
  return res.redirect(`/stores/${req.body.storeNum}`);
  })

app.get('/stores/:number/edit', async(req, res) => {
    const store = await Store.findOne({number: req.params.number});
    res.render("edit", { store: store });
  });

app.put('/stores/:number', async(req, res)=>{
    const store = await Store.findOne({number: req.params.number});
    store.inventory.xb3 = req.body.xb3;
    store.inventory.xb6 = req.body.xb6;
    store.inventory.xb7 = req.body.xb7;
    store.inventory.xg2 = req.body.xg2;
    store.inventory.xid = req.body.xid;
    store.inventory.xi6 = req.body.xi6;
    store.inventory.xg1v4 = req.body.xg1v4;
    store.inventory.rng150 = req.body.rng150;
    await store.save();
    res.redirect(`/stores/${store.number}/`);
  })

app.delete('/stores/:number', async(req, res)=>{
      await Store.deleteOne({number: req.params.number});
      res.redirect('/');
  })
