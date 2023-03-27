import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import "./style.css"

// create a scene, essentially a canvas where our project will live
const scene = new THREE.Scene()



// ---------------
// create our shapes and objects to add to scene

// define how our object size and how detailed it will look
const geometry = new THREE.SphereGeometry(3, 64, 64)

// define how our object will look ie texture 
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',

})

// combine the two to have a cohesive object
const mesh = new THREE.Mesh(geometry, material)

// finally add our object to the scene
scene.add(mesh)

// ----------------
// add lighting 
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)

// ----------------
// size of users window
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


// ----------------
// add a camera to view our scene
// params(field of view, aspect ratio of camera, near clipping point, far clipping point)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
// add camera to scene
scene.add(camera)


// ----------------
// Render scene to html
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

// define size of canvas
renderer.setSize(sizes.width, sizes.height)
// connect canvas to scene and camera
renderer.render(scene, camera)


// ----------------
// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false 
controls.enableZoom = false


// -------------
// resize
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  // update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})



// --------------
// loop 

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop() 
