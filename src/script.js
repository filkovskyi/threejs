import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader();
const normalMapTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(.5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 0xdcabdf,
    metalness: .7,
    roughness: .2,
    normalMap: normalMapTexture
});

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Lights 1
const light1 = gui.addFolder('Light 1')
const pointLight1 = new THREE.PointLight(0x7209b7, 0.1)
pointLight1.position.set(-1, 1.28, 1.34);
pointLight1.intensity = 1.4
scene.add(pointLight1)

light1.add(pointLight1.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper)

// Lights 2
const light2 = gui.addFolder('Light 2')
const pointLight2 = new THREE.PointLight(0x4cc9f0, 0.1)
pointLight2.position.set(-0.3, -1.85, 0.15);
pointLight2.intensity = .7
scene.add(pointLight2)

light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

const onDocumentMouseMove = event => {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
}

document.addEventListener('mousemove', onDocumentMouseMove)


const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y = .5* (targetX - sphere.rotation.y)
    sphere.rotation.x = .5* (targetY - sphere.rotation.x)
    sphere.rotation.z = - .5* (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()