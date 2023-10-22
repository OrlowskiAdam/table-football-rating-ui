import {createTheme, responsiveFontSizes} from "@mui/material";
import {baseThemeOptions} from "@/theme/base-theme-options";
import {darkThemeOptions} from "@/theme/theme-options";

type ThemeConfig = {
    direction: "ltr" | "rtl";
    responsiveFontSizes: boolean;
}

export const createMuiTheme = (config: ThemeConfig) => {
    let theme = createTheme(
        baseThemeOptions,
        darkThemeOptions,
        {
            direction: config.direction,
        }
    );

    if (config.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return theme;
};
