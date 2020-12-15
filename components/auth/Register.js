import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import firebase from '../../firebase';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            name: null,
        };
    }

    signUp = () => {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
            console.log(result);
        }).catch(e => {
            console.log(e);
        });
    };

    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name => this.setState({ name }))}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email => this.setState({ email }))}
                />
                <TextInput
                    placeholder="password"
                    onChangeText={(password => this.setState({ password }))}
                />
                <Button onPress={() => this.signUp()} title="Sign Up" />
            </View>
        );
    }
}

export default Register;
