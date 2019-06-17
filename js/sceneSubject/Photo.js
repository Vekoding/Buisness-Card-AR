/** Photo > SceneSubject
*   Responsible exclusively for setting up and updating the scene
*   it doesn't know abouts its content
*     constructor that takes a Scene object
*     a public method update, hide, getMesh, scale, setPosition, rotate
*     a SceneSubject can contain severals SceneSubjects
**/

export default function Photo(buisnessCard, scene) {

  const size = buisnessCard.getSize();

  const buildPhoto = () => {
    let photo =  new THREE.Group();
    // create photo placeholder
    const planeHeight = size.h*2+0.5;
    const planeWidth = size.w;

    let texture = (new THREE.TextureLoader()).load('./asset/textures/photo0.jpg');
    const material =new THREE.MeshLambertMaterial( { map: texture });
    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.rotation.z = Math.PI;
    photo.add(mesh);
    return photo;
  }

  this.update = () => {
    photo.visible = true;
  }

  this.hide = () => {
    photo.visible = false;
  }

  this.getMesh = () => {
    return photo;
  }

  this.scale = (scaleFactor) => {
    photo.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    photo.position.set(x + size.w + 0.5 , y, (z - size.h/2 - 2)/2);
  }

  this.rotate = (x, y, z) => {
    photo.rotation.set(x, y, z);
  }

  let photo = buildPhoto();

}
