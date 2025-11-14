import { ParamListBase } from "@react-navigation/native";
import { Music } from "../models/Music";

export interface RootStackParamList extends ParamListBase {
    Home: undefined;
    FaceDetection: undefined;
    UseCaseExample: undefined;
    MusicDetails: {
        music: Music;
    };
}