import { useRef, useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";

interface UseGestureNavigationProps {
  itemCount: number;
  onSelect: (index: number) => void;
}

export const useGestureNavigation = ({ itemCount, onSelect }: UseGestureNavigationProps) => {
  const flatListRef = useRef<FlatList | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState<'up' | 'down' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    });
  }, []);

  useEffect(() => {
    focusedIndexRef.current = focusedIndex;
  }, [focusedIndex]);

  const moveUp = useCallback(() => {
    setFocusedIndex(prev => {
      const newIndex = Math.max(0, prev - 1);
      scrollToIndex(newIndex);
      return newIndex;
    });
  }, [scrollToIndex]);

  const moveDown = useCallback(() => {
    setFocusedIndex(prev => {
      const newIndex = Math.min(itemCount - 1, prev + 1);
      scrollToIndex(newIndex);
      return newIndex;
    });
  }, [itemCount, scrollToIndex]);

  const startContinuousMovement = useCallback((direction: 'up' | 'down') => {
    setIsMoving(true);
    setMoveDirection(direction);
  }, []);

  const stopContinuousMovement = useCallback(() => {
    setIsMoving(false);
    setMoveDirection(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleSelection = useCallback(() => {
    onSelect(focusedIndexRef.current);
  }, [onSelect]);

  useEffect(() => {
    if (isMoving && moveDirection) {
      if (moveDirection === 'up') {
        moveUp();
      } else {
        moveDown();
      }

      intervalRef.current = setInterval(() => {
        if (moveDirection === 'up') {
          moveUp();
        } else {
          moveDown();
        }
      }, 300);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMoving, moveDirection, moveUp, moveDown]);

  return {
    flatListRef,
    focusedIndex,
    startContinuousMovement,
    stopContinuousMovement,
    handleSelection,
    scrollToIndex
  };
};