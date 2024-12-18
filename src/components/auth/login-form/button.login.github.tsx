"use client";

import Button from "@mui/material/Button";

// import { signIn } from "next-auth/react";

export default function ButtonLoginGithub() {
    const handleClick = () => {
        // signIn("github", { redirect: true });
        alert('Feature in development');
    }

    return (
        <Button
            onClick={handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: "#eeeeee",
                color: "black",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
            }}
        >
            <GithubIcon />
            <span style={{ fontSize: 14, fontWeight: 700 }}>Sign up with GitHub</span>
        </Button>
    );
}

function GithubIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
            fill="black"
            style={{ marginRight: "8px" }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.04-1.61-4.04-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 1.204.084 1.837 1.237 1.837 1.237 1.07 1.832 2.807 1.303 3.493.996.107-.774.418-1.303.76-1.603-2.665-.307-5.466-1.334-5.466-5.931 0-1.31.47-2.382 1.237-3.221-.124-.307-.536-1.542.117-3.216 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.4 3.005-.405 1.02.005 2.047.139 3.005.405 2.293-1.552 3.3-1.23 3.3-1.23.655 1.674.243 2.909.12 3.216.77.839 1.235 1.911 1.235 3.221 0 4.607-2.805 5.62-5.476 5.92.429.369.813 1.1.813 2.217v3.293c0 .32.19.694.8.576C20.565 21.8 24 17.303 24 12 24 5.372 18.627 0 12 0z"
            />
        </svg>
    );
}
