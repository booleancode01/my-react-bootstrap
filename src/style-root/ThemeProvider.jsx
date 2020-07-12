import React, { useEffect, useRef } from 'react';

import { useCookies } from 'react-cookie';

import ThemeContext from './ThemeContext';

function ThemeProvider({ children }) {

  const [cookies, setCookies] = useCookies(['theme']);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    window.location.reload();
  }, [cookies]);

  function toggleTheme() {
    let date = new Date();
    date.setTime(date.getTime() + 60*1000);

    setCookies('theme', cookies.theme === 'first' ? 'second' : 'first', { path: '/' });
  };

  (cookies.theme === 'first') ?
    require('./AppTheme.scss') :
      require('./AppTheme2.scss');

  return (
    <ThemeContext.Provider
      value={{
        theme: cookies.theme,
        toggleTheme,
      }}>

      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
