import React from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@material-ui/core'

export default function RegexBuilder() {
  const regexFlags = [
    {
      id: 'I',
      hint: 'Ignore Case',
    },
    {
      id: 'L',
      hint:
        'Make \\w, \\W, \\b, \\B, \\s and \\S dependent on the current locale.',
    },
    {
      id: 'M',
      hint: 'Multi-line Regular Expression',
    },
    {
      id: 'S',
      hint:
        'Make the "." special character match any character at all, ' +
        'including a newline',
    },
    {
      id: 'U',
      hint:
        'Make \\w, \\W, \\b, \\B, \\d, \\D, \\s and \\S dependent on the ' +
        'Unicode character properties database.',
    },
    {
      id: 'X',
      hint: 'Verbose',
    },
  ]

  const renderedFlags = regexFlags.map((flag) => (
    <li key={flag.id}>
      <FormControlLabel
        control={<Checkbox value={flag.id} />}
        label={`re.${flag.id}`}
        title={flag.hint}
      />
    </li>
  ))

  return (
    <form>
      <div>
        regex = """
        <TextField label="regex" variant="outlined" />
        """
      </div>
      <div>
        test_string = """
        <TextField label="test string" multiline variant="outlined" />
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
