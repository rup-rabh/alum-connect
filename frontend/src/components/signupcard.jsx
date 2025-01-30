// SignUpCard.jsx
import "./signcard.css";

export function SignUpCard({ heading, about, buttonText, linkText, linkUrl, to, onClick }) {
  return (
    <div className="signcard-container">
      <div className="signcard">
        <div className="signcard-heading">{heading}</div>
        <div className="signcard-about">{about}</div>
        <form onSubmit={onClick}>
          <input type="text" placeholder="First Name" className="signcard-input" required />
          <input type="text" placeholder="Last Name" className="signcard-input" required />
          <input type="text" placeholder="Username" className="signcard-input" required />
          <input type="email" placeholder="Email ID" className="signcard-input" required />
          <input type="password" placeholder="Password" className="signcard-input" required />
          <input type="password" placeholder="Confirm Password" className="signcard-input" required />
          <button type="submit" className="signcard-button">{buttonText}</button>
        </form>
        <div className="signcard-link-container">
          <div>{linkText}</div>
          <a href={to} className="signcard-link">{linkUrl}</a>
        </div>
      </div>
    </div>
  );
}