import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";
import LanguageSelector from "../../shared/LanguageSelector";
import type { NavItem } from "../../../types/types";
// ✅ Import correcto del contexto
import { ThemeContext } from "../../../contexts/ThemeContext"; // Ajusta la ruta según tu estructura
import useLanguage from "../../../hooks/useLanguage";
import { Logo } from "../../ui/logo";

const drawerWidth = 300;

function DrawerAppBar() {
  const { t } = useLanguage();
  // ✅ Corrección: usar isDarkMode en lugar de theme
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems: NavItem[] = [{ name: t("link1"), href: "#contact" }];
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <AppBar
        component="nav"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Logo />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography
                variant="subtitle1"
                component={"a"}
                href="#"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                SugarCheck
              </Typography>
              <Typography
                variant={"caption"}
                component="a"
                href="#"
                sx={{
                  fontWeight: 400,
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                Tu Control de Diabetes
              </Typography>
            </Box>
          </Box>

          {/* Menú desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.name}
              </Link>
            ))}

            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {/* ✅ Usar isDarkMode correctamente */}
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <LanguageSelector />
          </Box>

          {/* Menú hamburguesa */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "text.primary",
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar >

      {/* Drawer móvil */}
      < Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }
        }
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "background.paper",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: "text.primary" }}
            >
              <CancelIcon />
            </IconButton>
          </Box>

          <List sx={{ px: 2 }}>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Cambiar tema:
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              onClick={() => {
                toggleTheme();
                setDrawerOpen(false);
              }}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                py: 1.5,
              }}
            >
              Cambiar a {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mt: 3,
              textAlign: "center",
              fontSize: "0.75rem",
            }}
          >
            Made with ❤️ by Gabriel
          </Typography>
        </Box>
      </Drawer >

      <Toolbar />
    </>
  );
}

export default DrawerAppBar;
