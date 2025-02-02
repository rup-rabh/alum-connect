import "./signcard.css";

export function SignCard({
  heading,
  about,
  children,
  buttonText,
  linkText,
  linkUrl,
  to,
  onSubmit,
  isLoading,
}) {
  return (
    <div className="signcard-container">
      <div className="signcard">
        <div className="signcard-heading">{heading}</div>
        <div className="signcard-about">{about}</div>
        <form onSubmit={onSubmit}>
          {children} {/* Inputs injected here */}
          <button
            type="submit"
            className="signcard-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-container">
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            ) : (
              buttonText
            )}
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
