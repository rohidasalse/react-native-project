import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// Assuming you have a backend API for user registration:
import axios from 'axios'; // Or any preferred HTTP client library

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSignUp = async () => {
    setIsLoading(true); // Show loading indicator

    try {
      const response = await axios.post('/api/users/register', {
        username,
        email,
        password,
      });

      console.log('Sign up successful:', response.data);
      // Handle successful sign up (e.g., navigate to home screen)

    } catch (error) {
      console.error('Sign up failed:', error.response.data);
      // Handle sign up errors (e.g., display error message)

    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Input fields with validation (example using regular expressions) */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text.trim())} // Trim whitespace
        autoCapitalize="none" // Prevent auto-capitalization
        minLength={3} // Minimum username length validation
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
        autoCapitalize="none"
        keyboardType="email-address" // Set keyboard type for email
        textContentType="emailAddress" // For iOS autofill suggestions
        // Add email validation using regular expressions (example)
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password characters
        minLength={8} // Minimum password length validation
        // Add password complexity validation (example)
      />

      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="small" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}

      {/* Link to Login */}
      <Text style={styles.link}>Already have an account? Login</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loading: {
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    color: '#0099ff',
  },
});
