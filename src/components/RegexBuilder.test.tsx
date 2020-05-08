interface FakeSelectProps {
  children: any[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  defaultValue: string
  title: string
}

jest.mock(
  '@material-ui/core/Select',
  () => ({ onChange, defaultValue, title }: FakeSelectProps) => (
    <input
      type="text"
      onChange={onChange}
      defaultValue={defaultValue}
      title={title}
    />
  ),
)

import { render, fireEvent } from '@testing-library/react'
import React, { ChangeEvent } from 'react'
import RegexBuilder, { RegexForm } from './RegexBuilder'

describe('RegexBuilder', () => {
  const DEFAULT_FORM: RegexForm = {
    regex: '(test )?string',
    testString: '',
    matchType: 'match',
    flags: [],
  }

  let callback: (value: RegexForm) => any
  let regexForm: RegexForm
  let getByLabelText: Function

  describe('Regex field', () => {
    let callback: (value: RegexForm) => any
    let regexForm: RegexForm
    let getByLabelText: Function

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
        regex: '.*',
      })
    })
  })

  describe('Test string field', () => {
    beforeEach(() => {
      callback = jest.fn()
      regexForm = { ...DEFAULT_FORM }

      const wrapper = render(
        <RegexBuilder value={regexForm} onChange={callback} />,
      )
      getByLabelText = wrapper.getByLabelText
    })

    it('renders the test string', () => {
      expect(getByLabelText('Test String').value).toEqual(regexForm.testString)
    })

    it('saves the test string', () => {
      fireEvent.change(getByLabelText('Test String'), {
        target: {
          value: 'a string',
        },
      })
      expect(callback).toHaveBeenCalledWith({
        testString: 'a string',
      })
    })
  })

  describe('Regex flags', () => {
    let asFragment: () => DocumentFragment

    beforeEach(() => {
      callback = jest.fn()
      regexForm = { ...DEFAULT_FORM, flags: ['M'] }

      const wrapper = render(
        <RegexBuilder value={regexForm} onChange={callback} />,
      )
      getByLabelText = wrapper.getByLabelText
      asFragment = wrapper.asFragment
    })

    it('renders the array of flags as checkboxes', () => {
      expect(
        asFragment().querySelector('.regex-form__regex-flags'),
      ).toMatchSnapshot()
    })

    it('adds a flag to the array', () => {
      fireEvent.click(getByLabelText('re.I'))

      expect(callback).toHaveBeenCalledWith({
        flags: ['M', 'I'],
      })
    })

    it('removes a flag from the array', () => {
      fireEvent.click(getByLabelText('re.M'))

      expect(callback).toHaveBeenCalledWith({
        flags: [],
      })
    })
  })

  describe('Match type selector', () => {
    let getByTitle: Function

    beforeEach(() => {
      callback = jest.fn()
      regexForm = { ...DEFAULT_FORM }

      const wrapper = render(
        <RegexBuilder value={regexForm} onChange={callback} />,
      )
      getByLabelText = wrapper.getByLabelText
      getByTitle = wrapper.getByTitle
    })

    it('renders the python method', () => {
      expect(getByTitle('Match type')).toMatchObject({
        defaultValue: DEFAULT_FORM.matchType,
      })
    })

    it('saves the python method', () => {
      fireEvent.change(getByTitle('Match type'), {
        target: {
          value: 'search',
        },
      })

      expect(callback).toHaveBeenCalledWith({
        matchType: 'search',
      })
    })
  })
})
