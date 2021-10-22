import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Header from '../../components/Header';
import MessageList from '../../components/MessageList';
import SendMessageForm from '../../components/SendMessageForm';
import SignInBox from '../../components/SignInBox';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Home;
