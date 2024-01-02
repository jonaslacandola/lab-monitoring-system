import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        /* Slate */
        --slate-50: #f8fafc;
        --slate-100: #f1f5f9;
        --slate-200: #e2e8f0;
        --slate-300: #cbd5e1;
        --slate-400: #94a3b8;
        --slate-600: #475569;
        --slate-700: #334155;
        --slate-800: #1e293b;
        --slate-900: #0f172a;

        /* Gray */
        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #d1d5db;
        --gray-400: #9ca3af;

        /* Yellow */
        --yellow-400: #facc15;

        /* Blue */
        --blue-500: #3b82f6;

        /* Green */
        --lime-400: #a3e635;
        --lime-500: #84cc16;
        --lime-600: #65a30d;

        /* Red */
        --red-100: #fee2e2;
        --red-200: #fecaca;
        --red-400: #f87171;
        --red-500: #ef4444;
        --red-600: #dc2626;
        /* backdrop-color */
        --backdrop-color: #9ca3af3a;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Poppins', sans-serif;
    }

    h1 {
        font-weight: 600;
        font-size: 2rem;
    }

    body {
        color: var(--slate-800);
    }
`;

export default GlobalStyles;
