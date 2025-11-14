import React from "react";
import { View, StyleSheet } from "react-native";
import { playlistMock } from "../../constants/playlistMock";
import { ProcessorCamera } from "../../components/ProcessorCamera";
import { UserAction } from "../../types/app/camera";
import { useGestureNavigation } from "./hooks/useGestureNavigation";
import { GestureMusicList } from "./components/GestureMusicList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/routes";

export const UseCaseExample = () => {

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigateToDetails = (index: number) => {
    console.log('Navigating to details of index:', index);
    const selectedItem = playlistMock[index];
    navigator.navigate('MusicDetails', { music: selectedItem });
  };

  const {
    flatListRef,
    focusedIndex,
    startContinuousMovement,
    stopContinuousMovement,
    handleSelection
  } = useGestureNavigation({
    itemCount: playlistMock.length,
    onSelect: handleNavigateToDetails
  });

  const handleUserAction = (action: UserAction) => {
    switch (action) {
      case 'moveUp':
        startContinuousMovement('up');
        break;
        case 'moveDown':
        startContinuousMovement('down');
        break;
      case 'selection':
        handleSelection();
        break;
      case 'none':
        stopContinuousMovement();
        break;
      default:
        console.log('Action not handled:', action);
    }
  };

  return (
    <View style={styles.container}>
      <ProcessorCamera onUserAction={handleUserAction} />
      <GestureMusicList
        data={playlistMock}
        focusedIndex={focusedIndex}
        flatListRef={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});