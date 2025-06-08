import '../app/styles/globals.css';
import { TaskProvider } from '../app/context/TaskContext';
import TaskModal from '../app/components/TaskModal';

const MyApp = ({ Component, pageProps }) => {
  return (
    <TaskProvider>
      <Component {...pageProps} />
      <TaskModal />
    </TaskProvider>
  );
};

export default MyApp;
