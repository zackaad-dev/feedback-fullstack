import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useColorMode } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "760px", width: "100%", mx: "auto", px: { xs: 2, sm: 4 } }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: "text.primary",
              color: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            F
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
            Feedback
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={toggleColorMode} color="inherit" size="small" sx={{ p: 1 }}>
            {mode === "dark" ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
          </IconButton>

          {isLoggedIn ? (
            <>
              <Button variant="contained" color="primary" onClick={() => navigate("/create")}>
                Post
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}>
                @{user?.username}
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};