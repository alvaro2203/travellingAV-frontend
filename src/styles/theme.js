import { extendTheme  } from "@chakra-ui/react";

const colors = {
    brand: {
        50: '#C098E3',
        100: '#B886E4',
        200: '#B073E6',
        300: '#A764E3',
        400: '#9E54E1',
        500: '#822CCF',
        600: '#731EBF',
        700: '#6310AD',
        800: '#56099B',
        900: '#400179',
      },
      gray: {
        10: '#F8FAFB',
        50: '#F2F6F8',
        100: '#EBEFF4',
        200: '#D8DFEA',
        300: '#ABB3C2',
        400: '#5E646E',
        500: '#595F69',
        600: '#2A2D34',
        700: '#1E222C',
        800: '#151925',
        900: '#0D101E',
      },
      blue: {
        50: '#E1F6FF',
        100: '#B4E7FF',
        200: '#81D8FF',
        300: '#4BC8FF',
        400: '#1CBBFF',
        500: '#00AFFF',
        600: '#00A0F5',
        700: '#008DE0',
        800: '#007CCC',
        900: '#015BAA',
      },
      red: {
        500: '#CB1410',
      },
      orange: {
        500: '#F1950E',
        600: '#F07001',
        700: '#DD6B20',
      },
      linkedin: {
        500: '#0e76a8',
      },
}

export const theme = extendTheme({colors});