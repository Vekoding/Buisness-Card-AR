/** Card > SceneSubject
*   Responsible exclusively for setting up and updating the scene
*   it doesn't know abouts its content
*     constructor that takes a Scene object
*     a public method update, hide, getMesh, scale, setPosition, rotate
*     a SceneSubject can contain severals SceneSubjects
**/

import Logo from './Logo';
import Profil from './Profil';
import Video from './Video';
import Map from './Map';
import Button from './Button';
import Photo from './Photo';
import Text from './Text';

export default function Card(id, scene, buisnessCard) {

  const calcScaleFactor = (size) => {
    return size.w / 5 ;
  }

  let position = buisnessCard.getPosition();
  let angle = buisnessCard.getAngle();
  let size = buisnessCard.getSize();
  let scaleFactor = calcScaleFactor(buisnessCard.getSize());

  const createSceneSubject = (scene) => {
    const sceneSubjects = [
      new Logo(0, scene),
      new Profil(size, scene, position),
      new Video(buisnessCard, scene),
      new Map(buisnessCard),
      new Button(buisnessCard),
      //new Photo(buisnessCard)
      //new Text(buisnessCard),

    ];
    return sceneSubjects;
  }

  const initObjectPosition = () => {
    sceneSubjects.map( i => i.scale(scaleFactor) );
    sceneSubjects.map( i => i.rotate(0, angle.value, 0));
    sceneSubjects.map( i => i.setPosition(position.x, position.y, position.z) );

  }


  const scale = () => {
    const scaleFactor = calcScaleFactor(buisnessCard.getSize());
    allSceneObjects.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  const updatePosition = () => {
    const position = buisnessCard.getPosition();
    allSceneObjects.position.set(position.x, position.y, position.z);
  }

  const updateRotation = () => {
    allSceneObjects.rotation.set(0,angle.value,0);
  }

  this.update = () => {
    allSceneObjects.visible = true;
    sceneSubjects.map( i => i.update());
    updatePosition()
    scale();
    updateRotation();
  }

  this.hide = () => {
    allSceneObjects.visible = false;
  }

  this.getMesh = () => {
    return allSceneObjects;
  }

  const sceneSubjects = createSceneSubject(scene);
  initObjectPosition();
  sceneSubjects.push(buisnessCard);

  // Create a group of object to simplify rotation
  let allSceneObjects = new THREE.Mesh();
  sceneSubjects.map( i => allSceneObjects.add(i.getMesh()));
  scene.add(allSceneObjects);

}
