/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                'primary-orange': '#FF6B00',
                'secondary-orange': '#FF8533',
                'accent-orange': '#FF9E66',
            }
        },
    },
    plugins: [],
}
