/** Video > SceneSubject
*   Responsible exclusively for setting up and updating the scene
*   it doesn't know abouts its content
*     constructor that takes a Scene object
*     a public method update, hide, getMesh, scale, setPosition, rotate
*     a SceneSubject can contain severals SceneSubjects
**/

export default function Video(buisnessCard, scene) {



  const size = buisnessCard.getSize();

  const buildVideo = (geometry) => {
    let video =  new THREE.Group();
    // create video placeholder
    const planeHeight = size.h*2+0.5;
    const planeWidth = size.w;
    const videoElement = document.getElementById( 'video' );
    const loader = new THREE.TextureLoader();
    let texture = new THREE.VideoTexture( videoElement );
		// it's necessary to apply these settings in order to correctly display the texture on a shape geometry
		texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.repeat.set( 0.02  , 0.02 );

    const material =new THREE.MeshLambertMaterial( { map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.rotation.z = -Math.PI;
    mesh.scale.set( 0.125, 0.125, 0.125 );
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
    video.position.set(x + size.w/2 + 0.5, y, z + size.h/2 - 0.1);
  }

  this.rotate = (x, y, z) => {
    video.rotation.set(x, y, z);
  }

  /** Creating a rounded rectangle **/

  let roundedRectShape = new THREE.Shape();

  ( function roundedRect( ctx, x, y, width, height, radius ) {
    ctx.moveTo( x, y + radius );
    ctx.lineTo( x, y + height - radius );
    ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
    ctx.lineTo( x + width - radius, y + height );
    ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
    ctx.lineTo( x + width, y + radius );
    ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
    ctx.lineTo( x + radius, y );
    ctx.quadraticCurveTo( x, y, x, y + radius );
  } )( roundedRectShape, 0, 0, 50, 50, 2 );

  let geometry = new THREE.ShapeBufferGeometry( roundedRectShape );

  let video = buildVideo(geometry);

}
