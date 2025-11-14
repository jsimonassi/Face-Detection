import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { createStaticNavigation } from "@react-navigation/native";
import { UseCaseExample } from "../screens/UseCaseExample";
import { FaceDetection } from "../screens/FaceDetection";
import { MusicDetails } from "../screens/MusicDetails";
import { Music } from "../types/models/Music";
import { RootStackParamList } from "../types/routes";

const RootStack = createNativeStackNavigator<RootStackParamList>({
    screens: {
        Home: Home,
        FaceDetection: FaceDetection,
        UseCaseExample: UseCaseExample,
        MusicDetails: MusicDetails
    },
});

export const Navigation = createStaticNavigation(RootStack);