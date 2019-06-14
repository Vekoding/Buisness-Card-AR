export default function GeneralLights(scene) {

	const light = new THREE.PointLight("#ffffff", 1);
	light.position.set(0,0,0);
  scene.add(light);

	const lightVideo = new THREE.PointLight("#ffffff", 1);
	lightVideo.position.set(-5,2,0);
  scene.add(lightVideo);

	this.update = function(time) {
		light.intensity = 1;
	}
}
