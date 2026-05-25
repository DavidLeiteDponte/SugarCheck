import { Box, useTheme, Typography, TextField, Button, Link } from "@mui/material";
import { LogoGA } from "../components/ui/LogoGA";

export default function Login() {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex', margin: 3, flexDirection: 'row', gap: 4 }}>
                {/* Columna izquierda - Bienvenida */}
                <Box sx={{
                    width: '411px',
                    height: '500px',
                    flex: 1,
                    bgcolor: theme.palette.primary.light,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2
                }}>
                    <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
                        ¡Bienvenido, Guerrero!
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary, maxWidth: '400px' }}>
                        Prepárate para la batalla de hoy. Entra a tu panel, asegura tu bienestar y mantente firme en la zona segura.
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 3 }}>
                        ¿Aún no tienes cuenta?{' '}
                        <Link href="#" sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                            Registrarse
                        </Link>
                    </Typography>
                </Box>

                {/* Columna derecha - Formulario */}
                <Box sx={{
                    flex: 1,
                    bgcolor: theme.palette.primary.dark,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 2,
                    width: '411px',
                    height: '500px',
                }}>
                    <Box sx={{ maxWidth: '400px', width: '100%' }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                            Iniciar Sesión
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                            Ingresa tus credenciales para acceder
                        </Typography>

                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                                '& .MuiInputBase-input': { color: 'white' }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                                '& .MuiInputBase-input': { color: 'white' }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mb: 2,
                                py: 1.5,
                                bgcolor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            Ingresar
                        </Button>

                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Link href="#" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', margin: 3, flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
                    Patrocinado por
                </Typography>
                <LogoGA />
            </Box>
        </>
    );
}