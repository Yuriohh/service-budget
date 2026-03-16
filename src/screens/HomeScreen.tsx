import { Text, View } from "react-native";

export const HomeScreen = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <Text className="text-3xl font-bold text-blue-700">Service Budget</Text>
      <Text className="text-gray-600 mt-2 text-lg">Esta é a @HomeScreen</Text>
    </View>
  );
}
