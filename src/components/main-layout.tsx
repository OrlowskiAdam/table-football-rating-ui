import React, {PropsWithChildren, useState} from "react";
import {styled} from "@mui/material";
import {MainNavbar} from "@/components/main-navbar";
import {MainSidebar} from "@/components/main-sidebar";

const MainLayoutRoot = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    height: "100%",
    paddingTop: 64,
}));

export const MainLayout: React.FC<PropsWithChildren> = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <MainLayoutRoot>
            <MainNavbar onOpenSidebar={() => setIsSidebarOpen(true)}/>
            <MainSidebar onClose={() => setIsSidebarOpen(false)} open={isSidebarOpen}/>
            {props.children}
        </MainLayoutRoot>
    )
}