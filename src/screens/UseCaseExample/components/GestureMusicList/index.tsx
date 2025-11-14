import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Music } from "../../../../types/models/Music";
import { MUSIC_CARD_HEIGHT, MusicCard } from "../../../../components/MusicCard";

interface GestureMusicListProps {
  data: Music[];
  focusedIndex: number;
  flatListRef: React.RefObject<FlatList | null>;
}

export const GestureMusicList = ({ data, focusedIndex, flatListRef }: GestureMusicListProps) => {
  const renderItem = useCallback(
    ({ item, index }: { item: Music; index: number }) => (
      <MusicCard
        image={item.image} 
        artist={item.artist} 
        title={item.title} 
        isOnFocus={index === focusedIndex}
      />
    ),
    [focusedIndex]
  );

  const handleScrollToIndexFailed = useCallback((info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5
      });
    });
  }, [flatListRef]);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id + item.title}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={21}
      getItemLayout={(_, index) => ({
        length: MUSIC_CARD_HEIGHT, 
        offset: MUSIC_CARD_HEIGHT * index, 
        index
      })}
      contentContainerStyle={styles.contentContainer}
      scrollEventThrottle={16}
      onScrollToIndexFailed={handleScrollToIndexFailed}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20
  }
});