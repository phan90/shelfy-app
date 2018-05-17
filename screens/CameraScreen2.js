import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Constants, Camera, Permissions, MediaLibrary } from 'expo';

export default class App extends Component {
    componentDidMount = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    }

    takePhoto = () => {
        setTimeout(() => {
            console.log('timeout');
            this.camera.takePictureAsync().then(async data => {
                console.log('read to create asset');
                await MediaLibrary.createAssetAsync(data.uri);
                console.log('successfully created asset');
            });
        }, 3000);
    }

    render() {
        return (
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}>
                <Button title="Take Photo" onPress={this.takePhoto} />
            </Camera>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }
});
