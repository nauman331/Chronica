import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { lightTheme } from '../utils/colors';
import { RootState } from "../store/store"

export const useAppTheme = () => {
    const themeOption = useSelector((state: RootState) => state.theme.themeOption);
    useColorScheme();

    // Dark mode is temporarily disabled while we ship light mode first.
    // Future re-enable logic:
    // const systemColorScheme = useColorScheme();
    // const isDark =
    //     themeOption === 'dark' ||
    //     (themeOption === 'system' && systemColorScheme === 'dark');
    const isDark = false;

    const colors = lightTheme;

    return {
        isDark,
        colors,
        themeOption
    };
};