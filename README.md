# Schmemory game🕹

## Getting Started

This boilerplate includes Webpack, Babel and SASS. To install the dependecies and run the code, run the following commands

```bash
npm install
npm start
```

## About the project

This is a simple memory game developed with vanilla JavaScript, HTML and SCSS.
You can match the cards, if you get it right, the cards will keep facing up. But if you get it wront they will flip back.
The game keeps a track of how many turns you have played and your best score is saved on localStorage.
You also have the option to start over in the middle of the game, or when you finish matching all cards by pressing the `refresh` button.

The focus for this project was:

- Make sure the simple functionalities work the best as possible
- Render cards through the Javascript so it makes it easier to change the images we want to use or the number of cards
- Add a refresh button so user doesn't need to refresh the whole page to start a new game
- Save best score based on the amount of turns necessary to match all the cards

Can be improved:

- Add more css animations to provide a nicer UX
- Show a message when the game is finished
