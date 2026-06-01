import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Card from '../components/Card'
import StateMessage from '../components/StateMessage'
import { fetchCreators } from '../lib/creators'
import type { Creator } from '../types'

function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCreators() {
      try {
        const data = await fetchCreators()
        setCreators(data)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Unable to load creators.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadCreators()
  }, [])

  if (isLoading) {
    return <StateMessage title="Loading Creatorverse" message="Fetching your creators." />
  }

  if (error) {
    return (
      <StateMessage
        title="Supabase needs a nudge"
        message={error}
        actionLabel="Add creator"
        actionTo="/new"
      />
    )
  }

  return (
    <section className="directory-page">
      <div className="page-heading">
        <span className="eyebrow">Creator directory</span>
        <h1>Follow smart makers, explainers, artists, and performers.</h1>
        <p>
          Keep a living list of creators worth revisiting. Open a profile for the
          full details, jump to their channel, or edit the recommendation.
        </p>
        <Link to="/new" className="button-primary">
          <Plus size={18} aria-hidden="true" />
          Add creator
        </Link>
      </div>

      {creators.length > 0 ? (
        <div className="creator-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <StateMessage
          title="No creators yet"
          message="Add your first creator to start shaping the directory."
          actionLabel="Add creator"
          actionTo="/new"
        />
      )}
    </section>
  )
}

export default ShowCreators
