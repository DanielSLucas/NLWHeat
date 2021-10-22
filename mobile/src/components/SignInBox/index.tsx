import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/auth';

import Button from '../Button';

import { COLORS } from '../../theme';
import { styles } from './styles';

const SignInBox: React.FC = () => {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      >
        ENTRAR COM GITHUB
      </Button>
    </View>
  );
};

export default SignInBox;
