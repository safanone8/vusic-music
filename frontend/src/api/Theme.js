import React from "react";

export const themes = {
    light: {
    theme: "#07689f",
    subTheme: "#a2d5f2",
    surface: "#ffffff",
    surfaceAlt: "#f0f3f6",
        component:{
            backgroundColor: "#f6f6f6",
            color: "#2b2024",
        },
        button:{
            onHover:{
                backgroundColor:"#a2d5f2",
                color:"#191919"
            },
            contained:{
                backgroundColor: "#07689f",
                color:"#fafafa"
            },
            outlined:{
                backgroundColor:"transparent",
                color:"#191919"
            }
        },
        volume:{
            color:"#07689f"
        }
    },
};

export const ThemeContext = React.createContext(
    themes.light
);

/*
export const ThemeProvider = (props) => {
    const [theme,setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={[theme,setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}*/
