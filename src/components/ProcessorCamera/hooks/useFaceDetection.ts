import { useState, useCallback, useRef } from 'react';
import { throttle } from 'lodash';
import { Face } from 'react-native-vision-camera-face-detector';
import { FaceMetrics, UserAction } from '../../../types/app/camera';
import { FACE_DETECTION_CONFIG } from '../../../constants/faceDetection';

interface UseFaceDetectionReturn {
  userAction: UserAction;
  handleFacesDetected: (faces: Face[]) => void;
}

export const useFaceDetection = (
  onUserAction?: (action: UserAction) => void
): UseFaceDetectionReturn => {
  const [userAction, setUserAction] = useState<UserAction>("none");
  const previousActionRef = useRef<UserAction>("none");

  const determineUserAction = useCallback((metrics: FaceMetrics): UserAction => {
    const { pitchAngle, yawAngle } = metrics;

    if (yawAngle < FACE_DETECTION_CONFIG.YAW_GO_THRESHOLD) {
      return "selection";
    }

    if (yawAngle > FACE_DETECTION_CONFIG.YAW_BACK_THRESHOLD) {
      return "goBack";
    }

    if (pitchAngle > FACE_DETECTION_CONFIG.PITCH_UP_THRESHOLD) {
      return "moveUp";
    }

    if (pitchAngle < FACE_DETECTION_CONFIG.PITCH_DOWN_THRESHOLD) {
      return "moveDown";
    }

    return "none";
  }, []);

  const updateUserAction = useCallback((newAction: UserAction) => {
    if (previousActionRef.current !== newAction) {
      previousActionRef.current = newAction;
      setUserAction(newAction);
      onUserAction?.(newAction);
    }
  }, [onUserAction]);

  const handleFacesDetected = useRef(
    throttle((faces: Face[]) => {
      if (faces.length === 0) {
        updateUserAction("none");
        return;
      }

      const [firstFace] = faces;
      const action = determineUserAction({
        pitchAngle: firstFace.pitchAngle,
        leftEyeOpenProbability: firstFace.leftEyeOpenProbability,
        rightEyeOpenProbability: firstFace.rightEyeOpenProbability,
        yawAngle: firstFace.yawAngle,
      });

      updateUserAction(action);
    }, FACE_DETECTION_CONFIG.THROTTLE_MS)
  ).current;

  return { userAction, handleFacesDetected };
};