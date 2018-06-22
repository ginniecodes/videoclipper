# Videoclipper

A React.js application to cut clips using HTML5 Media Fragments and Miligram CSS
Framework.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Usage

Running this project is quite simple, in your command line put the commands that belongs to your Package Manager for JavaScript.

*NPM*

```
$ git clone https://github.com/jhia/videoclipper.git
$ cd videoclipper
$ npm install
$ npm start
```

*Yarn*

```
$ git clone https://github.com/jhia/videoclipper.git
$ cd videoclipper
$ yarn
$ yarn start
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you need to custom any configuration file and build tool performed by Create React App, you can use this command, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them.

## Improvements

In fact, this application can:
- Play a video from any valid format (mp4/Webm).
- Cut a slice of the video and play it as clip.
- Edit a clip, changing when it starts and stop.
- Delete a clip.
- Save a clip for persistent use (Not ready yet).
- Autoplay all the clips.
- 3 seconds wait loader before next video.
- Hotkeys (left and right arrow) to go previous and next video.
- Hotkeys (space) to play/pause the video. (Not ready yet)
- Use a video in the web or your file system.
- Get the source of a video that has been dropped to the app.

## To Do:
- A list of previously edited videos.
- Fullscreen mode.
