import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../../types/routes";

export const Home = () => {

    const navigator = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Button title='Face Detection Camera' onPress={() => navigator.navigate("FaceDetection")} />
            <Button title='Use Case Example' onPress={() => navigator.navigate("UseCaseExample")} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
