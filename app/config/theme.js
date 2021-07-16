import { useSelector } from "react-redux";
import { useDarkMode } from "react-native-dark-mode";

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  placeholderColor: "#C9C9C9",
  grayColor: "#9B9B9B",
  dividerColor: "#BDBDBD",
  whiteColor: "#FFFFFF",
  fieldColor: "#F5F5F5",
  yellowColor: "#FDC60A",
  navyBlue: "#3C5A99",
  kashmir: "#5D6D7E",
  orangeColor: "#E5634D",
  blueColor: "#5DADE2",
  pinkColor: "#A569BD",
  greenColor: "#549F8C",
  blue2: "#0191CB",
  blueSky: "#CAFBFC",
  green1: "#2FB573",
  red1: "#DC5F3B",
  red2: "#C62105",
};

/**
 * Define Const list theme use for whole application
 */
export const ThemeSupport = [
  {
    theme: "orange",
    light: {
      dark: false,
      colors: {
        primary: "#E5634D",
        primaryDark: "#C31C0D",
        primaryLight: "#FF8A65",
        accent: "#4A90A4",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#c7c7cc",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#E5634D",
        primaryDark: "#C31C0D",
        primaryLight: "#FF8A65",
        accent: "#4A90A4",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
      },
    },
  },
  {
    theme: "pink",
    light: {
      dark: false,
      colors: {
        primary: "#FF2D55",
        primaryDark: "#F90030",
        primaryLight: "#FF5E80",
        accent: "#4A90A4",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#c7c7cc",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#FF2D55",
        primaryDark: "#F90030",
        primaryLight: "#FF5E80",
        accent: "#4A90A4",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
      },
    },
  },
  {
    theme: "blue",
    light: {
      dark: false,
      colors: {
        primary: "#5DADE2",
        primaryDark: "#1281ac",
        primaryLight: "#68c9ef",
        accent: "#FF8A65",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#c7c7cc",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#5DADE2",
        primaryDark: "#1281ac",
        primaryLight: "#68c9ef",
        accent: "#FF8A65",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
      },
    },
  },
  {
    theme: "green",
    light: {
      dark: false,
      colors: {
        primary: "#58D68D",
        primaryDark: "#388E3C",
        primaryLight: "#C8E6C9",
        accent: "#607D8B",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#c7c7cc",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#58D68D",
        primaryDark: "#388E3C",
        primaryLight: "#C8E6C9",
        accent: "#607D8B",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
      },
    },
  },
  {
    theme: "yellow",
    light: {
      dark: false,
      colors: {
        primary: "#FDC60A",
        primaryDark: "#FFA000",
        primaryLight: "#FFECB3",
        accent: "#795548",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#c7c7cc",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#FDC60A",
        primaryDark: "#FFA000",
        primaryLight: "#FFECB3",
        accent: "#795548",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
      },
    },
  },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  theme: "green",
  light: {
    dark: false,
    colors: {
      accent: "#607D8B",
      background: "white",
      backgroundContain: "rgb(246,245,245)",
      blue2: "#0191CB",
      blueSky: "#CAFBFC",
      border: "#c7c7cc",
      // buttonBackground: "#229b6c",
      primaryButtonColor: "#FF551E",
      secondButtonColor: "#FFAF00",
      lightBlue: "#82A5E6",
      primaryBlueColor: "#2369D7",
      secondBlueColor: "#0041B9",
      orangeColor: "#FF551E",
      primaryYellow: "#FFAF00",
      card: "#fff",
      colorPlaceholder: "#229B6C",
      error: "red",
      fecha: "#595757",
      placeholderHomeColor: "#4C3F40",
      primary: "#2FB573",
      primaryDark: "#388E3C",
      primaryLight: "#C8E6C9",
      separator: "#EEECEC",
      text: "#212121",
      textInputHomeColor: "#fff",
      ventasColorUpBox: "#FAFAFA",
      ventasColorDownBox: "#fff",
    },
  },
  dark: {
    dark: true,
    colors: {
      accent: "#607D8B",
      background: "#1F2026",
      backgroundContain: "#1F2026",
      border: "#272729",
      buttonBackground: "#229b6c",
      card: "#16171D",
      colorPlaceholder: "#635B5B",
      fecha: "#8C8C8C",
      primary: "#58D68D",
      placeholderHomeColor: "#635B5B",
      primaryDark: "#388E3C",
      primaryLight: "#C8E6C9",
      separator: "#29292E",
      // background: "#010101",
      // card: "#121212",
      text: "#e5e5e7",
      textInputHomeColor: "#16171D",
      ventasColorUpBox: "#242731",
      ventasColorDownBox: "#2F323C",
    },
  },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = [
  "ProximaNova",
  "Raleway",
  "Roboto",
  "Merriweather",
  "Sora",
];

/**
 * Define font default use for whole application
 */
export const DefaultFont = "Sora";

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const isDarkMode = useDarkMode();
  const forceDark = useSelector((state) => state.application.force_dark);
  const themeStorage = useSelector((state) => state.application.theme);
  const listTheme = ThemeSupport.filter((item) => item.theme == themeStorage);
  const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

  if (forceDark) {
    return { theme: theme.dark, colors: theme.dark.colors };
  }
  if (forceDark == false) {
    return { theme: theme.light, colors: theme.light.colors };
  }
  return isDarkMode
    ? { theme: theme.dark, colors: theme.dark.colors }
    : { theme: theme.light, colors: theme.light.colors };
};

/**
 * export font for application
 * @returns font
 */
export const useFont = () => {
  const font = useSelector((state) => state.application.font);
  return font ?? DefaultFont;
};
