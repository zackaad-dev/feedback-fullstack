import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
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

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
            main: mode === "dark" ? "#FFFFFF" : "#101010",
            contrastText: mode === "dark" ? "#101010" : "#FFFFFF",
          },
          secondary: {
            main: mode === "dark" ? "#A1A1AA" : "#71717A",
          },
          background: {
            default: mode === "dark" ? "#101010" : "#FFFFFF",
            paper: mode === "dark" ? "#181818" : "#FAFAFA",
          },
          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#101010",
            secondary: mode === "dark" ? "#909095" : "#606065",
          },
          divider: mode === "dark" ? "#282828" : "#E4E4E7",
          action: {
            hover:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.04)",
          },
        },
        typography: {
          fontFamily: `Inter`,
          h4: { fontWeight: 700, letterSpacing: "-0.01em" },
          h5: { fontWeight: 700, letterSpacing: "-0.01em" },
          h6: { fontWeight: 700 },
          subtitle1: { fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 600 },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 9999,
                fontWeight: 600,
                boxShadow: "none",
                padding: "10px 24px",
                fontSize: "0.95rem",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "none",
                },
              },
              containedPrimary: {
                backgroundColor: mode === "dark" ? "#FFFFFF" : "#101010",
                color: mode === "dark" ? "#101010" : "#FFFFFF",
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#E4E4E7" : "#27272A",
                },
              },
              outlined: {
                borderColor: mode === "dark" ? "#333333" : "#E4E4E7",
                color: mode === "dark" ? "#FFFFFF" : "#101010",
                "&:hover": {
                  borderColor: mode === "dark" ? "#666666" : "#A1A1AA",
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 16,
                border: `1px solid ${mode === "dark" ? "#282828" : "#E4E4E7"}`,
                boxShadow: "none",
                backgroundColor: mode === "dark" ? "#181818" : "#FFFFFF",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                backgroundColor: mode === "dark" ? "#101010" : "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#333333" : "#D4D4D8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#555555" : "#A1A1AA",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#FFFFFF" : "#101010",
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
    [mode],
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
