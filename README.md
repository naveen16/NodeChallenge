## Simple NodeJS Web Application

To access the application visit the following link:
<a href="http://ec2-18-236-89-7.us-west-2.compute.amazonaws.com/nodejs/" target="_blank">NodeJS Web App</a>

### Instructions to Run locally

To run this web application clone the repository and run ```node server```
You must have NodeJS installed and within that, ************add all packages that need to be installed*********

#### Project Description

This web app has 2 main url paths: /posts and /aboutme

/posts

This url path makes a request to this url(https://jsonplaceholder.typicode.com/posts) and it formats the data and displays it with EJS.

/aboutme
By default displays the questions and answers required. Also have the option to add a query parameter 
with ```?q={parameter}``` (without the braces)

This dispalys a single question/answer based on the parameter
