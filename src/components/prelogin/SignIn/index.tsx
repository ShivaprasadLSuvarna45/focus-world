import React, { useState } from "react";
import {
    Button,
    TextField,
    Container,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";
import { language } from "../../../constant"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const SignIn = (props: any) => {
    const { handleColorChange = () => { } } = props;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isArabic, setIsArabic] = useState<boolean>(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data: any) => {
        try {
            await signInWithEmailAndPassword(auth, data?.email, data?.password);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("User login failed");
        }
    };

    const handleButton = (language: any) => {
        if (language === "ar") {
            setIsArabic(true);
        } else {
            setIsArabic(false);
        }
        i18n.changeLanguage(language);
        handleColorChange(language);
    };

    const theme = (outerTheme: any) =>
        createTheme({
            direction: "rtl",
            palette: {
                mode: outerTheme.palette.mode,
            },
        });

    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin as any],
    });

      return (
    <>
      <Grid container md={12} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              {(language).map(({key,language}:{key:string,language:string}) => (
                <Button
                  variant="outlined"
                  key={key}
                  style={{
                    fontWeight:
                      i18n.resolvedLanguage === key ? "bold" : "normal",
                  }}
                  type="submit"
                  sx={{ mb: "2%" }}
                  onClick={() => handleButton(key)}
                >
                  {language}
                </Button>
              ))}
            </Grid>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ textAlign: isArabic ? "end" : "start" }}
            >
              <Typography variant="h2" gutterBottom sx={{ mt: "2%" }}>
                <Box sx={{ fontWeight: "bold", m: 1 }}>
                  <Trans i18nKey="login">
                    {t("login")}
                  </Trans>
                </Box>
              </Typography>
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {isArabic ? (
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <div dir="rtl">
                        <TextField
                          fullWidth
                          label={t("email")}
                          {...register("email", {
                            required: t("errorEmail"),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          error={Boolean(errors.email)}
                          variant="outlined"
                        />
                      </div>
                    </ThemeProvider>
                  </CacheProvider>
                ) : (
                  <TextField
                    label={t("email")}
                    fullWidth
                    {...register("email", {
                      required: t("errorEmail"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={Boolean(errors.email)}
                  />
                )}
                {errors.email && (
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ mt: "2%", color: "red" }}
                  >
                    {errors.email.message as string}
                  </Typography>
                )}
                {isArabic ? (
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <div dir="rtl">
                        <TextField
                          label={t("password")}
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          margin="normal"
                          {...register("password", {
                            required: t("errorPassword"),
                          })}
                          error={Boolean(errors.password)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </ThemeProvider>
                  </CacheProvider>
                ) : (
                  <TextField
                    label={t("password")}
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    {...register("password", {
                      required: t("errorPassword"),
                    })}
                    error={Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {errors.password && (
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ mt: "2%", color: "red" }}
                  >
                    {errors.password.message as string}
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                <Trans i18nKey="login">
                  {t("login")}
                </Trans>
              </Button>
            </form>
          </Container>
        </Grid>
      </Grid>
    </>
  );

}

export default SignIn;