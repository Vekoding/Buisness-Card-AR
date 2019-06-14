import SceneManager from './SceneManager';
const colors = {
  black:0x0d040f,
  grey:0xdee7e8,
  white:0xf9f9f9,
  blue:0x468189
}

/**
*   Main.js : entry point to the JS side of the application
*     create the sceneManager
*     attach listeners to the DOM ( can be empty )
*     start the render loop
**/

const canvas = document.getElementById('canvas');
let sceneManager = new SceneManager(canvas);


function render() {
  sceneManager.update();
  requestAnimationFrame(render);
}

function bindEventListeners() {

}

bindEventListeners();
render();
