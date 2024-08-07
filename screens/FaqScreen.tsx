import React, { useState } from "react";
import { useAppdataStore } from "@/stores/appdata.store";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, ListItem } from "react-native-elements";

import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Linking,
} from "react-native";

export default function FaqScreen() {
  const helpCenterUrl = useAppdataStore((state) => state.helpCenterUrl);
  const faqQuestions = useAppdataStore((state) => state.faqQuestions);

  const [search, setSearch] = useState<string>("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filteredFaqs = faqQuestions.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
          alignItems: "center",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
          marginHorizontal: 15,
        }}
      >
        <TouchableOpacity style={{ padding: 5 }}>
          <FontAwesome name="search" size={18} color="black" />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            height: 30,
            paddingHorizontal: 5,
            color: "#000000",
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 15,
          marginVertical: 20
        }}
        onPress={async () => await Linking.openURL(helpCenterUrl)}
      >
        <Icon
          name="support-agent"
          type="material"
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Feedback
        </Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        {filteredFaqs.map((faq, index) => (
          <ListItem.Accordion
            key={index}
            isExpanded={expanded === index}
            onPress={() => setExpanded(expanded === index ? null : index)}
            content={
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                  width: '100%',
                  maxWidth: '100%'
                }}
              >
                <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                <ListItem.Content>
                  <ListItem.Title>{faq.question}</ListItem.Title>
                </ListItem.Content>
              </View>
            }
          >
            <ListItem>
              <ListItem.Content>
                <ListItem.Subtitle>{faq.answer}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
        ))}
      </ScrollView>
    </View>
  );
}
