import { Link } from 'react-router-dom'

type StateMessageProps = {
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}

function StateMessage({ title, message, actionLabel, actionTo }: StateMessageProps) {
  return (
    <div className="state-message" role="status">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="button-primary">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

export default StateMessage
