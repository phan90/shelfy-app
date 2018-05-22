import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FileSystem } from 'expo';

export default class ImageScreen extends React.Component {
    state = {
        photos: [],
    };

    componentDidMount() {
        FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
            this.setState({
                photos
            });
        });
    }

    render() {
        console.log(this.state.photos, 'imagescreen state')
        return (
            <View style={styles.container} >
                <Image
                    style={styles.image}
                    source={{
                        uri: `${FileSystem.documentDirectory}photos/Photo_1.jpg`,
                    }}
                />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        flex: 1,
        opacity: 0.2
    }
});
