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
  flags: string[]
  matchType: 'match' | 'search' | 'findall'
}

export interface RegexFormChangeEvent {
  regex?: string
  testString?: string
  flags?: string[]
  matchType?: 'match' | 'search' | 'findall'
}

interface RegexBuilderProps {
  onChange: (value: RegexFormChangeEvent) => any
  value: RegexForm
}

const RegexInput = React.memo(
  function RegexInput({
    value,
    onChange,
  }: {
    value: string
    onChange: (event: any) => void
  }) {
    return (
      <TextField
        id="regex"
        label="Regex"
        variant="outlined"
        defaultValue={value}
        onChange={onChange}
      />
    )
  },
  (prev, next) => prev.value === next.value,
)

export default function RegexBuilder({ value, onChange }: RegexBuilderProps) {
  const handleRegexChange = (event: any) =>
    onChange({
      regex: event.target.value,
    })

  const handleTestStringChange = (event: any) =>
    onChange({
      testString: event.target.value,
    })

  const handleFlagsClick = (event: any) => {
    const checked: boolean = event.target.checked
    const flag: string = event.target.value
    let newValue: string[]
    if (checked) {
      newValue = [...value.flags, flag]
    } else {
      newValue = [...value.flags]
      const index = newValue.indexOf(flag)
      newValue.splice(index, 1)
    }
    onChange({
      flags: newValue,
    })
  }

  const handleMatchTypeChange = (event: any) => {
    onChange({
      matchType: event.target.value,
    })
  }

  const renderedFlags = REGEX_FLAGS.map((flag) => (
    <li key={flag.id}>
      <FormControlLabel
        control={
          <Checkbox
            value={flag.id}
            checked={value.flags.indexOf(flag.id) !== -1}
            onChange={handleFlagsClick}
          />
        }
        label={`re.${flag.id}`}
        title={flag.hint}
      />
    </li>
  ))

  return (
    <form>
      <div>
        regex = """
        <RegexInput onChange={handleRegexChange} value={value.regex} />
        """
      </div>
      <div>
        test_string = """
        <TextField
          id="test-string"
          label="Test String"
          multiline
          variant="outlined"
          defaultValue={value.testString}
          onChange={handleTestStringChange}
        />
        """
      </div>
      <pre>
        &gt;&gt;&gt; flags =
        <ul className="regex-form__regex-flags">
          <li>0</li>
          {renderedFlags}
        </ul>
      </pre>
      <pre>
        &gt;&gt;&gt; re.compile(regex, flags).
        <Select
          defaultValue={value.matchType}
          onChange={handleMatchTypeChange}
          title="Match type"
        >
          <MenuItem value="match">match</MenuItem>
          <MenuItem value="search">search</MenuItem>
          <MenuItem value="findall">findall</MenuItem>
        </Select>
        (test_string)
      </pre>
    </form>
  )
}
