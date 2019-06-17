/**
*   SceneManager.js (High Level Component)
*     create scene,renderer,camera
*     init SceneSubjects
*     update everything at every frame
*
*     it's depict the link between AR part and the application in the application
**/

// TODO: add a fake card with fake position

import GeneralLights from './sceneSubject/GeneralLights';
import Card from './sceneSubject/Card';
import Plane from './sceneSubject/Plane';
import BuisnessCard from './sceneSubject/BuisnessCard';



export default function SceneManager(canvas) {

  const buildScene = () => {
    const scene = new THREE.Scene();
    return scene;
  }

  const buildRender = () => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    return renderer;

  }

  const buildCamera = () => {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 10, -20 );
    return camera;
  }

  const createSceneSubject = (scene) => {
    const sceneSubjects = [
      //new Card(0, scene, cardPosition, size, angle)
      new Card(0, scene, buisnessCard)
    ];
    return sceneSubjects;
  }

  const markerFound = () => {
    return document.getElementById('markerFound').checked ;
  }

  const scene = buildScene();
  const renderer = buildRender();
  const camera = buildCamera();

  new GeneralLights(scene);
  new Plane(scene);

  const buisnessCard = new BuisnessCard(scene);

  const sceneSubjects = createSceneSubject(scene);
  sceneSubjects.push(buisnessCard);

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.update();

  this.update = () => {
    if (markerFound()) {
      sceneSubjects.map( i => i.update());
    }
    else{
      sceneSubjects.map( i => i.hide());
    }
    renderer.render(scene, camera);

  }

}
