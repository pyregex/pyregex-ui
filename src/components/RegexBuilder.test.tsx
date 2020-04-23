import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import RegexBuilder, { RegexForm } from './RegexBuilder'

const DEFAULT_FORM: RegexForm = {
  regex: '(test )?string',
  testString: '',
  matchType: 'match',
  flags: [],
}

describe('RegexBuilder', () => {
  describe('Regex field', () => {
    let callback
    let regexForm
    let getByLabelText

    beforeEach(() => {
      callback = jest.fn()
      regexForm = { ...DEFAULT_FORM }

      const wrapper = render(
        <RegexBuilder value={regexForm} onChange={callback} />,
      )
      getByLabelText = wrapper.getByLabelText
    })

    it('renders the regex string', () => {
      expect(getByLabelText('Regex').value).toEqual(regexForm.regex)
    })

    it('saves the regex string', () => {
      fireEvent.change(getByLabelText('Regex'), {
        target: {
          value: '.*',
        },
      })

      expect(callback).toHaveBeenCalledWith({
        ...DEFAULT_FORM,
        regex: '.*',
      })
    })
  })

  it.todo('saves the test string')
  it.todo('saves the flags as an array')
  it.todo('saves updates the array of flags')

  it.todo('saves the python method')
})