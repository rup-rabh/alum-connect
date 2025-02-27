import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LinkedInCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            // Store token in localStorage
            localStorage.setItem("token", token);
            navigate("/"); // Redirect to landing page
        } else {
            navigate("/"); // Redirect to sign-in if no token
        }
    }, [navigate]);

    return <div>Redirecting...</div>;
};

export default LinkedInCallback;
