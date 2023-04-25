# fitness-fiend

Focus on your fitness goals while these nerds figure out how to track it!

## Description

Fitness Fiend is a fitness tracker web application that is designed to help users track their fitness goals and progres.  The app will allow users to create an account, set fitness goals, and track their progress through creating and tracking their workouts and meals.  The app will provide users with the ability to visualize their progress and stay motivated by implementing chart.js to provide a chart that shows calories burned, calories consumed, goal weight, and current weight. By securely logging in and out and protecting user data, the app provides a secure and private way for users to track their fitness progress.

We were motivated to create Fitness Fiend to fulfill our user story of wanting an app that allows users to create an account and log in to track their fitness goals and progress. 

Based on the user story and acceptance criteria provided, Fitness Fiend solves the problem of helping users track their workouts and meals all in one place so that they can stay on top of their progress while keeping their eye on their fitness goals. It provides users with a platform to set their fitness goals, track their workouts and meals, and view their progress over time through charts. Overall, the app helps users stay motivated to achieve and attain their set fitness goals.  

We learned how to apply our technical skills such as using Handlebars.js for rendering views, using Express for backend logic, using Sequelize for interacting with the database, incorporating Chart.js into functionality, following the MVC paradigm for organization, using express-session and cookies to authenticate users and protect user data, and protecting sensitive information using dotenv. 

We also learned how to understand user needs and preferences by becoming the user as we created that app knowing that we had to provide users with a platform to set fitness goals, track workouts and meals and viewing progress over a period of time.  This resulted in us creating multiple front end javascript pages to match respective handlebars layouts.  We also incorportated the importance of securely logging in and out of the app, protecting user data, and responding appropriately to GET and POST requests. Finally, creating this app provided an opportunity to test and refine the app based on user feedback, and learn about best practices for creating effective and engaging fitness tracking apps.

Some challenges we faced were connecting our backend routes to the front end handlebars; Implementing chart.js was a challenge in creating a chart that would total the sum of our data from different pages; Wrong code or route placement in our models, controllers, and handlebars; Overcompensating with unnecessary duplicate code.  

Ideas for future development: 
- Add the ability to update and delete existing user workouts, meals, and profiles 
- Add workout playlist
- Social media integration
- Motivational quotes everytime you login
- Provide personalized recommendations
- Gamification
- Syncs with existing fitness tracking devices


LINK TO DEPLOYED WEBAPP VIA HEROKU: 


## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how_to_contribute)


## Installation

To install all packages and dependencies, run "npm i."

The following packages and dependencis are necessary to run the application: 

    bcrypt^5.0.0
    connect-session-sequelize^7.0.4
    dotenv^8.2.0
    express^4.17.1
    express-handlebars^5.2.0
    express-session^1.17.1
    mysql2^2.2.5
    sequelize^6.3.5
    chart.js^4.0.0

Run the schema.sql file in MySQL Workbench.  

After seeding the database, run the below command in MySQL Workbench as well.  This gets around an error.  

    SET GLOBAL sql_mode = '';


## Usage

When the user arrives at the homepage of the application they are met with a message to "Login to see the good stuff!"  

    ![alt text](assets/images/screenshot.png)

When they click the login button they are taken to a page that displays an option to log into the app or sign up if they have not already become a user.  

    ![alt text](assets/images/screenshot.png)

Once logged in, the user is brought to a profile page that displays a chart with their progress.  The chart tracks the user's calories consumed, calories burned, current weight, and goal weight.  

    ![alt text](assets/images/screenshot.png)

When the user clicks on the "meals" link, they are taken to a meals page where they can add a meal and also see all meals they have added.  

    ![alt text](assets/images/screenshot.png)

When the user clicks on the "workouts" link, they are taken to a workouts page where they can add workout information and see all meals they have added.  

    ![alt text](assets/images/screenshot.png)

When the user clicks on the "user" link, they are taken to a user settings page where they can enter their stats such as current weight, goal weight, current height, age, and current bmi.  

    ![alt text](assets/images/screenshot.png)

At any time, the user can click the "profile" link and be taken to their user profile page that shows their progress with the chart.  


## Credits

Roye Bustan
Anthony Ayala Arellano
Eduardo Enquirez
Patricia Alberto
Bryan Swarthout 
Hunter Adcock
Shawn Tschoepe


## License

Please refer to the MIT license in the repo.  


## How to Contribute

This application is not taking contributions at the time.  

For any questions, please refer to the project repo here: https://github.com/Rbustan0/fitness-fiend


