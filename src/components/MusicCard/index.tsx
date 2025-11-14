import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface MusicCardProps {
    image: string;
    artist: string;
    title: string;
    isOnFocus?: boolean;
}

export const MUSIC_CARD_HEIGHT = 80;

export const MusicCard = React.memo(({image, artist, title, isOnFocus}: MusicCardProps) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withSpring(isOnFocus ? 1.05 : 1, {
            damping: 20,
            stiffness: 200,
        });
    }, [isOnFocus]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={[styles.card, animatedStyle, isOnFocus && { borderColor: '#a1a1a1', borderWidth: 1 }]}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.artist}>{artist}</Text>
            </View>
        </Animated.View>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.image === nextProps.image &&
        prevProps.artist === nextProps.artist &&
        prevProps.title === nextProps.title &&
        prevProps.isOnFocus === nextProps.isOnFocus
    );
});

const styles = StyleSheet.create({
    card: {
        height: MUSIC_CARD_HEIGHT,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 14,
        color: '#666',
    },
});