---
title: "Web Scraping with Node.js"
date: 2013-12-27
---
After writing my [Grade Availability Checker](http://www.victorszeto.com/blog/2013/12/23/a-grade-checker-webapp-in-angularjs-php.html) using AngularJS to serve the information and somebody else's PHP script to scrape Quest for grade information, the next logical step would be to write my own mark scraper. I wrote a program in Node.js to log into Quest, scrape grades and return them as JSON after a request to the server. You can find the source on GitHub: [quest-markscraper](http://github.com/victorvation/quest-markscraper).

##Web scraping in Node.js
I chose Node.js because I already had a little bit of experience in it, and because I wanted to make something "API-like". First, scrape the Quest website for grades, process them, and then print them out in JSON for my AngularJS app to display. 

###Setting the server with Express
Setting up the server in Node is very easy. I used Express just in case I wanted to add more functionality or other API endpoints in the future. 

```JavaScript
var app = express()
app.get('/', callback)
app.listen(port)
```

### Getting to the grades with Request
The first page to access websites is the Waterloo Quest main page, [https://quest.pecs.uwaterloo.ca](https://quest.pecs.uwaterloo.ca/). First of all, I logged in normally and used the Chrome developer console to look at the resulting HTTP request. Using the [request](https://github.com/mikeal/request) package, I created an object to hold the request information: a URL to request, the type of request to send, an object called "headers" with `'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:2.0b6) Gecko/20100101 Firefox'` so that Quest will accept my request, and a "form" with my username, password, and some other information.

I submit a request using `request.post(requestOptions, callback)`. From there, it's just a trial and error process of manually getting the HTTP request, finding the request URL, changing `requestOptions.url` to that new URL, and then nesting the `request.get()` or `request.post()` appropriately until I get to the page that displays the grades.

### Data processing with Cheerio
I used the [Cheerio](http://matthewmueller.github.io/cheerio/) to process the HTML. Cheerio uses jQuery-style syntax to look through the DOM and implements most core jQuery functionality. I create two arrays to hold my `classes` and `grades`, then use Cheerio's `.each()` function to find the corresponding elements and push `$(this).text()` to the array. 

Now, I make sure amount of grades is equal to the amount of classes, i.e. all grades are available, and create a variable `allAvailable` to hold this. Also, I make sure that the length of my arrays is larger than 1, which is error checking just in case something messed up while scraping grades. 

###Sending a JSON Response with Underscore
Next, I use the [Underscore](http://underscorejs.org/) for some object manipulation. I its use `_.object(classes,grades)` to turn my two arrays into key-value pairs using `classes` as the keys and `values` as the values. Next, I use an if statement to determine the state of `allAvailable`: if it's false, I just return that it's false. If it's true, I use `_.extend()` to put all this information together in one object: 
```JavaScript
returnJSON = allAvailable ? _.extend({"allAvailable" : allAvailable}, {grades: gradeObj}) : returnJSON = {"allAvailable" : allAvailable}
```
Finally, I send the response: `res.send(returnJSON)`

### Deployment on Heroku
My current web host doesn't support Node.js, so I needed somewhere else to host my Node server. I decided to use [Heroku](http://heroku.com), since they offer a basic plan that's free. It was pretty easy to set up, and I used their [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) guide which was easy to follow. I also needed to change the port I was listening on to `process.env.PORT`, since I don't know the default port Heroku would use. 

####Aside: Environment variables
My Quest username and password were just typed into the source code, which might have been safe enough on my computer, but wasn't ideal for putting on Heroku, and definitely was a bad idea to push to GitHub. To solve this, I needed to set environment variables using `heroku config:add` to add my username and password to the environment variables, and then change my username and password in the source code to `process.env.questID`. 

###Result
I now have an API written in Node.js and deployed on Heroku. I switched my [Grade Checker](http://victorszeto.com/grades) to send a request to my herokuapp instead of the PHP script. Now the entire stack for the Grades app is written by me, partially using the [MEAN](http://mean.io) stack: MongoDB (which I didn't use), Express.js, AngularJS, and Node.js (which I did use). It is deployed on Heroku at [quest-markscraper.herokuapp.com](http://quest-markscraper.herokuapp.com). You can view the source on GitHub at [victorvation/quest-markscraper](http://github.com/victorvation/quest-markscraper).
