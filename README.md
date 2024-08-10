# LightBnb Project


## Description
Lighthouse BnB is an app that will revolutionize the travel industry. It will allow homeowners to rent out their homes to people on vacation, creating an alternative to hotels and bed and breakfasts...There’s nothing else like it! Users can view property information, book reservations, view their reservations, and write reviews. We'll be creating the first ever application to do something like this and we will call it LighthouseBnB.


## Goal
The purpose of this project is to design a database and use server-side JavaScript to display the information from queries to web pages. We will be able to apply our existing knowledge of complex SQL queries, database and ERD (entity relationship diagram) design to integrate the database with a Node backend.


## Dependencies
* bcrypt
* cookie-session
* express
* nodemon
* pg


## Getting Started
### Executing the Program
1. Clone the repository [LightBnB](https://github.com/Rusgyn/LightBnB) to your local device/machine. For reference, see [Github cloning](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) a repository steps.
2. On the [command line](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line), navigate to the root directory of your cloned LightBnb, then access LightBnB_Webapp
```
cd /path/to/where/you/save/LightBnb
```

3. Open the LightBnB webapp folder

Note: your current directory is LightBnB (step #2).

You can use `pwd` command on the command line to see your current directory.

```
cd LightBnB_WebApp
```
4. Install any dependencies using npm install command
```
npm i
```
5. Start database with `startpostgres` command
6. Run the development web server using `npm run local`
7. Open your browser. The app will be served at [localhost: 3000](http://localhost:3000/)


## Image

#### Entity Relationship Diagram

![Entity Relationship Diagram](<Images/LightBnB ERD.png>)

#### ERD Specification

* The app will have users, properties, reservations, and property reviews.
* A user will have a name, email address, and password. 
* A property will have a title, description, costpernight, parking_spaces, numberofbathrooms, and numberofbedrooms. 
* A property will need to have images associated with it, so for now we will store a url for a small thumbnail photo and a large cover photo. 
* A property will need address data associated with it including country, street, city, province, post_code 
* A property can either be active or not active depending on weather the owner is currently renting it out or not. 
* A property will have an owner which will be one of the registered users. 
* A reservation will have a start date and an end date 
* A reservation will be made by a guest, which will be a registered user, and will be associated with a single property 
* A property review will have a message and a rating from 1 to 5 
* A property review can be made by a guest and will be associated with a single reservation 
* A user can own many properties
* A property belongs to one owner
* A user can make many reservation
* A reservation belongs to one guest
* A property can be reviewed by many guests
