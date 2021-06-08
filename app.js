const https = require('https');
const fire = require('firebase');
const app = fire.initializeApp({
    apiKey: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    authDomain: "nodejsproject-jes.cloud.cloudapp",
    databaseURL: "https://nodejsproject-jes-db.cloudio.cloudapp",
    storageBucket: "nodejsproject-jes.cloudspot.cloudapp"
});
https.get('https://api.myapp.cloudapp/v0/ticker/BTC-INR', (res) => {
let data = '';
res.on('data', (chunk) => {
data += chunk;
});
res.on('end', () => {
console.log(data);
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let obj = JSON.parse(data);
console.log(obj.currency + " "+ date + "-" + month + "-" + year + " " + hours + ":" + minutes);
fire.database().ref(date + "-" + month + "-" + year+ " " + hours + ":" + minutes).set({
    ask: obj.ask,
    bid: obj.bid,
    currency: obj.currency,
    date: date + "-" + month + "-" + year,
    time: hours + ":" + minutes
  }, (error) => {
  if (error) {
    console.log('error');
    process.exit();
 } else {
    console.log('success');
    process.exit();
 }
});
});
})
.on('error', (err) => {
console.log(err);
});
