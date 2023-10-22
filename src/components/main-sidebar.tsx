import {Box, Drawer, styled, Theme, useMediaQuery} from "@mui/material";
import React, {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const MainSidebarLink = styled(Link)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    display: "block",
    padding: theme.spacing(1.5),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

type MainSidebarProps = {
    onClose: () => void;
    open: boolean;
}

export const MainSidebar: React.FC<MainSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const lgUp: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

    const handlePathChange = () => {
        if (open) {
            onClose?.();
        }
    };

    useEffect(
        handlePathChange,
        [onClose, open]
    );

    return (
        <Drawer
            anchor="right"
            onClose={onClose}
            open={!lgUp && open}
            PaperProps={{ sx: { width: 256 } }}
            sx={{
                zIndex: (theme: Theme) => theme.zIndex.appBar + 100,
            }}
            variant="temporary"
        >
            <Box sx={{ p: 2 }}>
                <Link href="/test" passHref>
                    test
                </Link>
            </Box>
        </Drawer>
    );
    
}