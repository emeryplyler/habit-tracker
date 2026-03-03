// context provider
"use client"; // in order to use useState, this must be a client component
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

// create wrapper to be used at top level layout.tsx to provide context to all children (elements inside wrapper)
export function AppWrapper({ children }: { children: React.ReactNode; }) {
    let [currentUser, setCurrentUser] = useState();

    return (
        <AppContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AppContext.Provider>
    )
}

// create function to access context from other files
export function useAppContext() {
    return useContext(AppContext);
}
