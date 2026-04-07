import {Stack, Text, TextInput} from '@sanity/ui'
import {PatchEvent, set, unset, type StringInputProps} from 'sanity'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

function normalizeHex(value: unknown) {
  if (typeof value !== 'string') return ''
  const v = value.trim()
  if (!v) return ''
  if (/^#([0-9a-fA-F]{6})$/.test(v)) return v.toLowerCase()
  return ''
}

export default function ColorHexInput(props: StringInputProps) {
  const {value, onChange, elementProps} = props

  const hex = useMemo(() => normalizeHex(value), [value])

  const [draftHex, setDraftHex] = useState(hex)
  const commitTimerRef = useRef<number | null>(null)

  useEffect(() => {
    setDraftHex(hex)
  }, [hex])

  const commit = useCallback(
    (next: string) => {
      const normalized = normalizeHex(next)
      onChange(normalized ? PatchEvent.from(set(normalized)) : PatchEvent.from(unset()))
    },
    [onChange],
  )

  const scheduleCommit = useCallback(
    (next: string) => {
      if (commitTimerRef.current != null) {
        window.clearTimeout(commitTimerRef.current)
      }
      commitTimerRef.current = window.setTimeout(() => {
        commitTimerRef.current = null
        commit(next)
      }, 150)
    },
    [commit],
  )

  useEffect(() => {
    return () => {
      if (commitTimerRef.current != null) {
        window.clearTimeout(commitTimerRef.current)
      }
    }
  }, [])

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value
      const next = normalizeHex(raw)
      setDraftHex(next)
      scheduleCommit(next)
    },
    [scheduleCommit],
  )

  const handleColorBlur = useCallback(() => {
    commit(draftHex)
  }, [commit, draftHex])

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value
      const next = normalizeHex(raw)
      setDraftHex(raw)
      if (!raw) {
        onChange(PatchEvent.from(unset()))
        return
      }
      if (next) {
        onChange(PatchEvent.from(set(next)))
      }
    },
    [onChange],
  )

  const handleTextBlur = useCallback(() => {
    commit(draftHex)
  }, [commit, draftHex])

  return (
    <Stack space={3}>
      <Stack space={2}>
        <Text size={1}>Pick</Text>
        <input
          type="color"
          value={normalizeHex(draftHex) || '#000000'}
          onChange={handleColorChange}
          onBlur={handleColorBlur}
          style={{height: 40, width: 80, padding: 0, border: 'none', background: 'transparent'}}
        />
      </Stack>
      <Stack space={2}>
        <Text size={1}>Hex</Text>
        <TextInput {...elementProps} value={draftHex || ''} onChange={handleTextChange} onBlur={handleTextBlur} placeholder="#1e3a8a" />
      </Stack>
    </Stack>
  )
}
