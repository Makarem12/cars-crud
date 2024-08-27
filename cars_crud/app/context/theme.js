// create the context provider

import { createContext, useEffect, useState } from "react";

// 1. create the context
export const ThemeContext = createContext();

//2. create the context wrapper
export default function ThemeWrapper({children}) {
    
    const [isDarktheme, setIsDarkTheme] = useState(true);

    function initialThemeHandler() {
        if(!localStorage.getItem("isDarkTheme")){
            localStorage.setItem("isDarkTheme", 'true')
            document.querySelector("body").classList.add("dark");
            setIsDarkTheme(true);
        }
        else {
            const isDarktheme = JSON.parse(localStorage.getItem("isDarkTheme"));
            isDarktheme && document.querySelector("body").classList.add("dark");
            setIsDarkTheme(isDarktheme)
        }

    }

    function toggleThemeHandler() {
        const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"))
        setIsDarkTheme(!isDarkTheme);
        document.querySelector("body").classList.toggle("dark");
        localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);

    }

    const globalState = {
        isDarktheme : true,
        toggleThemeHandler
    }

    useEffect(()=> initialThemeHandler());

    return (
        <>
            <ThemeContext.Provider value={globalState}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}