export default function Button(buisnessCard) {

  const size = buisnessCard.getSize();

  let btn1 = new THREE.Mesh();
  let btn11 = new THREE.Mesh();
  let btn2 = new THREE.Mesh();
  let btn3 = new THREE.Mesh();
  let btn4 = new THREE.Mesh();
  let btn5 = new THREE.Mesh();

  const buildButton = () => {
    let button = new THREE.Group();
    // create button 1

    const loader = new THREE.ColladaLoader();
    // load a resource
    loader.load(
      // resource URL
      './asset/3D/hex.dae',
      // called when resource is loaded
      function ( object ) {

        if (object.scene == undefined) return;
        const daeScene = object.scene;
        let objectScene = [];
        daeScene.children.map( i => objectScene.push(i));
        let j = 0;
        objectScene.map( i => {
          i.material = new THREE.MeshPhongMaterial({color: 'pink'});
          j+= 1;
          btn1.add(i);
        })
        btn1.scale.set(0.5,0.5,0.5);
        btn1.translateY(1);
        btn1.rotation.y = Math.PI;
        btn1.rotation.z = -Math.PI;

        btn11 = btn1.clone();

        btn2 = btn1.clone();
        btn2.position.set(1, 1, 0);
        button.add(btn2);

        btn3 = btn1.clone();
        btn3.position.set(-1, 1, 0);
        button.add(btn3);

        btn4 = btn1.clone();
        btn4.position.set(-0.5, 0.1, 0);
        button.add(btn4);

        btn5 = btn1.clone();
        btn5.position.set(0.5, 0.1, 0);
        button.add(btn5);

        button.add(btn11);
        button.rotation.x = -Math.PI/2;
        button.scale.set(1.8,1.8,1.8);
        button.translateY(-1);

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
    return button
  }

  let currentbtn = 1;
  let frameUntilNextButton = 0;

  const rotateAnimation = (btn,btn2) => {
    if (btn.rotation.y <= Math.PI) {
      btn.rotation.y += 0.05;
      btn2.rotation.y -=0.05;
    }
    else {
      btn.rotation.y = Math.PI;
      btn2.rotation.y = 0;
      currentbtn += 1;
      if (currentbtn > 5) {
        currentbtn = 1;
      }
      frameUntilNextButton = 1000;
    }
  }

  const buttonManager = () => {
    //console.log('Button manager : { currentbtn : '+ currentbtn +' frameUntilNextButton : ' + frameUntilNextButton + ' }');
    if (currentbtn == 1 && frameUntilNextButton == 0) {
      rotateAnimation(btn11, btn5);
      return;
    }
    if (currentbtn == 2 && frameUntilNextButton == 0) {

      rotateAnimation(btn2, btn11);
      return;
    }
    if (currentbtn == 3 && frameUntilNextButton == 0) {
      rotateAnimation(btn3, btn2);
      return;
    }
    if (currentbtn == 4 && frameUntilNextButton == 0) {
      rotateAnimation(btn4, btn3);
      return;
    }
    if (currentbtn == 5 && frameUntilNextButton == 0) {
      rotateAnimation(btn5, btn4);
      return;
    }
    else {
      frameUntilNextButton -= 1;
      return;
    }
  }

  this.update = () => {
    button.visible = true;
    buttonManager();
  }

  this.hide = () => {
    video.visible = false;
  }

  this.getMesh = () => {
    return button;
  }

  this.scale = (scaleFactor) => {
    button.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  this.setPosition = (x, y, z) => {
    button.position.set(x + size.w + 0.5, y, z + size.h + 1.5);
  }

  this.rotate = (x, y, z) => {
    button.rotation.set(x, y, z);
  }

  let button = buildButton();

}
