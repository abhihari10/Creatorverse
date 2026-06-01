import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Save, Trash2 } from 'lucide-react'
import type { CreatorInput } from '../types'

type CreatorFormProps = {
  title: string
  submitLabel: string
  form: CreatorInput
  isSaving: boolean
  error: string
  onChange: (field: keyof CreatorInput, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onDelete?: () => void
  isDeleting?: boolean
}

function CreatorForm({
  title,
  submitLabel,
  form,
  isSaving,
  error,
  onChange,
  onSubmit,
  onDelete,
  isDeleting = false,
}: CreatorFormProps) {
  return (
    <section className="form-page">
      <div className="page-heading compact">
        <span className="eyebrow">Creator profile</span>
        <h1>{title}</h1>
      </div>

      <form className="creator-form" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            required
            maxLength={80}
            placeholder="MKBHD"
          />
        </label>

        <label>
          Channel URL
          <input
            type="url"
            value={form.url}
            onChange={(event) => onChange('url', event.target.value)}
            required
            placeholder="https://www.youtube.com/@mkbhd"
          />
        </label>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={(event) => onChange('description', event.target.value)}
            required
            rows={5}
            maxLength={320}
            placeholder="What do they make, and why are they worth following?"
          />
        </label>

        <label>
          Image URL
          <input
            type="url"
            value={form.imageURL}
            onChange={(event) => onChange('imageURL', event.target.value)}
            placeholder="https://example.com/creator.jpg"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={isSaving}>
            <Save size={18} aria-hidden="true" />
            {isSaving ? 'Saving...' : submitLabel}
          </button>
          <Link to="/" className="button-secondary">
            Cancel
          </Link>
          {onDelete ? (
            <button
              type="button"
              className="button-danger"
              onClick={onDelete}
              disabled={isDeleting}
            >
              <Trash2 size={18} aria-hidden="true" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}

export default CreatorForm
