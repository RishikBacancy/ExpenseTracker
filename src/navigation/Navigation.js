import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from '../screens/ManageExpense';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import { GlobalStyle } from '../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from '../components/UI/IconButton';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthContext } from '../store/authContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyle.colors.primary100 }
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
};

const TabNavigation = () => {
	const authCtx = useContext(AuthContext);

	return (
		<Tab.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyle.colors.primary500
				},
				headerTintColor: 'white',
				tabBarStyle: {
					backgroundColor: GlobalStyle.colors.primary500
				},
				tabBarActiveTintColor: GlobalStyle.colors.accent500,
				headerRight: ({ tintColor }) => (
					<View style={styles.btnRow}>
						<IconButton
							icon="add"
							size={24}
							color={tintColor}
							onPress={() => {
								navigation.navigate('Manage');
							}}
						/>
						<IconButton icon="exit" size={24} color={tintColor} onPress={authCtx.logout} />
					</View>
				)
			})}
		>
			<Tab.Screen
				name="Recent"
				component={RecentExpenses}
				options={{
					title: 'Recent Expense',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
				}}
			/>
			<Tab.Screen
				name="All"
				component={AllExpenses}
				options={{
					title: 'All Expense',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
				}}
			/>
		</Tab.Navigator>
	);
};

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
				headerTintColor: 'white'
			}}
		>
			<Stack.Screen name="OverView" component={TabNavigation} options={{ headerShown: false }} />
			<Stack.Screen
				name="Manage"
				component={ManageExpense}
				options={{
					presentation: 'modal'
				}}
			/>
		</Stack.Navigator>
	);
};

const Navigation = () => {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>{authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	btnRow: {
		flexDirection: 'row'
	}
});

export default Navigation;
