export default function Input({ label, id, error, ...props }) {
  return (
    <div className="bookingContainer">
      <label className={`bookingLabel ${error ? "error" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          className={`bookingInput ${error ? "error" : ""}`}
          id={id}
          {...props}
        />
        <div className="control-error">{error && <p>{error}</p>}</div>
      </div>
    </div>
  );
}
