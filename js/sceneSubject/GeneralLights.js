export default function GeneralLights(scene) {

	const light2 = new THREE.PointLight("#ffffff", 0.8);
	light2.position.set(2,0,-10);
  scene.add(light2);

	const lightVideo = new THREE.PointLight("#ffffff", 1);
	lightVideo.position.set(-10,3,0);
  scene.add(lightVideo);

	var sphereSize = 1;
	var pointLightHelper = new THREE.PointLightHelper( light2, sphereSize );
	scene.add( pointLightHelper );

	this.update = function(time) {
		light.intensity = 1;

	}
}
