---
title: "Interactive calculator: two way data binding in AngularJS"
date: 2013-12-29
---
One of the most infamous and feared classes in ECE 1B is ECE 103: Discrete Mathematics. Most people that I've asked about it have unequivocally told me that it was the worst and most difficult class they've taken. Because of this, I've made an effort to try to read up on some elementary number theory before the term begins. One thing that I came upon and decided to implement in a small program was Euclid's algorithim for finding the greatest common denominator. You can see the final product [here](http://www.victorszeto.com/gcd-calc).

## An interactive calculator
Calculating the GCD is simple enough. Euclid's algorithm can be described like this: 

* Find the remainder of two integers `a` and `b`. 
* Replace `a` with `b` and `b` with the remainder
* Repeat until the remainder is zero.
* The final `b` value is the GCD.
* This works because the final `b` divides the final `a`, and the final `a` divided the previous `a`, and so on,

This can be easily implemented in a program (here in C#):
```cs
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b,a%b);
}
```
This can be trivially translated to JavaScript and then made to accept user input in various ways, for example,  Mike Soares' PHP [implementation](https://github.com/mikesoares/gcd_calculator) uses the URL - [http://www.example.com/gcd.php?a=12&b=20](http://www.example.com/gcd.php?a=12&b=20), for example. I used AngularJS' two-way binding two make a more "interactive" calculator that would output the calculated GCD without pressing any keys after typing in the numbers.

### AngularJS variable binding

As usual, I create my gcdCalc app:
`app = angular.module('gcdCalc', [])`

I declare it as the app it my HTML: `<html ng-app="gcdCalc">`. I declare my controller, passing it `$scope` as its only dependency.

`app.controller('gcdController', function($scope) {`

In my HTML, I create two `<input>` fields, with the `ng-model` attribute as two new variables, `aInput` and `bInput`. The corresponding variables and `<input>` tags are now bound together: any change in the variables will change the input, and any change in the input will change the variables. 

Now, I use `$scope.$watchCollection` to watch `aInput` and `bInput` for changes, and then if they are changed, I apply the `gcd()` function to the two inputs and store the result in another variable.

Finally, I write all of this information in my HTML with the single way binding: `gcd( {{aInput}}, {{bInput}} ) = {{gcdOutput}}`. 

###Result
Now I have an interactive calculator that automatically updates the webpage as I type. Doing this project really made apparent to me the power and simplicity of AngularJS, and how easy it is to make really cool self-updating pages, like single-page websites or webapps. You can see the final calculator program at [gcd-calc](http://victorszeto.com/gcd-calc), and the source code [here](http://www.victorszeto.com/gcd-calc/gcd.js).
