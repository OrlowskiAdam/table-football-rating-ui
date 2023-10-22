import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, Tab, Tabs, TextField} from "@mui/material";
import {login, me, register} from "@/api/user-api";
import toast from "react-hot-toast";
import {authenticate} from "@/slices/user";
import {useDispatch} from "react-redux";

type AuthDialogProps = {
    open: boolean;
    onClose: () => void;
}

export type FormLogin = {
    username: string | null;
    password: string | null;
}

export type FormRegister = {
    username: string | null;
    password: string | null;
    name: string | null;
    nickname: string | null;
}

const formValue = {
    login: `login`,
    register: `register`,
}

export const AuthDialog: React.FC<AuthDialogProps> = (props) => {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState<string>(formValue.login);
    const [formLogin, setFormLogin] = React.useState<FormLogin>({
        username: null,
        password: null,
    });
    const [formRegister, setFormRegister] = React.useState<FormRegister>({
        username: null,
        password: null,
        name: null,
        nickname: null,
    });

    const handleFormLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormLogin({
            ...formLogin,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormRegisterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormRegister({
            ...formRegister,
            [event.target.name]: event.target.value,
        });
    }

    const handleLoginButton = (): void => {
        login(formLogin)
            .then((response) => {
                performAuthentication(response.data);
                props.onClose();
            })
            .catch((error) => toast.error(error?.response?.data?.message));
    }

    const handleRegisterButton = (): void => {
        register(formRegister)
            .then((response) => {
                performAuthentication(response.data);
            })
            .catch((error) => toast.error(error?.response?.data?.message));
    }

    const performAuthentication = (token: string) => {
        localStorage.setItem("accessToken", token);
        me()
            .then((response) => {
                // TODO: Wykipieje zaraz
                // @ts-ignore
                dispatch(authenticate(response.data));
                toast.success(`Zalogowano pomyślnie`);
            })
            .catch((error) => toast.error(error?.response?.data?.message));
    }

    return (
        <Dialog fullWidth maxWidth="sm" open={props.open} onClose={() => props.onClose()}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 2}}>
                <Tabs value={form} onChange={(e, v) => setForm(v)} aria-label="basic tabs example">
                    <Tab sx={{fontSize: "1.1rem"}} value={formValue.login} label={`Logowanie`}/>
                    <Tab sx={{fontSize: "1.1rem"}} value={formValue.register} label={`Rejestracja`}/>
                </Tabs>
            </Box>
            <DialogContent dividers>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {form === formValue.login ? (
                        <>
                            <TextField sx={{my: 1}}
                                       name="username"
                                       label="Login"
                                       variant="outlined"
                                       value={formLogin.username}
                                       onChange={handleFormLoginChange}/>
                            <TextField sx={{my: 1}}
                                       name="password"
                                       label="Hasło"
                                       variant="outlined"
                                       value={formLogin.password}
                                       onChange={handleFormLoginChange}/>
                        </>
                    ) : (
                        <>
                            <TextField sx={{my: 1}}
                                       name="username"
                                       label="Login"
                                       variant="outlined"
                                       value={formRegister.username}
                                       onChange={handleFormRegisterChange}/>
                            <TextField sx={{my: 1}}
                                       name="password"
                                       label="Hasło"
                                       variant="outlined"
                                       value={formRegister.password}
                                       onChange={handleFormRegisterChange}/>
                            <TextField sx={{my: 1}}
                                       name="name"
                                       label="Imię"
                                       variant="outlined"
                                       value={formRegister.name}
                                       onChange={handleFormRegisterChange}/>
                            <TextField sx={{my: 1}}
                                       name="nickname"
                                       label="Pseudonim"
                                       variant="outlined"
                                       value={formRegister.nickname}
                                       onChange={handleFormRegisterChange}/>
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                {form === formValue.login ? (
                    <Button sx={{m: 1, mr: 2}} variant={"contained"} onClick={handleLoginButton}>Zaloguj</Button>
                ) : (
                    <Button sx={{m: 1, mr: 2}} variant={"contained"}
                            onClick={handleRegisterButton}>Zarejestruj</Button>
                )}
            </DialogActions>
        </Dialog>
    )
}
