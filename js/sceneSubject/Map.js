export default function Map(buisnessCard) {

  const size = buisnessCard.getSize();
  let pin = new THREE.Group();

  const buildMap = () => {
    let map = new THREE.Group();
    // create Map placeholder
    const planeHeight = size.w;
    const planeWidth = size.w;
    let texture = (new THREE.TextureLoader()).load('./asset/textures/map0.jpg');
    const material = new THREE.MeshLambertMaterial( { map : texture });

    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
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

    return map
  }

  this.update = () => {
    map.visible = true;
    pin.rotation.y += 0.01;
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
