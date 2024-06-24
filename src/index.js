import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { Helmet } from "react-helmet";

const userRole = localStorage.getItem('userRole');

const root = createRoot(document.getElementById('root'));

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Helmet>
        <script async type="text/javascript">{`
          !function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '745374524393285');
          fbq('track', 'PageView');
        `}</script>
        <noscript async >{`
          <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=745374524393285&ev=PageView&noscript=1" />
        `}</noscript>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WH4YMD100P"></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WH4YMD100P');
          `}
        </script>

      </Helmet>
      <App userRole={userRole} />
    </PersistGate>
  </Provider>
);

root.render(app);
