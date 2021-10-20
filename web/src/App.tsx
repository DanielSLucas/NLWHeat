import styles from './App.module.scss';
import LoginBox from './components/LoginBox';
import MessageList from './components/MessageList';

export const App: React.FC = () => {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  );
};