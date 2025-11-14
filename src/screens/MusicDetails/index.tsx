import React from 'react';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/routes';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { ProcessorCamera } from '../../components/ProcessorCamera';
import { UserAction } from '../../types/app/camera';

type MusicDetailsRouteProp = RouteProp<RootStackParamList, 'MusicDetails'>;

export function MusicDetails() {
    const navigation = useNavigation();
    const route = useRoute<MusicDetailsRouteProp>();
    const { music } = route.params;

    const handleAction = (action: UserAction) => {
        if (action === 'goBack') {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <ProcessorCamera onUserAction={handleAction} />
            </View>
            <View style={styles.musicArt}>
                <Image source={music.image} style={{ width: '100%', height: '100%' }} />
                <View style={styles.musicInfo}>
                    <Text style={styles.musicTitle}>{music.title}</Text>
                    <Text style={styles.musicArtist}>{music.artist}</Text>
                </View>
            </View>
            <View style={styles.lyricsContainer}>
                <Text style={styles.lyricsText}>{music.lyrics}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    musicArt: {
        width: "100%",
        flex: 1.5,
    },
    musicInfo: {
        width: "100%",
        padding: 20,
        position: 'absolute',
        bottom: 10,
    },
    musicTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    musicArtist: {
        fontSize: 18,
        color: '#e9e9e9',
    },
    lyricsContainer: {
        flex: 2,
        padding: 20,
    },
    lyricsText: {
        fontSize: 18,
        lineHeight: 24,
    },
    cameraContainer: {
        width: 0,
        height: 0,
    }
});