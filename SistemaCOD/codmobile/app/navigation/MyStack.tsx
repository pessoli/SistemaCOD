// // src/navigation/MyStack.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from '../(tabs)/index'; // Tela de Login/Home
// import Explore from '../(tabs)/explore'; // Tela de Despesas

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Defina um Tab Navigator com as abas "Home" e "Despesas"
// const MyTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="Despesas" component={Explore} />
//   </Tab.Navigator>
// );

// // Stack Navigator que irá incluir o MyTabs como tela
// const MyStack = () => (
//   <Stack.Navigator initialRouteName="Home">
//     <Stack.Screen name="Home" component={MyTabs} />
//   </Stack.Navigator>
// );

// export default MyStack;
