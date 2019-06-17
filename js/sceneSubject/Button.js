const colors = {
  black:0x0d040f,
  grey:0xdee7e8,
  white:0xf9f9f9,
  blue:0x468189
}

export default function Button(buisnessCard) {

  const size = buisnessCard.getSize();

  let btn1 = new THREE.Mesh();
  let about = new THREE.Mesh();
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
          i.material = new THREE.MeshLambertMaterial({color: colors.blue});
          j+= 1;
          btn1.add(i);
        })
        btn1.scale.set(0.5,0.5,0.5);
        btn1.translateY(1);
        btn1.rotation.y = Math.PI;
        btn1.rotation.z = -Math.PI;

      //  btn11 = btn1.clone();
/*
        btn2 = btn1.clone();
        btn2.position.set(1, 1, 0);
        button.add(btn2); */

        btn3 = btn1.clone();
        btn3.position.set(-1, 1, 0);
        button.add(btn3);

  /*      btn4 = btn1.clone();
        btn4.position.set(-0.5, 0.1, 0);
        button.add(btn4);*/

        btn5 = btn1.clone();
        btn5.position.set(0.5, 0.1, 0);
        button.add(btn5);

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

    // About button
    loader.load(
      // resource URL
      './asset/3D/about.dae',
      // called when resource is loaded
      function ( object ) {

        if (object.scene == undefined) return;
        const daeScene = object.scene;
        let objectScene = [];
        daeScene.children.map( i => objectScene.push(i));
        let j = 0;
        objectScene.map( i => {
          i.material = new THREE.MeshLambertMaterial({color: colors.blue});
          j+= 1;
          about.add(i);
        })
        about.scale.set(0.5,0.5,0.5);
        about.translateY(1);
        about.rotation.z = -Math.PI;
        about.rotation.x = -Math.PI;

        button.add(about);
        button.rotation.x = -Math.PI/2;
        button.scale.set(2,2,2);
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

    // Project button
    loader.load(
      // resource URL
      './asset/3D/project.dae',
      // called when resource is loaded
      function ( object ) {

        if (object.scene == undefined) return;
        const daeScene = object.scene;
        let objectScene = [];
        daeScene.children.map( i => objectScene.push(i));
        let j = 0;
        objectScene.map( i => {
          i.material = new THREE.MeshLambertMaterial({color: colors.blue});
          j+= 1;
          btn2.add(i);
        })

        btn2.scale.set(0.5,0.5,0.5);
        btn2.position.set(1, 1, 0);
        btn2.rotation.z = -Math.PI;
        btn2.rotation.x = -Math.PI;
        button.add(btn2);

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

    // Skill button
    loader.load(
      // resource URL
      './asset/3D/skills.dae',
      // called when resource is loaded
      function ( object ) {

        if (object.scene == undefined) return;
        const daeScene = object.scene;
        let objectScene = [];
        daeScene.children.map( i => objectScene.push(i));
        let j = 0;
        objectScene.map( i => {
          i.material = new THREE.MeshLambertMaterial({color: colors.blue});
          j+= 1;
          btn4.add(i);
        })

        btn4.scale.set(0.5,0.5,0.5);
        btn4.position.set(-0.5, 0.1, 0);
        btn4.rotation.z = -Math.PI;
        btn4.rotation.x = -Math.PI;
        console.log(about.rotation);
        button.add(btn4);

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
    if (currentbtn == 1 && frameUntilNextButton == 0) {
      rotateAnimation(about, btn5);
      return;
    }
    if (currentbtn == 2 && frameUntilNextButton == 0) {

      rotateAnimation(btn2, about);
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

  const changeMaterial = (object, material) => {
    if (object.material === material) return;
    object.material = material;
  }

  this.update = () => {
    console.log(about.material);
    button.visible = true;
    buttonManager();
    console.log(about.material);
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
    button.position.set(x + size.w + 1, y, z + size.h + 1.5);
  }

  this.rotate = (x, y, z) => {
    button.rotation.set(x, y, z);
  }

  let button = buildButton();

}
