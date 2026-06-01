import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Pencil } from 'lucide-react'
import StateMessage from '../components/StateMessage'
import { fetchCreator } from '../lib/creators'
import type { Creator } from '../types'

function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Unable to load this creator.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadCreator()
  }, [id])

  if (isLoading) {
    return <StateMessage title="Loading profile" message="Fetching this creator." />
  }

  if (error || !creator) {
    return (
      <StateMessage
        title="Creator not found"
        message={error || 'That profile could not be found.'}
        actionLabel="Back to directory"
        actionTo="/"
      />
    )
  }

  return (
    <section className="detail-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} aria-hidden="true" />
        Directory
      </Link>

      <article className="detail-layout">
        <div className="detail-image">
          {creator.imageURL ? <img src={creator.imageURL} alt="" /> : <span>{creator.name[0]}</span>}
        </div>

        <div className="detail-copy">
          <span className="eyebrow">Creator profile</span>
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noreferrer" className="creator-url">
            {creator.url}
          </a>

          <div className="detail-actions">
            <a href={creator.url} target="_blank" rel="noreferrer" className="button-primary">
              <ExternalLink size={18} aria-hidden="true" />
              Visit channel
            </a>
            <Link to={`/creator/${creator.id}/edit`} className="button-secondary">
              <Pencil size={18} aria-hidden="true" />
              Edit creator
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ViewCreator
