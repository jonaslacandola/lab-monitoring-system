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
        --gray-500: #6b7280;

        /* Yellow */
        --yellow-400: #facc15;

        /* Blue */
        --blue-100: #dbeafe;
        --blue-200: #bfdbfe;
        --blue-300: #93c5fd;
        --blue-400: #60a5fa;
        --blue-500: #3b82f6;

        /* Sky */
        --sky-100: #e0f2fe;
        --sky-200: #bae6fd;
        --sky-300: #7dd3fc;
        --sky-400: #38bdf8;
        --sky-500: #0ea5e9;

        /* Green */
        --lime-50: #f7fee7;
        --lime-100: #ecfccb;
        --lime-200: #d9f99d;
        --lime-400: #a3e635;
        --lime-500: #84cc16;
        --lime-600: #65a30d;

        /* Red */
        --red-50: #fef2f2;
        --red-100: #fee2e2;
        --red-200: #fecaca;
        --red-300: #fca5a5;
        --red-400: #f87171;
        --red-500: #ef4444;
        --red-600: #dc2626;
        --red-700: #b91c1c;
        --red-800: #991b1b;
        --red-900: #7f1d1d;
        --red-950: #450a0a;

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
