import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UsersProvider from "./features/users/UsersProvider.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <UsersProvider>
        <App />
      </UsersProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

/*
supabase: M505QCReOopLRao4
url: https://ylcrastmkkjzgmyxfwoo.supabase.co
public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3Jhc3Rta2tqemdteXhmd29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1Nzg5MTUsImV4cCI6MjAxOTE1NDkxNX0.FpQOSp7aaUCqrAUhd7XcHQPhhZszqRk8_0QX24IbiBQ

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ylcrastmkkjzgmyxfwoo.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

*/
