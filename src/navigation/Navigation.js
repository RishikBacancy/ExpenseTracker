import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from '../screens/ManageExpense';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import { GlobalStyle } from '../constants/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
	return (
		<Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: GlobalStyle.colors.primary500
            },
            headerTintColor: "white",
            tabBarStyle: {
                backgroundColor: GlobalStyle.colors.primary500
            },
            tabBarActiveTintColor: GlobalStyle.colors.accent500,
        }}>
			<Tab.Screen name="Recent" component={RecentExpenses} options={{
                title:"Recent Expense",
                tabBarLabel: "Recent",
                
            }}/>
			<Tab.Screen name="All" component={AllExpenses} />
		</Tab.Navigator>
	);
};

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="OverView" component={TabNavigation} options={{ headerShown: false }} />
				<Stack.Screen name="Manage" component={ManageExpense} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
