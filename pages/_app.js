// pages/_app.js
import '../app/styles/globals.css';
import { TaskProvider } from '../app/context/TaskContext';
import { AuthProvider } from '../app/context/AuthContext';
import TaskModal from '../app/components/TaskModal';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
        <TaskModal />
      </TaskProvider>
    </AuthProvider>
  );
};

export default MyApp;
