import { useState } from 'react';
import { Box, useTheme, Typography, TextField, Button, Link, Grid } from "@mui/material";
import { LogoGA } from "../components/ui/LogoGA";
import LoginIcon from '@mui/icons-material/Login';
import StepComponent from '../components/ui/step';

export default function Register() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Paso 1: Crear cuenta
        nombre: '',
        edad: '',
        genero: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Paso 2: Configuración de salud
        peso: '',
        talla: '',
        glucosaMin: '',
        glucosaMax: '',
        // Paso 3: Contacto de confianza
        nombreGuardián: '',
        parentesco: '',
        telefono: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formData.email) newErrors.email = 'Correo electrónico es requerido';
        if (!formData.password) newErrors.password = 'Contraseña es requerida';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.peso) newErrors.peso = 'Peso es requerido';
        if (!formData.talla) newErrors.talla = 'Talla es requerida';
        if (!formData.glucosaMin) newErrors.glucosaMin = 'Glucosa mínima es requerida';
        if (!formData.glucosaMax) newErrors.glucosaMax = 'Glucosa máxima es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.nombreGuardián) newErrors.nombreGuardián = 'Nombre del guardián es requerido';
        if (!formData.parentesco) newErrors.parentesco = 'Parentesco es requerido';
        if (!formData.telefono) newErrors.telefono = 'Teléfono es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        let isValid = false;
        if (activeStep === 0) isValid = validateStep1();
        else if (activeStep === 1) isValid = validateStep2();
        else isValid = validateStep3();

        if (isValid && activeStep < 2) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleSubmit = () => {
        if (validateStep3()) {
            console.log('Formulario completo:', formData);
            alert('Registro completado exitosamente!');
        }
    };

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const textFieldStyles = {
        mb: 2,
        '& .MuiOutlinedInput-root': {
            bgcolor: 'rgba(255,255,255,0.1)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' }
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiFormHelperText-root': { color: '#ff6b6b' }
    };

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <LoginIcon sx={{ fontSize: 50, color: 'white', mb: 1 }} />
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                            Crear cuenta
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                            Ingresa tus credenciales para acceder
                        </Typography>

                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="outlined"
                            size="small"
                            value={formData.nombre}
                            onChange={handleChange('nombre')}
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Edad"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={formData.edad}
                            onChange={handleChange('edad')}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Género"
                            variant="outlined"
                            size="small"
                            value={formData.genero}
                            onChange={handleChange('genero')}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={formData.password}
                            onChange={handleChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Confirmar contraseña"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            sx={textFieldStyles}
                        />
                    </>
                );
            
            case 1:
                return (
                    <>
                        <LoginIcon sx={{ fontSize: 50, color: 'white', mb: 1 }} />
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                            Configuración de Salud
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                            Prepara tus Estadísticas
                        </Typography>

                        {/* Peso y Talla en dos columnas */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Peso (Kg)"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={formData.peso}
                                    onChange={handleChange('peso')}
                                    error={!!errors.peso}
                                    helperText={errors.peso}
                                    sx={textFieldStyles}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Talla (cm)"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={formData.talla}
                                    onChange={handleChange('talla')}
                                    error={!!errors.talla}
                                    helperText={errors.talla}
                                    sx={textFieldStyles}
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, textAlign: 'left' }}>
                            Rango objetivo de Glucosa
                        </Typography>

                        {/* Mínimo y Máximo en dos columnas */}
                        <Grid spacing={2} container sx={{ mb: 2 }}>
                            <Grid xs={6}>
                                <TextField
                                    fullWidth
                                    label="Mínimo"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={formData.glucosaMin}
                                    onChange={handleChange('glucosaMin')}
                                    error={!!errors.glucosaMin}
                                    helperText={errors.glucosaMin}
                                    sx={textFieldStyles}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <TextField
                                    fullWidth
                                    label="Máximo"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={formData.glucosaMax}
                                    onChange={handleChange('glucosaMax')}
                                    error={!!errors.glucosaMax}
                                    helperText={errors.glucosaMax}
                                    sx={textFieldStyles}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            
            case 2:
                return (
                    <>
                        <LoginIcon sx={{ fontSize: 50, color: 'white', mb: 1 }} />
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                            Contactos de Confianza
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                            Convoca a tus Guardianes
                        </Typography>

                        <TextField
                            fullWidth
                            label="Nombre del Guardián"
                            variant="outlined"
                            size="small"
                            value={formData.nombreGuardián}
                            onChange={handleChange('nombreGuardián')}
                            error={!!errors.nombreGuardián}
                            helperText={errors.nombreGuardián}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Parentesco"
                            variant="outlined"
                            size="small"
                            value={formData.parentesco}
                            onChange={handleChange('parentesco')}
                            error={!!errors.parentesco}
                            helperText={errors.parentesco}
                            sx={textFieldStyles}
                        />

                        <TextField
                            fullWidth
                            label="Teléfono"
                            variant="outlined"
                            size="small"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleChange('telefono')}
                            error={!!errors.telefono}
                            helperText={errors.telefono}
                            sx={textFieldStyles}
                        />
                    </>
                );
            
            default:
                return null;
        }
    };

    const getLeftContent = () => {
        switch (activeStep) {
            case 0:
                return {
                    title: '¡Únete a la batalla, Guerrero!',
                    description: 'Estás a unos pocos pasos de iniciar tu gran viaje. Registra tus datos básicos para forjar tu perfil en nuestra orden.'
                };
            case 1:
                return {
                    title: 'Prepara tus Estadísticas',
                    description: 'Para ayudarte a mantenerte en la Zona Segura y calcular tu evolución física, necesitamos conocer tu estado de batalla actual.'
                };
            case 2:
                return {
                    title: 'Convoca a tus Guardianes',
                    description: 'Ningún guerrero lucha solo. Añade a tus contactos de confianza para que te acompañen y te cuiden en cada misión.'
                };
            default:
                return {
                    title: '¡Únete a la batalla, Guerrero!',
                    description: 'Completa todos los pasos para unirte a nuestra orden.'
                };
        }
    };

    const leftContent = getLeftContent();

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
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%',
                maxWidth: '1000px',
                mb: 4
            }}>
                <StepComponent activeStep={activeStep} />
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 4, 
                justifyContent: 'center', 
                alignItems: 'stretch',
                maxWidth: '1000px',
                width: '100%'
            }}>
                {/* Columna izquierda - Mensajes dinámicos */}
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
                    minHeight: '550px',
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {leftContent.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary, maxWidth: '350px', mb: 4 }}>
                        {leftContent.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 'auto' }}>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'none' }}>
                            Iniciar sesión
                        </Link>
                    </Typography>
                </Box>

                {/* Columna derecha - Formulario dinámico */}
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
                    minHeight: '550px',
                }}>
                    <Box sx={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                        {getStepContent()}
                        
                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{
                                    py: 1,
                                    borderColor: 'white',
                                    color: 'white',
                                    '&:hover': { borderColor: '#f5f5f5', bgcolor: 'rgba(255,255,255,0.1)' },
                                    '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.3)' }
                                }}
                            >
                                Atrás
                            </Button>
                            
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={activeStep === 2 ? handleSubmit : handleNext}
                                sx={{
                                    py: 1,
                                    bgcolor: 'white',
                                    color: theme.palette.primary.main,
                                    '&:hover': { bgcolor: '#f5f5f5' }
                                }}
                            >
                                {activeStep === 2 ? 'Finalizar Registro' : 'Siguiente Paso'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Footer */}
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