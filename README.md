 
# Data Visualisation
<img src="build/img/crypto.png" alt="crypto.png" height="100" align="center"> <br>
This project is attempt to visualize current price of popular crypto currencies like
bitcoin, etherum and litecoin. And also provide deep analyse of bitcoin.
## UX
 
This website is for people interested in price of crypto-currencies. They can quickly analyze on witch days the variability of the price was the highest, and see the most recent price of currencies. 

I firstly created <a href="https://github.com/Migacz85/web-template">web-template</a> project to prepare my workspace and connect all modern technologies. Then I started building this project on top of it. In case you want to deeply understand how this project work <a href="https://github.com/Migacz85/web-template">read more.</a>

The main idea in this UX process design was:

- Keep it simple.
- Focus to use bootstrap when possible.
- Deliver clean easy to read design.

## User stories

### As a visitor I want to have: 

- On Variability page
    - Radio-box buttons to select interesting date scope so I can see price from that dates.
    - Radio-box buttons that after check will refresh charts so I can see immediately effect after click.
    - Progress bar that will inform me when data will be loaded so I will know when data is still loading.
    - Progress bar that will disappear when the data will be loaded so I can focus on charts.
    - Progress bar that will show % of loaded data so I will know how many data left to load.
    - Chart that will show price from selected period so I can see how price was changing. 
    - Chart that will show variability in price from selected period so I can see where variability was the highest.
    - Colored bars on yellow when variability in price is higher than average so I can see that better.
    - Statistical information that will show: maximal change in price, minimal change in price, average variability in price and dates that was selected so I can quick scan data.

- On Bitcoin analyse page
    - Monthly price chart to see the price for selected dates so I know how price was changing
    - Volume price chart to see volume range so I can see how volume was changing. 
    - Volume price chart to to have handlebars so I can select interesting dates.
    - Monthly bubble chart to see witch months was performing the best so I can expect that this months are the best to invest.
    - Monthly bubble chart to have option to select given months so I can analyse only this month.
    - Days of week chart to see and select days so I can see how this days was performing 
    - Days by fluctuation so I can see daily histogram price change and filter by selecting most interesting range. 
    - Days by Loose/Gain so I can see how many days was gaining and losing in selected period so I can filter by gain and lose days.
    - Loading Gif to inform me that data is loading on the page so I dont see not rendered site.
    - Loading Gif to inform me that data is loading on the page so I have more professional feel.

### As a developer I want to have: 

- When working with project. As a developer I want to have:
    - auto refreshing the website, when I'm making changes so I save time and see results immediately.
    - auto refreshing the jasmine testing result page, when I'm making changes to spec files so I save time and see results immediately.
    - preview of the website I build in the same time on the phone, when I am making changes on UX development so I have real UX testing on the mobile.
    - auto compiling sass to build folder, when I'm making changes to sass files so I can see immediately changes in to project and save time.
    - auto compressing photos and moving them to build/img folder, when I am putting an image to folder /source/img so I can save time and keep site small in size.
    - auto generating html version of README.md so I while I'm writing documentation I can see that all tags are rendering how they should without sending it on github.

- When working with javascript. As a developer I want to:
    - concatenate all .js files from PageVariability to build/js/variability.js while I'm writing javascript code in source/js/PageVariability so I have ability to split js code in to multiple files and organize my code better. 
    - concatenate all .js files from PageMarket to build/js/market.js while I'm writing javascript code in source/js/PageMarket so I have ability to split js code in to multiple files and organize my code better. 
    - compile with babel on js files that are moved to /build/js when I'm making changes to javascript files so browsers have better support for code I develop.
    - minify js files, while I'm making changes to js files so files are loading faster in browser.
    - add sourcemaps, while I'm making changes to javascript code so I can see how on minified javascript files website is rendering in browser and if errors occur browser will link to source files. (So I can work on source files and see build result in the browser)
    - use eslint, while I'm writing javascript code so I can develop clean code other coders understand
    
## Features

The data used to power charts in this project is delivered by: https://www.quandl.com/

### Existing Features

On variability page (d3 library)
- Progress bar - Showing user how much data is left to load from external source so he knows that hee need to wait
- Current price chart  - Showing user a current price on a chart so he knows how price was changing.
- Current variability chart - Showing user a variablity in price for given days.
- Period range -  Allows user to select a period range so he can see on chart period he is interested in

On Bitcoin page Analyse: (d3, crossfilter, dc)
- Days by Fluctuation(%)
- Days by Gain/Loss
- Monthly Price/Volume Chart
- Monthly Index Average
- Monthly Index Move
- Monthly bubble chart
- Day of Week


### Features Left to Implement

- Because site relies heaviely on data from quandl.com. It cannot work without the connection to the internet. Page should inform the user:

    - When data is not loaded.
    - When there is lost in internet connectivity. 

## Technologies Used

- <a href="https://nodejs.org/ "> Npm</a>

In order to use this project as a developer you need to have npm install. 

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

You can see automated jasmine test results here:

https://migacz85.github.io/data-visualisation/build/js/variability-test.html

However site was manual tested also:

Variability page:

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

Bitcoin analyse page:

1. Charts:
    1. Are displaying data correctly
    2. Correctly link between all charts.
    3. Bubble charts are selecting months correctly
    4. Volume charts are selecting range of data correctly.
    5. Days of week are selecting weeks correctly.
    5. Days by fluctuation are selecting them correctly.

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

Same situation is with PageMarket folder but the .js file is bundled to build/js/market.js and this one is included in bitcoin.html

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

Automated Jasmine test are available by adding in url of working project:

```
build/js/variability-test.html
```

## Credits

## Media

Gif animation used to load the page use in this project:
https://cdn.dribbble.com/users/267/screenshots/1927432/loading.gif


### Acknowledgements

- This project heavily depends on d3, dc, crossfilter .js librarys
- When creating this project I used this examples - without them I could not complete this project:  
    - https://dc-js.github.io/dc.js/examples/
    - https://dc-js.github.io/dc.js/
- In this place I want to say thank You for the great work and fantastic open source library's that are free to use. I also want to thank you to codeinstitute.net for showing me this.