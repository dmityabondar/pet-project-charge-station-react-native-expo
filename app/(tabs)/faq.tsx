import FaqScreen from "@/screens/FaqScreen";
import { SafeAreaView } from "react-native";

export default function TabScanQr() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <FaqScreen />
    </SafeAreaView>
  );
}
