import * as animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height',
                spacing: 'margin, padding',
            },
            keyframes: {
                dropdown: {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                }
            },
            animation: {
                dropdown: 'dropdown 0.2s ease-out',
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {},
            fontFamily: {
                virgil: ["Virgil", "sans-serif"],
                quicksand: ["Quicksand", "sans-serif"],
            },
        },
    },
    plugins: [animate],
};
