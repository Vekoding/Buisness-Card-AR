export default function Logo (id, scene) {
  let logo = new THREE.Group();
  let logoRing = null;
  const buildLogo = (id) => {

          const loader = new THREE.ColladaLoader();
          // load a resource
          loader.load(
            // resource URL
            './asset/3D/logo0.dae',
            // called when resource is loaded
            function ( object ) {
              if (object.scene == undefined) return;
              const daeScene = object.scene;
              let objectScene = [];
              daeScene.children.map( i => objectScene.push(i));
              let j = 0;
              objectScene.map( i => {
                i.material = new THREE.MeshPhongMaterial({color: '#87d3f8'});
                i.name = 'object'+j;
                j+= 1;
                logo.add(i);
              })
              logo.name = 'logo';
              logo.rotation.y = 2*Math.PI;
              logoRing = scene.getObjectByName('object5');

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

  }

  this.update = () => {
    logo.visible = true;
    if (logoRing == null ) return;
    logoRing.rotation.y += 0.02;
    logoRing.rotation.x += 0.01;
  }


  this.setPosition = (x, y, z) => {
    if ( logo == null ) return;
    logo.position.set(x, y + 3 , z);
  }

  this.scale = (n) => {
    if ( logo == null ) return;
    logo.scale.set(n,n,n);
  }

  this.rotate = (x, y, z) => {
    if ( logo == null ) return;
    logo.rotation.set(x, y, z);
  }

  this.hide = () => {
    logo.visible = false;
  }

  this.getMesh = () => {
    return logo;
  }

  buildLogo(id);
}
