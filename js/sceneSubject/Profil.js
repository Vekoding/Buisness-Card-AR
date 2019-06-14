/** SceneSubject
*
*
*
**/

export default function Profil(size, scene, position) {

  var canvas = document.getElementById('canvas2D');
  var ctx = canvas.getContext('2d');

  function changeCanvas() {
      ctx.font = '20pt Arial';
      ctx.fillStyle = 'black';
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('Evan Dvorkin', canvas.width / 2, canvas.height / 2);
      ctx.font = '10pt Arial';
      ctx.fillText('Développeur Multimedia', canvas.width / 2, (canvas.height / 2) + 25);  // TODO : Texte doit pouvoir être modifié
  }


  const buildProfil = () => {
    let profil = new THREE.Group();
    // create background
    const planeWidth = size.w;
    const planeHeight = size.h;
    const material =new THREE.MeshLambertMaterial( { color: 'red' });

    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    profil.add(mesh);


    // create text canvas
    const textWidth = size.w/2;
    const textHeight = size.h;
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let materialCanvas = new THREE.MeshBasicMaterial({ map: texture });
    const textGeo = new THREE.PlaneBufferGeometry(textWidth, textHeight);
    const mesh2 = new THREE.Mesh(textGeo,  materialCanvas);

    mesh2.receiveShadow = true;
    mesh2.rotation.x = -Math.PI/2;
    mesh2.translateX(-textWidth/2);
    mesh2.translateZ(0.01);
    profil.add(mesh2);

    // create text canvas
    const photoWidth = size.w/2;
    const photoHeight = size.h;
    let texturePhoto = (new THREE.TextureLoader()).load('./asset/textures/photo0.jpg');
    texture.needsUpdate = true;
    let materialPhoto = new THREE.MeshBasicMaterial({ map: texturePhoto });
    const photoGeo = new THREE.PlaneBufferGeometry(photoWidth, photoHeight);
    const mesh3 = new THREE.Mesh(photoGeo,  materialPhoto);

    mesh3.receiveShadow = true;
    mesh3.rotation.x = -Math.PI/2;
    mesh3.translateX(photoWidth/2);
    mesh3.translateZ(0.01);
    profil.add(mesh3);

    // TODO Plane with shadertexture for gradient black to transparent

    return profil;
  }

  let profil = buildProfil();

  this.update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      profil.visible = true;
      changeCanvas();
  }

  this.hide = () => {
    profil.visible = false;
  }

  this.scale = (scaleFactor) => {
    profil.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    profil.position.set(x, y, z - size.h/2 - 2 );
  }

  this.rotate = (x, y, z) => {
    let  dummy = new THREE.Object3D();
    dummy.scale.set(-1,1,-1);
    scene.add( dummy );
    profil.position.set( position.x, position.y, position.z );
    dummy.add( profil );
    dummy.scale.set(-1,1,-1);
    dummy.rotation.set(x, y, z);
    dummy.scale.set(-1,1,-1);
  }

  this.getMesh = () => {
    return profil;
  }

}
