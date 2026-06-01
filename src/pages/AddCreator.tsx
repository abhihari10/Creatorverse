import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatorForm from '../components/CreatorForm'
import { addCreator } from '../lib/creators'
import type { CreatorInput } from '../types'

const blankCreator: CreatorInput = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState(blankCreator)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  function updateField(field: keyof CreatorInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const creator = await addCreator(form)
      navigate(`/creator/${creator.id}`)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to add creator.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <CreatorForm
      title="Add a creator"
      submitLabel="Create profile"
      form={form}
      isSaving={isSaving}
      error={error}
      onChange={updateField}
      onSubmit={handleSubmit}
    />
  )
}

export default AddCreator
