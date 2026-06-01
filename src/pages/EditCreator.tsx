import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreatorForm from '../components/CreatorForm'
import StateMessage from '../components/StateMessage'
import { deleteCreator, fetchCreator, updateCreator } from '../lib/creators'
import type { Creator, CreatorInput } from '../types'

const blankCreator: CreatorInput = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [form, setForm] = useState(blankCreator)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCreator() {
      if (!id) {
        setError('Missing creator id.')
        setIsLoading(false)
        return
      }

      try {
        const data = await fetchCreator(id)
        setCreator(data)
        setForm({
          name: data.name,
          url: data.url,
          description: data.description,
          imageURL: data.imageURL ?? '',
        })
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Unable to load this creator.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadCreator()
  }, [id])

  function updateField(field: keyof CreatorInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!creator) {
      return
    }

    setError('')
    setIsSaving(true)

    try {
      const updated = await updateCreator(creator.id, form)
      navigate(`/creator/${updated.id}`)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to update creator.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!creator) {
      return
    }

    setError('')
    setIsDeleting(true)

    try {
      await deleteCreator(creator.id)
      navigate('/')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to delete creator.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <StateMessage title="Loading editor" message="Fetching this creator." />
  }

  if (!creator && error) {
    return (
      <StateMessage
        title="Creator not found"
        message={error}
        actionLabel="Back to directory"
        actionTo="/"
      />
    )
  }

  return (
    <CreatorForm
      title={`Edit ${creator?.name ?? 'creator'}`}
      submitLabel="Save changes"
      form={form}
      isSaving={isSaving}
      error={error}
      onChange={updateField}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  )
}

export default EditCreator
