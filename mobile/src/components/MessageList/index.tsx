import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import io from 'socket.io-client';

import { api } from '../../services/api';
import Message, { IMessage } from '../Message';

import { styles } from './styles';

const messagesQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage);
});

const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(state =>
          [messagesQueue[0], state[0], state[1]].filter(Boolean),
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<IMessage[]>('/messages/last3');

      setCurrentMessages(messagesResponse.data);
    }
    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
