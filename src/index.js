import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Создаем корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение с провайдером Redux
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// Если вы хотите начать измерять производительность в вашем приложении, передайте функцию для логирования результатов
// (например: reportWebVitals(console.log)) или отправьте на аналитический endpoint. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals();
