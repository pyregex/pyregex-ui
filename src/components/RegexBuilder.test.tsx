import { render, fireEvent } from '@testing-library/react'
import React from 'react'
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
        ...DEFAULT_FORM,
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
        ...DEFAULT_FORM,
        testString: 'a string',
      })
    })
  })

  describe('Regex flags', () => {
    beforeEach(() => {
      callback = jest.fn()
      regexForm = { ...DEFAULT_FORM, flags: ['M'] }

      const wrapper = render(
        <RegexBuilder value={regexForm} onChange={callback} />,
      )
      getByLabelText = wrapper.getByLabelText
    })

    it('adds a flag to the array', () => {
      fireEvent.click(getByLabelText('re.I'))

      expect(callback).toHaveBeenCalledWith({
        ...DEFAULT_FORM,
        flags: ['M', 'I'],
      })
    })

    it('removes a flag from the array', () => {
      fireEvent.click(getByLabelText('re.M'))

      expect(callback).toHaveBeenCalledWith({
        ...DEFAULT_FORM,
        flags: [],
      })
    })
  })
  it.todo('saves updates the array of flags')

  it.todo('saves the python method')
})
