import { useState, useEffect } from 'react';
import { useCameraDevice as useVisionCameraDevice, Camera } from 'react-native-vision-camera';

interface UseCameraDeviceReturn {
  device: any;
  hasPermission: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useCameraDevice = (position: 'front' | 'back' = 'front'): UseCameraDeviceReturn => {
  const device = useVisionCameraDevice(position);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const status = await Camera.requestCameraPermission();
        if (status === 'granted'){
            setHasPermission(true);
        }else{
            setHasPermission(false);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissions();
  }, []);

  return { device, hasPermission, isLoading, error };
};