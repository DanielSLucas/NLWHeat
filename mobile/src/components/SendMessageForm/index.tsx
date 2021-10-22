import React, { useCallback, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import Button from '../Button';

import { styles } from './styles';

const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSendMessage = useCallback(async () => {
    setSendingMessage(true);
    if (!message.trim()) {
      return;
    }

    await api.post('messages', { text: message });
    setMessage('');
    Keyboard.dismiss();
    setSendingMessage(false);
  }, [message]);

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
        onChangeText={setMessage}
      />
      <Button
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleSendMessage}
      >
        ENVIAR MENSAGEM
      </Button>
    </View>
  );
};

export default SendMessageForm;
