
const colors = {
  black:0x0d040f,
  grey:0xdee7e8,
  white:0xf9f9f9,
  blue:0x468189
}

export default function Map(buisnessCard) {

  /** DRAW STATIC MAP **/
const key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w';

// Create an instance of Mapbox.
const mappa = new Mappa('Mapbox', key);

// Options for map
const options = {
  lat: 48.8375,
  lng: 2.58743,
  zoom: 18,
  width: 2000,
  height: 2000,
  scale: 1,
  pitch: 0,
  style: 'light-v10'
};

/** Create the static map reference.
*   ( static map because in AR, it's would be difficult for the user to
*   use it but for the 2D version, it should be an interractive map )
*/
  const myMap = mappa.staticMap(options);

  const size = buisnessCard.getSize();
  let pin = new THREE.Group();

  let canvas = document.getElementById('canvasMap');
  let ctx = canvas.getContext('2d');
  canvas.width = (500/4)*3;
  canvas.height = 300/(3.1);

  function changeCanvas() {
      ctx.font = '30pt Montserrat';
      ctx.fillStyle =  'rgba(255, 255, 255, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#468189';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('LYNKWARE', canvas.width/2, canvas.height/2 -10 );
      ctx.fillStyle = '#0d040f';
      ctx.font = '10pt Montserrat';
      ctx.fillText('2 bis rue Alfred Nobel, CHAMP-SUR-MARNE', canvas.width / 2, (canvas.height / 2) + 20 );
  }

  const buildMap = () => {
    let map = new THREE.Group();
    // create Map placeholder
    const planeHeight = size.w;
    const planeWidth = size.w;
    let texture = (new THREE.TextureLoader()).load(myMap.imgUrl);
    const material = new THREE.MeshLambertMaterial( { map : texture });
    material.map.minFilter = THREE.LinearFilter;
    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.rotation.z = Math.PI;
    map.add(mesh);

    // load Map pin 3D model

    const loader = new THREE.ColladaLoader();
    // load a resource
    loader.load(
      // resource URL
      './asset/3D/mappin.dae',
      // called when resource is loaded
      function ( object ) {

        if (object.scene == undefined) return;
        const daeScene = object.scene;
        let objectScene = [];
        daeScene.children.map( i => objectScene.push(i));
        let j = 0;
        objectScene.map( i => {
          i.material = new THREE.MeshPhongMaterial({color: 'red'});
          j+= 1;
          pin.add(i);
        })
        pin.scale.set(0.4,0.4,0.4);
        pin.translateY(1);
        pin.rotation.y = Math.PI;
        pin.rotation.z = -Math.PI/2;
        map.add(pin);
      },
      // called when loading is in progresses
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
  );




  const mapPopUp = () => {

    const popUp = new THREE.Mesh();

    // Pop Up placeholder

    const planeWidth = size.w / (1.5);
    const planeHeight = size.h /3;
    const material = new THREE.MeshLambertMaterial( { color: colors.white });
    material.side = THREE.DoubleSide;
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
    } )( roundedRectShape, 0, 0, planeWidth, planeHeight, .25 );

    var planeGeo  = new THREE.ShapeBufferGeometry( roundedRectShape );
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.translateY(.5);
    mesh.translateX(.5);

    popUp.add(mesh);

    // Logo

    const logoWidth = (size.w/2)/4;
    const logoHeight = (size.w/2)/4;
    let textureLogo = (new THREE.TextureLoader()).load('./asset/textures/logo0.png');
    let materialLogo = new THREE.MeshBasicMaterial({ map: textureLogo });
    materialLogo.transparent = true;
    materialLogo.map.minFilter = THREE.LinearFilter;
    const logoGeo = new THREE.PlaneBufferGeometry(logoWidth, logoHeight);
    const logo = new THREE.Mesh(logoGeo,  materialLogo);

    logo.translateY(1);
    logo.translateX(1);
    logo.translateZ(.1);

    // Text

    const textWidth = ((size.w/2)/4)*3;
    const textHeight = size.h/3;
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let materialText = new THREE.MeshBasicMaterial({ map: texture });
    materialText.map.minFilter = THREE.LinearFilter;
    materialText.transparent = true;
    const textGeo = new THREE.PlaneBufferGeometry(textWidth, textHeight);
    const text = new THREE.Mesh(textGeo,  materialText);

    text.translateY(1);
    text.translateX(2.5);
    text.translateZ(.1);

    popUp.add(text);

    popUp.add(logo);

    popUp.rotation.y = Math.PI;
    popUp.translateX(-4.5);

    map.add(popUp);
  }

    mapPopUp();
    return map
  }

  this.update = () => {
    map.visible = true;
    pin.rotation.y += 0.01;
    changeCanvas();
  }

  this.hide = () => {
    video.visible = false;
  }

  this.getMesh = () => {
    return map;
  }

  this.scale = (scaleFactor) => {
    map.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    map.position.set(x, y, z + size.h + 1.5);
  }

  this.rotate = (x, y, z) => {
    map.rotation.set(x, y, z);
  }

  let map = buildMap();
}
