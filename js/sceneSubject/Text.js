export default function Text(buisnessCard) {
  var canvas = document.getElementById('canvas2D');
  var ctx = canvas.getContext('2d');

  function changeCanvas() {
      ctx.font = '10pt Arial';
      ctx.fillStyle = 'black';
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('Say Hello from the other siiiiiiiiiide,\n i wish i can have some time', canvas.width / 2, (canvas.height / 2) + 25);  // TODO : Texte doit pouvoir être modifié
  }

  const buildProfil = () => {
    let text = new THREE.Group();
    // create background
    const planeHeight = size.h*2+0.5;
    const planeWidth = size.w;

    const textWidth = size.w;
    const textHeight = size.h*2+0.5;
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = false;
    let materialCanvas = new THREE.MeshBasicMaterial({ map: texture });
    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, materialCanvas);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.rotation.z = Math.PI;
    text.add(mesh);

    return text;
  }

  let text = buildProfil();

  this.update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      text.visible = true;
      changeCanvas();
  }

  this.hide = () => {
    text.visible = false;
  }

  this.scale = (scaleFactor) => {
    text.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    text.position.set(x + size.w + 0.5 , y, (z - size.h/2 - 2)/2);
  }

  this.rotate = (x, y, z) => {
    text.rotation.set( x, y, z);
  }

  this.getMesh = () => {
    return text;
  }

}
