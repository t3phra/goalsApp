import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@material-ui/core/styles'

import AuthStore from './util/context/auth-context'
import HttpStore from './util/context/http-context'

import Toolbar from './shared/header/Toolbar'
import AppRouter from './shared/Router/AppRouter'
import Layout from './shared/layout/Layout'
import theme from './util/theme/theme'

const App = () => {
  return (
    <AuthStore>
      <HttpStore>
        <ThemeProvider theme={theme}>
          <Router history={createBrowserHistory()}>
            <Toolbar />
            <Layout>
              <AppRouter />
            </Layout>
          </Router>
        </ThemeProvider>
      </HttpStore>
    </AuthStore>
  )
}

export default App
