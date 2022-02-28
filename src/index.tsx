import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home,Dashboard,SignIn } from './components';
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FirebaseAppProvider } from 'reactfire'; 
import 'firebase/auth'; 
import { firebaseConfig } from './firebaseConfig' 

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store = { store }>
    <ThemeProvider theme = {theme}>
    <Router>
      <Routes>
        <Route path = '/' element={<Home title={'Hello Heroes'} />} />
        <Route path = '/dashboard' element={<Dashboard  />} />
        <Route path = '/signin' element={<SignIn />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();