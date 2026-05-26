import { Box, useTheme, Typography, TextField, Button, Link } from "@mui/material";
import { LogoGA } from "../components/ui/LogoGA";
import LockIcon from '@mui/icons-material/Lock';

export default function RecoveryPassword() {
    const theme = useTheme();

    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: theme.palette.background.default || '#f5f5f5',
            p: 3
        }}>
            {/* Contenedor de las dos tarjetas */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 4, 
                justifyContent: 'center', 
                alignItems: 'stretch',
                maxWidth: '900px',
                width: '100%'
            }}>
                {/* Columna izquierda - Bienvenida */}
                <Box sx={{
                    flex: 1,
                    bgcolor: theme.palette.primary.light,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 3,
                    minHeight: '500px',
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        ¿Perdiste la llave del Oráculo?
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary, maxWidth: '350px', mb: 4 }}>
                        No te preocupes. Incluso los guerreros más experimentados necesitan un recordatorio
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
                    borderRadius: 3,
                    boxShadow: 3,
                    minHeight: '500px',
                }}>
                    <Box sx={{ maxWidth: '350px', width: '100%', textAlign: 'center' }}>
                        <LockIcon sx={{ fontSize: 50, color: 'white', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                            Ingresa tu correo electrónico para recuperar tu contraseña
                        </Typography>

                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            size="small"
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

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mb: 2,
                                py: 1,
                                bgcolor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            Recuperar Contraseña
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Footer - Patrocinado por */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mt: 5,
                pt: 2
            }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Patrocinado por
                </Typography>
                <LogoGA />
            </Box>
        </Box>
    );
}