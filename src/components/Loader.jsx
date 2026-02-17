export default function Loader({ text = 'Loading...', center = false }) {
  return (
    <div className={`loader ${center ? 'loader--center' : ''}`.trim()} role="status" aria-live="polite">
      <span className="spinner" />
      <p>{text}</p>
    </div>
  )
}
