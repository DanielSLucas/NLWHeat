/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  // useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';

const CLIENT_ID = '2b416b354d883981926c';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSignIn] = useState(true);

  const signIn = useCallback(async () => {
    try {
      setIsSignIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const authReponse = await api.post<AuthResponse>('/authenticate', {
          code: authSessionResponse.params.code,
        });

        const { user: loggedUser, token } = authReponse.data;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(loggedUser));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(loggedUser);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsSignIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }, []);

  useEffect(() => {
    async function loadUserStorageData() {
      const storagedUser = await AsyncStorage.getItem(USER_STORAGE);
      const storagedToken = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (storagedUser && storagedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setIsSignIn(false);
    }
    loadUserStorageData();
  }, []);

  // useEffect(() => {
  //   const url = window.location.href;
  //   const hasGithubCode = url.includes('?code=');

  //   if (hasGithubCode) {
  //     const [urlWithoutCode, githubCode] = url.split('?code=');

  //     window.history.pushState({}, '', urlWithoutCode);

  //     signIn(githubCode);
  //   }
  // }, [signIn]);

  return (
    <AuthContext.Provider value={{ signIn, user, signOut, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
