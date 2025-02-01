import "./signcard.css";

export function SignCard({
  heading,
  about,
  children,
  buttonText,
  linkText,
  linkUrl,
  to,
  onClick,
}) {
  return (
    <div className="signcard-container">
      <div className="signcard">
        <div className="signcard-heading">{heading}</div>
        <div className="signcard-about">{about}</div>
        <form onSubmit={onClick}>
          {children} {/* Inputs injected here */}
          <button type="submit" className="signcard-button">
            {buttonText}
          </button>
        </form>
        <div className="signcard-link-container">
          <div>{linkText}</div>
          <a href={to} className="signcard-link">
            {linkUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
