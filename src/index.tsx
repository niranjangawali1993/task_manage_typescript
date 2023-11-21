import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  TaskContextProvider,
  UserContextProvider,
  CommonContextProvider,
} from './contexts';
import { MemorizedSpinner } from './components';
import './i18n/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CommonContextProvider>
      <UserContextProvider>
        <TaskContextProvider>
          <Suspense fallback={<MemorizedSpinner />}>
            <App />
          </Suspense>
        </TaskContextProvider>
      </UserContextProvider>
    </CommonContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
