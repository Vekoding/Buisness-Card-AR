/**
*
*
*
**/

export default function BuisnessCard(scene) {

  let posButton = {
    x: document.getElementById('posX'),
    y: document.getElementById('posY'),
    z: document.getElementById('posZ')
  }

  let position = {
    x: parseInt(document.getElementById('posX').value, 10),
    y: parseInt(document.getElementById('posY').value, 10),
    z: parseInt(document.getElementById('posZ').value, 10)
  }

  let size = {
    w: document.getElementById('size').valueAsNumber,
    h: document.getElementById('size').valueAsNumber * 3 / 5
  }

  let angle = { value : document.getElementById('angle').valueAsNumber*(Math.PI/180) };

  const buildBuisnessCard = () => {
    const planeWidth = size.w;
    const planeHeight = size.h;
    const texture = (new THREE.TextureLoader()).load('./asset/textures/card0.jpg');
    const material =new THREE.MeshBasicMaterial( { map: texture } );

    const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const mesh = new THREE.Mesh(planeGeo, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = -Math.PI/2;
    mesh.rotation.z  = 2*Math.PI;
    mesh.position.set(position.x, position.y, position.z);
    mesh.name='card';
    return mesh;
  }

  this.update = () => {
    card.visible = true;
  }

  this.hide = () => {
    card.visible = false;
  }

  /**
  * getPosition :
  * @return objet { x (int), y (int), z (int) }, coordonnéés du centre des marqueurs
  **/
  this.getPosition = () => {
    return position;
  }

  /**
  * getSize :
  * @return objet { w (int), h (int) }
  **/
  this.getSize = () => {
    return size;
  }

  /**
  * getAngle :
  * @return angle of rotation in radian
  **/
  this.getAngle = () => {
    return angle;
  }

  /**
  * getMesh
  * @return Object3D
  **/

  this.getMesh = () => {
    return card;
  }

  (posButton.x).addEventListener('input', () => {
    position.x = parseInt(posButton.x.value,10);
    updatePosition();
    }
  );

  (posButton.y).addEventListener('input', () => {
    position.y = parseInt(posButton.y.value,10);
    updatePosition();
    }
  );

  (posButton.z).addEventListener('input', () => {
    position.z = parseInt(posButton.z.value,10);
    updatePosition();
    }
  );

  document.getElementById('size').addEventListener('change', () => {
    size.w = document.getElementById('size').valueAsNumber;
    size.h = document.getElementById('size').valueAsNumber  * 3 / 5;
    updateSize();
  })

  document.getElementById('angle').addEventListener('change', () => {
    angle.value = document.getElementById('angle').valueAsNumber*(Math.PI/180);
    updateRotation();
  })

  const updatePosition = () => {
    scene.remove(scene.getObjectByName('card'));
    card = buildBuisnessCard();
    card.position.set(position.x, position.y, position.z);
  }

  const updateSize = () => {
    scene.remove(scene.getObjectByName('card'));
    card = buildBuisnessCard();
    card.rotation.set(-Math.PI/2,0, angle.value);
  }

  const updateRotation = () => {
    scene.remove(scene.getObjectByName('card'));
    card = buildBuisnessCard();
    card.rotation.set(-Math.PI/2,0, angle.value);
  }

  var card = buildBuisnessCard()
}
