import React, {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {AppBar, Avatar, Box, Button, Container, Dialog, DialogTitle, Divider, IconButton, Toolbar} from "@mui/material";
import Link from "next/link";
import {Link as MuiLink} from "@mui/material";
import {MenuIcon} from "@/icons/menu-icon";
import {AuthDialog} from "@/components/auth-dialog";
import {AddMatchDialog} from "@/components/add-match";

type MainNavbarProps = {
    onOpenSidebar: () => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = (props) => {
    const {onOpenSidebar} = props;
    const user = useAuth();
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState<boolean>(false);
    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                borderBottomColor: "divider",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                color: "text.secondary",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{minHeight: 64}}>
                    <MuiLink component={Link} href="/" color="textSecondary" underline="none"
                             variant="subtitle2">
                        Portal Piłkarzykowy
                    </MuiLink>

                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        color="inherit"
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                md: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small"/>
                    </IconButton>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: {
                                md: "flex",
                                xs: "none",
                            },
                        }}
                    >
                        <MuiLink component={Link} href="/" color="textSecondary" underline="none"
                                 variant="subtitle2" sx={{mx: 2}}>
                            Ranking par
                        </MuiLink>
                        <MuiLink component={Link} href="/users" color="textSecondary" underline="none"
                                 variant="subtitle2" sx={{mx: 2}}>
                            Ranking graczy
                        </MuiLink>
                        <MuiLink component={Link} href="/matches" color="textSecondary" underline="none"
                                 variant="subtitle2" sx={{mx: 2}}>
                            Historia meczy
                        </MuiLink>
                        {user.isAuthenticated && <Button variant={"contained"} onClick={() => setIsMatchDialogOpen(true)}>Dodaj mecz</Button>}
                        {user.isAuthenticated ? (
                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    height: 32,
                                    marginLeft: 2,
                                    width: 32,
                                }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                        ) : (
                            <Button
                                size="medium"
                                sx={{ml: 2}}
                                variant="contained"
                                onClick={() => setIsAuthDialogOpen(true)}
                            >
                                Logowanie
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <AuthDialog open={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)}/>
            <AddMatchDialog open={isMatchDialogOpen} onClose={() => setIsMatchDialogOpen(false)} />
        </AppBar>
    )
}
