import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Connectors",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanQr"
        options={{
          title: "Scan QR",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: "FAQ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="questioncircleo" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
