import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../utils/colors';
import { RootState } from "../store/store"

export const useAppTheme = () => {
    const themeOption = useSelector((state: RootState) => state.theme.themeOption);
    useColorScheme();
    const systemColorScheme = useColorScheme();
    const isDark =
        themeOption === 'dark' ||
        (themeOption === 'system' && systemColorScheme === 'dark');

    const colors = isDark ? darkTheme : lightTheme;

    return {
        isDark,
        colors,
        themeOption
    };
};