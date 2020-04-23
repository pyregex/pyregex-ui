import React from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { REGEX_FLAGS } from '../constants'

export interface RegexForm {
  regex: string
  testString: string
  flags: number[]
  matchType: 'match' | 'search' | 'findall'
}

interface RegexBuilderProps {
  onChange: (value: RegexForm) => any
  value: RegexForm
}

export default function RegexBuilder({ value, onChange }: RegexBuilderProps) {
  const renderedFlags = REGEX_FLAGS.map((flag) => (
    <li key={flag.id}>
      <FormControlLabel
        control={<Checkbox value={flag.id} />}
        label={`re.${flag.id}`}
        title={flag.hint}
      />
    </li>
  ))

  const handleRegexChange = (event: any) =>
    onChange({
      ...value,
      regex: event.target.value,
    })

  return (
    <form>
      <div>
        regex = """
        <TextField
          id="regex"
          label="Regex"
          variant="outlined"
          value={value.regex}
          onChange={handleRegexChange}
        />
        """
      </div>
      <div>
        test_string = """
        <TextField
          id="test-string"
          label="Test String"
          multiline
          variant="outlined"
        />
        """
      </div>
      <pre>
        &gt;&gt;&gt; flags =
        <ul>
          <li>0</li>
          {renderedFlags}
        </ul>
      </pre>
      <pre>
        &gt;&gt;&gt; re.compile(regex, flags).
        <Select defaultValue={'match'}>
          <MenuItem value="match">match</MenuItem>
          <MenuItem value="search">search</MenuItem>
          <MenuItem value="findall">findall</MenuItem>
        </Select>
        (test_string)
      </pre>
    </form>
  )
}
