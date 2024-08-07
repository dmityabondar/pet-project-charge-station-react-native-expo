import StationsMapScreen from "@/screens/StationsMapScreen";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StationsMapScreen />
    </SafeAreaView>
  );
}
