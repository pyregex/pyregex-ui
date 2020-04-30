import React from 'react'
import { CssBaseline, Container } from '@material-ui/core'
import TopBar from './TopBar'
import RegexBuilder, { RegexForm } from './RegexBuilder'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: (theme as any).mixins.toolbar,
}))

function App() {
  const classes = useStyles()

  const regexForm: RegexForm = {
    regex: '',
    testString: '',
    matchType: 'match',
    flags: [],
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <main>
        <div className={classes.appBarSpacer} />
        <Container>
          <RegexBuilder
            value={regexForm}
            onChange={console.log.bind(undefined, 'REGEX_ONCHANGE=')}
          />
          {/* TODO: results pane */}
          {/* TODO: help */}
        </Container>
      </main>
    </div>
  )
}

export default App
