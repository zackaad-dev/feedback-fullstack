import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type ColorMode = "dark" | "light";

interface ThemeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("theme_mode");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#FFFFFF" : "#000000",
            contrastText: mode === "dark" ? "#000000" : "#FFFFFF",
          },
          secondary: {
            main: mode === "dark" ? "#A1A1AA" : "#71717A",
          },
          background: {
            default: mode === "dark" ? "#000000" : "#FFFFFF",
            paper: mode === "dark" ? "#0A0A0A" : "#FAFAFA",
          },
          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#000000",
            secondary: mode === "dark" ? "#A1A1AA" : "#71717A",
          },
          divider: mode === "dark" ? "#262626" : "#E4E4E7",
          action: {
            hover: mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
          },
        },
        typography: {
          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
          h4: { fontWeight: 800, letterSpacing: "-0.03em" },
          h5: { fontWeight: 800, letterSpacing: "-0.02em" },
          h6: { fontWeight: 700, letterSpacing: "-0.01em" },
          subtitle1: { fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 700, letterSpacing: "-0.01em" },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 9999,
                fontWeight: 700,
                boxShadow: "none",
                padding: "8px 20px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "none",
                },
              },
              containedPrimary: {
                backgroundColor: mode === "dark" ? "#FFFFFF" : "#000000",
                color: mode === "dark" ? "#000000" : "#FFFFFF",
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#E4E4E7" : "#27272A",
                },
              },
              outlined: {
                borderColor: mode === "dark" ? "#262626" : "#E4E4E7",
                color: mode === "dark" ? "#FFFFFF" : "#000000",
                "&:hover": {
                  borderColor: mode === "dark" ? "#52525B" : "#A1A1AA",
                  backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 16,
                border: `1px solid ${mode === "dark" ? "#262626" : "#E4E4E7"}`,
                boxShadow: "none",
                backgroundColor: mode === "dark" ? "#0A0A0A" : "#FFFFFF",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#262626" : "#E4E4E7",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#52525B" : "#A1A1AA",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#FFFFFF" : "#000000",
                  borderWidth: 1.5,
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
