# MackList

PURPOSE: 
This is a shopping app like craigslist where customers can buy and sell products.

OVERVIEW:
This is a Full Stack MERN app. We have used Node JS and Express for server side working and React for client side working. and MongoDB is being used as a database. We have created two different database User and Ad database. User database stores the username, email address and password and Ad database is storing title, image link, location, description and cost of product.
We have used Nodemailer to implement the Forgot password functionality. We are using session and passport JS to implement user authentication. so that user can login and post and view Ads

HOW TO USE:
User will navigate to the app and will see alll the available items to be sold. User can click on each ad card to view the Product details. We also have the functionality to filter out the results showing on screen respective to location, department and low to high and high to low price range. Every Ad has contact information, user can contact the seller via email or phone.
Then if user wants to sell something they will have to login to the app. If they are not a memeber yet they can choose signup option that takes unique username, unique email and password. User will successfully signup if not already a member. If user is a member but forgets his password. They can click on forgot password and they will be sent a random 8 digit code on their email address, that becomes their new password and once the user is log in they can change password from change password option.
Once user is logged in successfully, they can visit their profile. On profile page they will be welcomed with their username and they will see all the ads they have posted and they also have option to create new posts. Every post has an option to be edited and an option to delete the Ad.

DEPLOYED VERSION LINKS:
HEROKU Link: http://macklist.herokuapp.com/
Github Link: https://github.com/atifrabbani1/MackList.git

TECHNOLOGIES USED:
Node JS, Express JS, React, MongoDB, Axios, Bootstrap, Passport JS, Nodemailer.

Team Members:
This app is part of a group project developed by 4 developers.
Atif Rabbani
Madison O'farrill
Carlo Ortega
Khiry Hill