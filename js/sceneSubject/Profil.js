/** SceneSubject
*
*
*
**/

export default function Profil(size, scene, position) {

/**  changeCanvas()
* Create 2D canvas which allow us to right text easily
* This text is  then use as a texture on a plane geometry
**/
  let canvas = document.getElementById('canvas2D');
  let ctx = canvas.getContext('2d');
  canvas.width = 500/2;
  canvas.height = 300;

  function changeCanvas() {
      ctx.font = '20pt Montserrat';
      ctx.fillStyle = 'black';
      ctx.fillRect(10, 10, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('Evan Dvorkin', canvas.width/2, canvas.height/2 + 40);
      ctx.font = '10pt Montserrat';
      ctx.fillText('Développeur Multimedia', canvas.width / 2, (canvas.height / 2) + 65);  // TODO : Texte doit pouvoir être modifié
  }

/** buildProfil()
*   used to create and texturize the profil object which
*   is composed of a picture and a label
*   @return Group (Mesh)
**/

  const buildProfil = () => {
    let profil = new THREE.Group();
    // create background
    const planeWidth = size.w;
    const planeHeight = size.h;
    const material =new THREE.MeshLambertMaterial( { color: 'black' });
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
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.position.set(-(size.w/2), 0, size.h/2);
    profil.add(mesh);


    // create text canvas
    const textWidth = (size.w - .25)/2;
    const textHeight = ( size.h - .25);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let materialCanvas = new THREE.MeshBasicMaterial({ map: texture });
    materialCanvas.map.minFilter = THREE.LinearFilter;
    const textGeo = new THREE.PlaneBufferGeometry(textWidth, textHeight);
    const mesh2 = new THREE.Mesh(textGeo,  materialCanvas);

    mesh2.receiveShadow = true;
    mesh2.rotation.x = -Math.PI/2;
    mesh2.translateX(-textWidth/2);
    mesh2.translateZ(0.01);
    profil.add(mesh2);

    // create text canvas
    const photoWidth = (size.w-.25)/2;
    const photoHeight = (size.h - .25);
    let texturePhoto = (new THREE.TextureLoader()).load('./asset/textures/photo0.jpg');
    let materialPhoto = new THREE.MeshBasicMaterial({ map: texturePhoto });
    materialPhoto.map.minFilter = THREE.LinearFilter;
    const photoGeo = new THREE.PlaneBufferGeometry(photoWidth, photoHeight);
    const mesh3 = new THREE.Mesh(photoGeo,  materialPhoto);

    mesh3.receiveShadow = true;
    mesh3.rotation.x = -Math.PI/2;
    mesh3.translateX(photoWidth/2);
    mesh3.translateZ(0.01);

    profil.add(mesh3);

    /**
    * Create a gradient shader from black to transparent
    **/
    
    const vertexShader = () => {
      return `
        varying vec3 vUv;

        void main() {
          vUv = position;

          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
        }
      `;
    }

    const fragmentShader = () => {
      return `
          uniform vec3 colorA;
          uniform vec3 colorB;
          uniform float alpha;
          varying vec3 vUv;


          void main() {
            vec4 vColor = vec4(mix(colorA, colorB, vUv.y), 1.0);
            vColor.a = alpha*vUv.y;
            gl_FragColor= vColor;
          }
      `
    }

    const applyGradient = () => {
      let uniforms = {
        colorB: {type: 'vec3', value: new THREE.Color( 'black')},
        colorA: {type: 'vec3', value: new THREE.Color('white')},
        alpha: 	{ type: 'f', value: 0.8 }
      }

      let geometry = new THREE.PlaneBufferGeometry(4.75,3);
      let material =  new THREE.ShaderMaterial({
         uniforms: uniforms,
         fragmentShader: fragmentShader(),
         vertexShader: vertexShader(),
       });

       material.side = THREE.DoubleSide;
       material.transparent = true;
       let mesh = new THREE.Mesh(geometry, material);
       mesh.rotation.x = -Math.PI/2;
       mesh.position.set(0,.1,0);
       mesh.rotation.z  = Math.PI;
       profil.add(mesh)

    }

    applyGradient();
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
    profil.position.set(x, y, z - size.h/2 - (1.85) );
  }

  this.rotate = (x, y, z) => {
    profil.rotation.set( position.x, position.y, position.z );
  }

  this.getMesh = () => {
    return profil;
  }

}
