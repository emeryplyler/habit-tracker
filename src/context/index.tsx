// context provider
"use client"; // in order to use useState, this must be a client component
import { createContext, useContext, useState } from "react";

const AppContext = createContext({ // initialize context to the same object we'll use state for
    currentUserId: null,
    currentUsername: null
});

export function AppWrapper({ children }: { children: React.ReactNode; }) {
    let [state, setState] = useState({ // initialize stateful var to whatever context initialized for us
        currentUserId: null,
        currentUsername: null
    });

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}
