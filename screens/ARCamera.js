import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as THREE from 'three'
import ExpoTHREE from 'expo-three'
import Expo from 'expo'
import { FileSystem } from 'expo';

console.disableYellowBox = true

export default class ARCamera extends React.Component {
    render() {
        return (
            <Expo.GLView
                ref={ref => (this._glView = ref)}
                style={{ flex: 1 }}
                onContextCreate={this._onGLContextCreate}
            />
        )
    }

    _onGLContextCreate = async gl => {
        const arSession = await this._glView.startARSessionAsync()
        const scene = new THREE.Scene()
        const camera = ExpoTHREE.createARCamera(
            arSession,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight,
            0.01,
            1000
        )
        // const camera = new THREE.PerspectiveCamera(
        //     75,
        //     gl.drawingBufferWidth / gl.drawingBufferHeight,
        //     0.1,
        //     1000,
        // );

        const renderer = ExpoTHREE.createRenderer({ gl })
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
        scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)

        // const geometryBox = new THREE.BoxGeometry(0.07, 0.07, 0.07)
        // const materialCube1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        // const cube = new THREE.Mesh(geometryBox, materialCube1)
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const texture = await ExpoTHREE.loadAsync(require('../assets/images/robot-dev.png'))
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.z = 5;
        scene.add(cube)
        

        camera.position.set(0, 0, 10)
        const animate = () => {
            requestAnimationFrame(animate)
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

