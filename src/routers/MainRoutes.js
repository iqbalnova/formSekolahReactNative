import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Form from '../screens/Form';
import SuccessForm from '../screens/SuccessForm';

const Stack = createStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Form"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="SuccessForm" component={SuccessForm} />
    </Stack.Navigator>
  );
}
