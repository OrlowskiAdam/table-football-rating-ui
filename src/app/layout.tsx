"use client";
import {Provider} from "react-redux";
import {store} from "@/store";
import React from "react";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {createMuiTheme} from "@/theme";
import {Toaster} from "react-hot-toast";
import {Router} from "next/router";
import nProgress from "nprogress";
import {MainLayout} from "@/components/main-layout";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {

    return (
        <>
            <html lang="pl">
            </html>
            <body>
            <Provider store={store}>
                <ThemeProvider theme={createMuiTheme({
                    direction: "ltr",
                    responsiveFontSizes: true,
                })}>
                    <Toaster position="top-center" reverseOrder={false}/>
                    <CssBaseline/>
                    <MainLayout>
                        <Container maxWidth="lg">{children}</Container>
                    </MainLayout>
                </ThemeProvider>
            </Provider>
            </body>
        </>
    )
}