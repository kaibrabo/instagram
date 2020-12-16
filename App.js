import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import firebase from "./firebase";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const Stack = createStackNavigator();
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
            <View>
                <Text> User is Logged in</Text>
            </View>
        );
    }
}

export default App;
