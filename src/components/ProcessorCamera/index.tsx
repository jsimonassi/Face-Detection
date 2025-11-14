import React, { useMemo, useRef } from "react";
import { StyleSheet, useWindowDimensions, View, Text, ActivityIndicator } from "react-native";
import { Camera as VisionCamera } from "react-native-vision-camera";
import { Camera, FaceDetectionOptions } from 'react-native-vision-camera-face-detector';
import { UserAction } from "../../types/app/camera";
import { CAMERA_CONFIG } from "../../constants/faceDetection";
import { useFaceDetection } from "./hooks/useFaceDetection";
import { useCameraDevice } from "./hooks/useCameraDevice";

interface ProcessorCameraProps {
  isDebug?: boolean;
  onUserAction?: (action: UserAction) => void;
  cameraPosition?: 'front' | 'back';
}

export const ProcessorCamera = ({ 
  onUserAction, 
  isDebug = false,
  cameraPosition = 'front'
}: ProcessorCameraProps) => {
  const { width, height } = useWindowDimensions();
  const cameraRef = useRef<VisionCamera>(null);
  
  const { device, isLoading, error } = useCameraDevice(cameraPosition);
  const { userAction, handleFacesDetected } = useFaceDetection(onUserAction);

  const faceDetectionOptions = useMemo<FaceDetectionOptions>(() => ({
    performanceMode: CAMERA_CONFIG.PERFORMANCE_MODE,
    classificationMode: CAMERA_CONFIG.CLASSIFICATION_MODE,
    contourMode: CAMERA_CONFIG.CONTOUR_MODE,
    landmarkMode: CAMERA_CONFIG.LANDMARK_MODE,
    windowWidth: width,
    windowHeight: height,
  }), [width, height]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error accessing camera: {error.message}</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Camera not available</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { opacity: isDebug ? 1 : 0 }]}>
      {isDebug && (
        <View style={styles.debugOverlay}>
          <Text style={styles.debugText}>{userAction}</Text>
        </View>
      )}
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        faceDetectionCallback={handleFacesDetected}
        faceDetectionOptions={faceDetectionOptions}
        ref={cameraRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  debugOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  debugText: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    fontSize: 32,
    fontWeight: 'bold',
    paddingVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});