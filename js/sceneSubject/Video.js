/** Video > SceneSubject
*   Responsible exclusively for setting up and updating the scene
*   it doesn't know abouts its content
*     constructor that takes a Scene object
*     a public method update, hide, getMesh, scale, setPosition, rotate
*     a SceneSubject can contain severals SceneSubjects
**/

export default function Video(buisnessCard, scene) {

  const size = buisnessCard.getSize();

  const buildVideo = () => {
    let video =  new THREE.Group();
    // create video placeholder
    const planeHeight = size.h*2+0.5;
    const planeWidth = size.w;
    let videoElement = document.getElementById( 'video' );
    let texture = new THREE.VideoTexture( videoElement );
    texture.rotation = -1;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    texture.needsUpdate = true;
    const material =new THREE.MeshLambertMaterial( { map: texture });
    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    video.add(mesh);
    return video;
  }

  this.update = () => {
    video.visible = true;
  }

  this.hide = () => {
    video.visible = false;
  }

  this.getMesh = () => {
    return video;
  }

  this.scale = (scaleFactor) => {
    video.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    video.position.set(x + size.w + 0.5 , y, (z - size.h/2 - 2)/2);
  }

  this.rotate = (x, y, z) => {
    video.rotation.set(x, y, z);
  }

  let video = buildVideo();

}
