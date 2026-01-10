import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { AnswerSheetRegistrationScreen } from '../features/answer-sheet';
import { ExamSheetRegistrationScreen } from '../features/exam-sheet';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="AnswerSheetRegistration"
        component={AnswerSheetRegistrationScreen}
      />
      <Stack.Screen
        name="ExamSheetRegistration"
        component={ExamSheetRegistrationScreen}
      />
    </Stack.Navigator>
  );
};
