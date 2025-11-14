import React from "react";
import { View, StyleSheet } from "react-native";
import { ProcessorCamera } from "../../components/ProcessorCamera";

export const FaceDetection = () => {
    return (
        <View style={Styles.container}>
            <ProcessorCamera isDebug/>
        </View>
    );
}

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});