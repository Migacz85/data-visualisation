 
# Data Visualisation
<img src="/img/crypto.png" alt="crypto.png" height="100" align="center"> <br>
This project is attempt to visualize current price of popular crypto currencies like
bitcoin, etherum and litecoin.
 
## UX
 
This website is for people interested in price of crypto-currencies. They can quickly analyze on witch days the variability of the price was the highest, and see the most recent price of currencies. 

I firstly created <a href="https://github.com/Migacz85/web-template">web-template</a> project to prepare my workspace and connect all modern technologies. Then I started building this project on top of it. In case you want to deeply understand how this project work <a href="https://github.com/Migacz85/web-template">read more.</a>

The main idea in this UX process design was:

- Keep it simple.
- Focus to use bootstrap when possible.
- Deliver clean easy to read design.

## User stories

### As a visitor I want to have: 

- Radio-box buttons to select interesting date scope so I can see price from that dates.
- Radio-box buttons that after check will refresh charts so I can see immediately effect after click.
- Progress bar that will inform me when data will be loaded so I will know when data is still loading.
- Progress bar that will disappear when the data will be loaded so I can focus on charts.
- Progress bar that will show % of loaded data so I will know how many data left to load.
- Chart that will show price from selected period so I can see how price was changing. 
- Chart that will show variability in price from selected period so I can see where variability was the highest.
- Colored bars on yellow when variability in price is higher than average so I can see that better.
- Statistical information that will show: maximal change in price, minimal change in price, average variability in price and dates that was selected so I can quick scan data.

## Features

The data used to power charts in this project is delivered by: https://www.quandl.com/

### Existing Features

- Progress bar - Showing user how much data is left to load from external source so he knows that hee need to wait
- Current price chart  - Showing user a current price on a chart so he knows how price was changing.
- Current variability chart - Showing user a variablity in price for given days.
- Period range -  Allows user to select a period range so he can see on chart period he is interested in

### Features Left to Implement

- on page marketcap.html there can be implemented bunch of different graphs showing 
for example market capitalization of 10 biggest crypto-currencies. 

## Technologies Used

- <a href="https://gulpjs.com/ "> Gulp</a>

I decided to learn and implement gulp in this particular project, because there was tremendous increase of small task to perform when adding technologies to project like:
refreshing the website or Jasmine spec results, compile sass code on css, minify pictures, auto-prefixing  etc. If you are interested about details how gulp is configured in this project <a href="https://github.com/Migacz85/web-template">Read more</a>

- <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html">Sass</a> 

Sass is just great, once you start using variables in css there is no way back :)

- <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html">Babel</a> 

Babel is a compiler that will compile js code to the most supported version of javascript for other browsers. As a developer I want to develop code that will be well-supported.

- <a href="https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb">Eslint<a>

Implemented with airbnb. As a developer I want to write clean and well edited code to other developers. 


## Testing

1. Radio buttons
    1. Clicking multiple times on radio buttons doesn't load scripts before data is loaded times
    2. Radio buttons are showing correct scope dates on charts after click
    3. Each click is 
2. Graphs are showing correctly the:
    1. Last price
    2. Price Scale on the left (y)
    3. Dates Scale on the bottom (x)
    4. Variability bars show correct maximal variability and average data.
3. Statistics:
    1. Show correct date range.
    2. Maximal change in price per day
    3. Minimal change in price per day:
    4. Average Variability in Price: 

Website was tested on: 

- laptop
- galaxy s6 s8
- motorola style 

Presented content is displaying properly on each device.

## Deployment

Project was deployed on github-pages if you want to quick check how project look like you can <a href="https://migacz85.github.io/data-visualisation/build/"> see working project.</a>

The deployment folder in this particular case is in /build
All source files required to create this folder are located in /source
To compile them in to /build look in to Installation section.

## Development version

The development version of project is located in /source folder.
After running commands from installation section. Running 
```
gulp
``` 
(when change to files will be detected) will:
 - compile(autoprefix,sourcemapped) sass to min-css/style.css
 - compile(minify,babel,sourcemapped) all js files to build/js/market.js and build/js/variability.js
 - copy all .html files to /build
 - compress photos and put them to /build/img
 - autoreload the page each time when something was done.

All that job is done by the script I coded in file gulpfile.js I wrote about it extensively in my preparation project <a href="https://github.com/Migacz85/web-template">web-template<a>

### Javascript files
Few important things to notice:

/source/js have to folders: 
PageMarket and PageVariability folder. 

All .js files from PageVariablity are bundled in to one file in to build/js/variability.js and this file is included to build/js/variability.html 

Same situation is with PageMarket folder but the .js file is bundled to build/js/market.js and this one is included in marketcap.html

I made it like that because I wanted to have option to create new .html including new multiple js files that are bundled to new bundle.js file. That workflow can provide some additional flexibility when coding using javascript projects. However, in moment of this writing I think that for the larger projects and much more power and flexibility technologies like webpack can be better solution. However this approach still can be beneficial in some situations.

#### What is the ordering of .js files in PageVariability folder? How they are concatenated ?

first: chart-settings-and-data.js
second: all folder functions
last: draw-chart.js 

The order is specified in gulpfile.js in:

```
const JS_ORDER_VARIABILITY = [SCRIPTS_P_VARIABILITY+'chart-settings-and-data.js', SCRIPTS_P_VARIABILITY+'/**/*.js', SCRIPTS_P_VARIABILITY+'draw-chart.js'];
```

Where 
```
SCRIPT_P_VARIABILITY="source/js/PageVariability"
```

#### Why I decided to approach this in that way?

Because I want to have possibility to split js code in to multiple files so I can organize it better. Including them in to script tags can reduce performance of loading times. Also working with a one big .js file in long term is no good.

### Installation:
```
https://github.com/Migacz85/data-visualisation.git
npm install
sudo npm install gulp -g
sudo npm i -g gulp-cli
```
After that you can build and run the project with:
```
gulp
```

Automated tests that are live-reloaded are available by running: 
(for now there is 0 tests)

```
jasmine-live
```
