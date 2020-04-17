import React from 'react'
import { CssBaseline, Container } from '@material-ui/core'
import TopBar from './TopBar'
import RegexBuilder from './RegexBuilder'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <main>
        <div className={classes.appBarSpacer} />
        <Container>
          <RegexBuilder />
          {/* TODO: results pane */}
          {/* TODO: help */}
        </Container>
      </main>
    </div>
  )
}

export default App
