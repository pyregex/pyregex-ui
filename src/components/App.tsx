import React, { useCallback, useReducer } from 'react'
import { CssBaseline, Container } from '@material-ui/core'
import TopBar from './TopBar'
import RegexBuilder, { RegexForm, RegexFormChangeEvent } from './RegexBuilder'
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

const initialState: RegexForm = {
  regex: '',
  testString: '',
  matchType: 'match',
  flags: [],
}

interface ReducerAction {
  type: string
  payload: any
}

function reducer(state: RegexForm, action: ReducerAction): RegexForm {
  switch (action.type) {
    case 'SET_REGEX':
      return { ...state, regex: action.payload }
    case 'SET_TEST_STRING':
      return { ...state, testString: action.payload }
    case 'SET_FLAGS':
      return { ...state, flags: action.payload }
    case 'SET_MATCH_TYPE':
      return { ...state, matchType: action.payload }
    default:
      return state
  }
}

function App() {
  const classes = useStyles()

  const [regexForm, dispatch] = useReducer(reducer, initialState)

  const onRegexFormChange = useCallback((update: RegexFormChangeEvent) => {
    if (update.regex) {
      dispatch({ type: 'SET_REGEX', payload: update.regex })
    } else if (update.testString) {
      dispatch({ type: 'SET_TEST_STRING', payload: update.testString })
    } else if (update.flags) {
      dispatch({ type: 'SET_FLAGS', payload: update.flags })
    } else if (update.flags) {
      dispatch({ type: 'SET_MATCH_TYPE', payload: update.matchType })
    }
  }, [])

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
              onRegexFormChange(form)
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
