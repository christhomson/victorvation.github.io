---
title: "A grade checker webapp in AngularJS/PHP"
date: 2013-12-24
---
Waterloo Fall 2013 "unofficial grades" were released last Monday, and by the looks of the ECE Facebook group, I wasn't the only one who was refreshing Quest (the system Waterloo uses for student accounts) until the marks came up at 12 am. All marks were available except for ChE 102. I decided to make a mark checker so I would know when the rest of the grades became available. You can see the final product at [victorszeto.com/grades](http://victorszeto.com/grades/).

## A grade checker webapp in AngularJS/PHP
I found a [Quest Mark Checker](http://bn.gs/quest-markcheck.php) written in PHP by Alexander Huynh, which scrapes Quest and outputs the raw HTML for grades into a text file. It then prints the grades and writes the raw HTML of the grades to a text file. However, there were a few reasons why this wouldn't work when building my webapp: 

1. Back-end - the PHP script was somewhat convoluted and didn't actually parse the information, and so was difficult to use in a program.
2. Front-end - the PHP script output was just the raw HTML table of grades from Quest, which although is fine, I wanted to add some functionality and make it nicer to look at.

###Hacking together a PHP back-end API

For (1), I needed to make the output like an API, so I could easily process the response in order to do part (2).

Since the existing scraper worked well-enough, I decided to change it as little as possible. I added a new variable `$updated`, which was initialized to `false`, and would only return true if the grades file was modified. I also changed the output to JSON, making it a bit more "API-like" to make it easier to process the response.

###Creating a front-end in AngularJS

For (2), I could have just used CSS and styled the output, however, I decided that I wanted to have the mark status updated every time I clicked a button. To do this, I wrote a front-end in AngularJS.

#### Setting up AngularJS

I chose <a href="http://angularjs.org">AngularJS</a> simply because it looked relatively simple and seemed intuitive to implement. I changed the `<html>` tag to `<html ng-app>`, and linked to AngularJS from the CDN, and then defined the "controller" for my body using `<body ng-controller="gradeController">`. Finally, I added `{{updated}}` in my HTML, which is a binding to the variable `$scope.updated` - it will automatically update when the variable is changed, and vice-versa.

In the HTML, I gave my refresh button two Angular directives: `ng-disabled`, which disables the button when the expression is true, and `ng-click`, which executes the expression when the button is clicked:

`<button ng-disabled="btnDisabled" ng-click="checkMarks()">`

Now, when `$scope.btnDisabled` is true, the button will be disabled, and when the button is clicked, the function `$scope.checkMarks()` will be called.


Then I wrote the JavaScript for the refresher. It contains a service, `GradeService`, and a controller, `GradeController`.

####Grade checking service
I make a custom service to hold my HTTP request and response processing. This isn't strictly necessary for a simple app, but I chose to do so anyway. My service has a single dependency, `$http`, and contains a single method, `get`, which receives a callback as an argument and sends a GET request to the API.

Since I already changed the PHP script to return JSON, I can use a simple selection statement to process the JSON response, and then fire the callback.
```javascript
if (data.allAvailable == true)
	callback("Yes!")
else 
	callback("Nope.")
```
####Grade controller
Finally, I can create my controller. I initialize my two variables and create my function, `checkMarks`.

I want the button to be disabled and the text to read "loading..." while my HTTP request is running, so in the function, I immediately change `$scope.updated` to `"loading..."` and `$scope.btnDisabled` to true. Then I use the built in AngularJS method for a HTTP request: `$http.get('http://victorszeto.com/gradeAPI.php').then()`. 

###Final product
I've now created my first webapp, using "API-centric" design. 

* A PHP script scrapes Quest for marks, checks if there are any new grades, and returns a JSON object with that information.
* A web page shows this information with some pretty CSS styling and a button to refresh the results. 
* An AngularJS script gets takes this information and writes a string depending on what was returned. A method bound to the button on the page updates the information without reloading the page.

A demo of this can be seen at [victorszeto.com/grades](http://victorszeto,com/grades), or you can view the [AngularJS source](http://victorszeto.com/grades/gradeRefresh.js). My next step will be making my replacing the hacked-together PHP scraper with a mark scraper I will write for myself in Node.js.