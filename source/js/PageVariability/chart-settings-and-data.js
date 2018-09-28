// This javascript file is loaded first.
// Charts config
const width = 300;
const height = 200;
const marginBottom=50;
const chartColor='rgb(66, 170, 143)';
const font = 'Didact Gothic';
const fontSize = '10';
const bgcolor='white';
let loading=0;


function Crypto(id, max, min, avg, firstDate, lastDate) {
    this.id=id
    this.max=max
    this.min=min
    this.avg=avg
    this.firstDate=firstDate
    this.lastDate=lastDate
}
let Ether = new Crypto();
let Bitcoin = new Crypto();
let Litecoin = new Crypto();

