import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as THREE from 'three'
import ExpoTHREE from 'expo-three'
import Expo from 'expo'

console.disableYellowBox = true

export default class ARCamera extends React.Component {
    render() {
        return (
            <Expo.GLView
                // ///
                ref={ref => (this._glView = ref)}
                // ///
                style={{ flex: 1 }}
                onContextCreate={this._onGLContextCreate}
            />
        )
    }
    _onGLContextCreate = async gl => {
        // Do graphics stuff here!
        // //
        const arSession = await this._glView.startARSessionAsync()
        // //
        const scene = new THREE.Scene()
        const camera = ExpoTHREE.createARCamera(
            arSession,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight,
            0.01,
            1000
        )

        const renderer = ExpoTHREE.createRenderer({ gl })
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
        const geometryBox = new THREE.BoxGeometry(0.07, 0.07, 0.07)
        const geometryLine1 = new THREE.Geometry()

        // square venture
        const squareGeometry = new THREE.Geometry()

        squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0))
        squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0))
        squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0))
        squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0))
        squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0))

        squareGeometry.faces.push(new THREE.Face3(0, 1, 2))
        squareGeometry.faces.push(new THREE.Face3(0, 2, 3))

        const squareMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,

            side: THREE.DoubleSide
        })
        const squareMesh = new THREE.Line(squareGeometry, squareMaterial)
        squareMesh.position.set(1.5, 0.0, 4.0)

        // get planes
        const { planes } = ExpoTHREE.getPlanes(arSession)
        planes.forEach(
            ({ center: { x, y, z }, extent: { width, height }, transform, id }) => { }
        )
        ExpoTHREE.setWorldAlignment(arSession, ExpoTHREE.WorldAlignment.Gravity)
        //

        geometryLine1.vertices.push(new THREE.Vector3(-10, 5, 5))
        geometryLine1.vertices.push(new THREE.Vector3(0, 5, 0))

        const materialCube1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const materialCube2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const materialLine1 = new THREE.LineBasicMaterial({ color: 0x0000ff })

        const cube = new THREE.Mesh(geometryBox, materialCube1)

        const cube2 = new THREE.Mesh(geometryBox, materialCube2)
        const line = new THREE.Line(geometryLine1, materialLine1)

        cube.position.z = -0.4

        // cube2.position.z = 1
        // cube2.position.x = 0
        // cube2.position.y = 0

        // line.position.z = 0
        // line.position.y = 0
        // line.position.x = 0

        scene.add(cube, cube2, line, squareMesh)
        camera.position.set(0, 0, 10)
        // camera.position.z = 0
        const animate = () => {
            requestAnimationFrame(animate)
            // cube.rotation.x += 0.07
            // cube.rotation.y += 0.04
            renderer.render(scene, camera)
            gl.endFrameEXP()
        }
        animate()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})