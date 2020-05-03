# Do You Know Singapore?
## What we're trying to achieve
Modern online maps always been a source of fascination for me. Even a small city like Singapore holds many hidden places and facts.

This app introduces this fascinating source of information about the world, starting with Singapore.

## How do we do this?
We will ask questions to the user that requires him/her to look at the details on the map and look for answers there. The user can also find out more via Google.

## Technologies used
### Map rendering and components
1. [Leaflet.js](https://leafletjs.com/) for handling map tiles and making it responsive and interactive.
2. [Mapbox](https://www.mapbox.com/) for the base map.

### Styling
1. Materialize CSS
2. CSS Grid

### DOM Manipulation
1. [jQuery](jquery.com)

### Map Data
1. [Singapore Master Plan 2014 Region Boundary](https://data.gov.sg/dataset/master-plan-2014-region-boundary-web) for the geometric layer of Singapore's Regions

## Approaches

### MVC
After some comments on MVC in some of my past homework, I decided to make my app here more modular. There are separate files for the map, the quiz, the handlers and the data.

### Modularization
Questions are set in a way that is expandable.

## User Story
When I enter the website, I want to be wowed by the environment. I want to start getting ready to explore. As I go through the sequences, I want to be drawn into the hidden stories of Singapore. I want to invite the users to google and find out more about these hidden stories.
