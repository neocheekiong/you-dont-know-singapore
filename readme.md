# Do You Know Singapore?
## What we're trying to achieve
Modern online maps always been a source of fascination for me. Even a small city like Singapore holds many hidden places and facts.

This app introduces this fascinating source of information about the world, starting with Singapore.

## How do we do this?
We will ask questions to the user that requires him/her to look at the details on the map and look for answers there. 

## Technologies used
### Map rendering and components
1. [Leaflet.js](https://leafletjs.com/) for handling map tiles and making it responsive and interactive.
2. [Mapbox](https://www.mapbox.com/) for the base map.

### Styling
1. [Animate.css](https://daneden.github.io/animate.css/) for quick css animations.
2. CSS Grid

### DOM Manipulation
1. [jQuery](jquery.com)

### Map Data
1. [Singapore Master Plan 2014 Region Boundary](https://data.gov.sg/dataset/master-plan-2014-region-boundary-web) for the geometric layer of Singapore's Regions

## Approaches
Coming up with an idea was pretty difficult. First I thought of upgrading the Memory Game started during pre-work. I had upgraded it a little and included APIs to use the images from Magic: The Gathering card game. 

However, this was taken up by several other members of the class. 

I thought of using the Taxi Availability data combined with the UV index of the day to form a "Keep Your Skin Glowing" dashboard to show the availability of taxis whenever the UV Index hits a certain level.

I recalled that I would want to create an app for a Certification Board that my employer had set up. It involves databases and an exam component that is currently hosted on an inappropriate platform. I thought we had not enough time for going into databases, so why not do something with a quiz first?

Given that another member of the class is doing a quiz, I decided to differentiate myself by combining a map with a quiz.

I found myself going through the rabbit-holes looking at the map and looking for trivia to ask. It was really enjoyable to me. Now I want to share the enjoyment of the process of learning, exploration and discovery with the users of my app.

### Creation of the App
I had looked under the hood of several map applications, starting with [SGCOVID19 Map Overview](https://sgwuhan.xose.net/) and discovered that the developer had used Leaflet to render the map. Looking through the SG Government APIs, I found OneMap. There was some trouble with CORS when I used OneMap, however. Thus I used Mapbox as demonstrated in Leaflet's starter tutorial.

I also used Moodle's quiz exports to look at what structure a list of quiz questions will take as an inspiration to my quiz.

### MVC
After some comments on MVC in some of my past homework, I decided to make my app here more modular. There are separate files for the map, the quiz, the handlers and the data.