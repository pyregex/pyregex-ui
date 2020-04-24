import React, { useState } from 'react'
import { CssBaseline, Container } from '@material-ui/core'
import TopBar from './TopBar'
import RegexBuilder, { RegexForm } from './RegexBuilder'
import { makeStyles } from '@material-ui/core/styles'
import { useDebounced } from '../hooks/input'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles()

  const [regexForm, setRegexForm] = useState<RegexForm>({
    regex: '',
    testString: '',
    matchType: 'match',
    flags: [],
  })

  const regexDebounced = useDebounced(regexForm.regex, 300)
  const loading = regexDebounced.length > 3

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <main>
        <div className={classes.appBarSpacer} />
        <Container>
          <RegexBuilder
            value={regexForm}
            onChange={(e) => {
              console.log('ONCHANGE=', e)
              setRegexForm(e)
            }}
          />
          {loading && <div id="loading-indicator">Loading...</div>}
          {/* TODO: results pane */}
          {/* TODO: help */}
        </Container>
      </main>
    </div>
  )
}

export default App
