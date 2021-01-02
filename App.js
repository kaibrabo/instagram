import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import firebase from "./firebase";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLoaded: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    isLoggedIn: false,
                    isLoaded: true,
                });
            } else {
                this.setState({
                    isLoggedIn: true,
                    isLoaded: true,
                });
            }
        });
    }

    render() {
        const { isLoaded, isLoggedIn } = this.state;
        if (!isLoaded) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (!isLoggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen
                            name="Landing"
                            component={Landing}
                            options={{ title: "Instagram", headerShown: false }}
                        />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen
                            name="Main"
                            component={MainScreen}
                            options={{ title: "Instagram", headerShown: false }}
                        />
                        <Stack.Screen name="Add" component={AddScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default App;
