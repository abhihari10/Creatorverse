import { ExternalLink, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Creator } from '../types'

type CardProps = {
  creator: Creator
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Card({ creator }: CardProps) {
  return (
    <article className="creator-card">
      <Link to={`/creator/${creator.id}`} className="creator-card__media">
        {creator.imageURL ? (
          <img src={creator.imageURL} alt="" loading="lazy" />
        ) : (
          <span>{initials(creator.name)}</span>
        )}
      </Link>

      <div className="creator-card__body">
        <div>
          <Link to={`/creator/${creator.id}`} className="creator-card__title">
            {creator.name}
          </Link>
          <p>{creator.description}</p>
        </div>

        <div className="creator-card__actions">
          <a href={creator.url} target="_blank" rel="noreferrer">
            <ExternalLink size={17} aria-hidden="true" />
            Visit
          </a>
          <Link to={`/creator/${creator.id}/edit`}>
            <Pencil size={17} aria-hidden="true" />
            Edit
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Card
