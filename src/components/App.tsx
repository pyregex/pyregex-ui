import React, { useState } from 'react'
import { CssBaseline, Container } from '@material-ui/core'
import TopBar from './TopBar'
import RegexBuilder, { RegexForm } from './RegexBuilder'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },

    appBarSpacer: theme.mixins.toolbar,

    mainContainer: {
      padding: `${theme.spacing(2)}px`,
    },
  }
})

function App() {
  const classes = useStyles()

  const [regexForm, setRegexForm] = useState<RegexForm>({
    regex: '',
    testString: '',
    matchType: 'match',
    flags: [],
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <main>
        <div className={classes.appBarSpacer} />
        <Container className={classes.mainContainer}>
          <RegexBuilder
            value={regexForm}
            onChange={(form) => {
              console.log.bind(undefined, 'REGEX_ONCHANGE=')
              setRegexForm(form)
            }}
          />
          {/* TODO: results pane */}
          {/* TODO: help */}
        </Container>
      </main>
    </div>
  )
}

export default App
