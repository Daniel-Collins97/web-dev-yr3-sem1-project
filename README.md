# Web Development Year 3 Semester 1 Project

This is a RESTful API app designed by Daniel Collins, 3rd year I.o.T student, 20076240.

### Prerequisites

For this project, I used the "[Intellij Webstorm](https://www.jetbrains.com/webstorm/)" platform, which allowed me to write the programme and "[Postman](https://www.getpostman.com/)" which allowed me to perform the RESTful testing of the routes.

### The Project Contents
This Project is deisgned to give a database to Rugby Clubs, with the ability to store Players, Pitches, Teams and Users.
There are multiple CRUD implementations in this project, including the following;
- Signing up as a user
- Logging in as an already signed up user (with authentication)
- Adding a Player/Pitch/Team
- Searching a Player/Pitch/Team using multiple different parameters
- Editing a Player/Pitch/Team 
- Deleting a Player/Pitch/Team/User

**Persistence Approach**
For this Project, I stored my data using the MongoDB library, and "[MLab](https://mlab.com/)". This gave me a database to store all of my Schemas and subsequent Objects within these schemas. I have created a new collection for each Players, Teams, Pitches and Users, all within the Same Database, and connected to these Collections/Database within the project to ensure all of the changes made to the objects is being saved.

**Git Approach**
I have used "[Github](https://github.com/)" for this project to keep track of all commits I have made throughout the project. The Link to my GitHub repo for this project is found [Here](https://github.com/Daniel-Collins97/web-dev-yr3-sem1-project)

**Developer Experience**
Where possible, I have tried to print out relevent information to the user in the response section of the RESTful server, which hopefully makes the functions and their actions easier to understand. I have also created a base Frontend for the app. which shows what the app should look like in the future

## Built With

* [Intellij Webstorm](https://www.jetbrains.com/webstorm/) - The app used for the code
* [Github](https://github.com/Daniel-Collins97/web-dev-yr3-sem1-project) - Version Control System used
* [Postman](https://www.getpostman.com/) - The RESTful server used to test the routes
* [Heroku](https://www.heroku.com/) - Deployed Version of app on Heroku website


## Authors

* **Daniel Collins**

This was a solo project completed as part of my studies in the WIT I.o.T Degreee
