import React from 'react';
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  icon,
  color,
  backgroundColor,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.9}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
