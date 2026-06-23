import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Polyline, Line, Defs, G, ClipPath, Pattern } from 'react-native-svg';
import { lightBlue, lightGreen, yellow } from './colors';

export const MapIcon = ({ color, size = 24 }: { color: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Polyline points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
        <Line x1="9" y1="3" x2="9" y2="18" />
        <Line x1="15" y1="6" x2="15" y2="21" />
    </Svg>
);

export const CalendarIcon = ({ color, size = 24 }: { color: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <Line x1="16" y1="2" x2="16" y2="6" />
        <Line x1="8" y1="2" x2="8" y2="6" />
        <Line x1="3" y1="10" x2="21" y2="10" />
    </Svg>
);

export const WeeklyCircleIcon = ({ color = '#8E8E93', size = 16 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="8.5" />
        <Circle cx="12" cy="12" r="4.25" />
    </Svg>
);

export const ChartIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M4 18.5V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Path d="M4 18.5H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Path d="M7 14l3.2-3.2 3 2.4L19 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17.8 8H19v1.2" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const UserIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
    </Svg>
);

export const BadgeIcon = ({ color = "#FFFFFF", size = 54 }: { color?: string, size?: number }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <Path d="M3 16 L7 6 L12 11.5 L16 3 L21 11 Z" />
        <Path d="M4 20 H20" />
    </Svg>
);

export const MiniCrown = ({ color = yellow, size = 12 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 16 L7 6 L12 11.5 L16 3 L21 11 Z" />
        <Path d="M4 20 H20" />
    </Svg>
);

export const BellIcon = ({ color = lightBlue }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Svg>
);

export const SparkIcon = ({ color = '#8E8E93', size = 16 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </Svg>
);

export const ReflectionIcon = ({ color = lightBlue }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
        <Circle cx="12" cy="12" r="8" />
    </Svg>
);

export const ArrowUpIcon = ({ color = lightGreen }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Line x1="12" y1="19" x2="12" y2="5" />
        <Polyline points="5 12 12 5 19 12" />
    </Svg>
);

export const ArrowLeftIcon = ({ color }: { color: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const ChevronLeftIcon = ({ color }: { color: string }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const ChevronRightIcon = ({ color }: { color: string }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const SolidSparkleIcon = ({ color, size = 24 }: { color: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2C12 7.5228 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.5228 12 2 12C7.5228 12 12 7.5228 12 2Z" fill={color} />
    </Svg>
);

export const ShareIcon = ({ color = '#C9A227', size = 18 }: { color?: string, size?: number }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Circle cx="18" cy="5" r="3" fill={color} />
            <Circle cx="6" cy="12" r="3" fill={color} />
            <Circle cx="18" cy="19" r="3" fill={color} />
            <Path d="M8.59 13.51l6.83 3.98" stroke={color} />
            <Path d="M15.41 6.51l-6.82 3.98" stroke={color} />
        </Svg>
    );
};

export const GreenCheckIcon = ({ size = 24 }: { size?: number }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <Circle cx="12" cy="12" r="10" />
        <Path d="M9 12l2 2 4-4" />
    </Svg>
);

export const BookHeartIcon = ({ size = 32, color = '#FFFFFF' }: { size?: number, color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Path
            d="M21.3334 10.9333C21.3265 10.1575 21.0152 9.41545 20.4666 8.86684C19.918 8.31824 19.1759 8.00696 18.4001 8C17.3334 8 16.5334 8.4 16.0001 9.2C15.4667 8.4 14.6667 8 13.6001 8C12.8243 8.00696 12.0822 8.31824 11.5336 8.86684C10.985 9.41545 10.6737 10.1575 10.6667 10.9333C10.6667 11.7333 11.0667 12.5333 11.6001 13.0667C13.0523 14.5037 14.519 15.926 16.0001 17.3333C17.4745 15.9638 18.9411 14.586 20.4001 13.2C20.9981 12.5972 21.3336 11.7824 21.3334 10.9333Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5.3335 26.0003V6.00033C5.3335 5.11627 5.68469 4.26842 6.30981 3.6433C6.93493 3.01818 7.78277 2.66699 8.66683 2.66699H25.3335C25.6871 2.66699 26.0263 2.80747 26.2763 3.05752C26.5264 3.30756 26.6668 3.6467 26.6668 4.00033V28.0003C26.6668 28.3539 26.5264 28.6931 26.2763 28.9431C26.0263 29.1932 25.6871 29.3337 25.3335 29.3337H8.66683C7.78277 29.3337 6.93493 28.9825 6.30981 28.3573C5.68469 27.7322 5.3335 26.8844 5.3335 26.0003ZM5.3335 26.0003C5.3335 25.1163 5.68469 24.2684 6.30981 23.6433C6.93493 23.0182 7.78277 22.667 8.66683 22.667H26.6668"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const HourglassIcon = ({ color = "#10B981", size = 20 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="10.5 10.5 15 15" fill="none">
        <Path
            d="M13.6108 24.2386H22.3563"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M13.6108 11.7464H22.3563"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M21.1069 24.2392V21.6331C21.1068 21.3018 20.9751 20.9841 20.7408 20.7498L17.9835 17.9925L15.2262 20.7498C14.9919 20.9841 14.8602 21.3018 14.8601 21.6331V24.2392"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M14.8599 11.7464V14.3525C14.8599 14.6839 14.9916 15.0016 15.2259 15.2358L17.9832 17.9931L20.7406 15.2358C20.9749 15.0016 21.1065 14.6839 21.1066 14.3525V11.7464"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const SubscriptionIcon = ({ color = "#8E8E93" }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <Line x1="2" y1="10" x2="22" y2="10" />
    </Svg>
);

export const WidgetsIcon = ({ color = "#8E8E93", size = 20 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="7" height="7" rx="1" />
        <Rect x="14" y="3" width="7" height="7" rx="1" />
        <Rect x="14" y="14" width="7" height="7" rx="1" />
        <Rect x="3" y="14" width="7" height="7" rx="1" />
    </Svg>
);

export const SettingsIcon = ({ color = "#8E8E93" }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="3" />
        <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Svg>
);

export const SignOutIcon = ({ color = "#E53935" }: { color?: string }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <Polyline points="16 17 21 12 16 7" />
        <Line x1="21" y1="12" x2="9" y2="12" />
    </Svg>
);

export const SparkleSmallIcon = ({ color = "#FFFFFF", size = 12 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </Svg>
);

export const CopyIcon = ({ color = '#8E8E93', size = 20 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.2" />
        <Rect x="3.5" y="3.5" width="11.5" height="11.5" rx="2.2" />
    </Svg>
);

export const DownloadIcon = ({ color = '#8E8E93', size = 20 }: { color?: string, size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 4v10" />
        <Path d="M8.5 10.5L12 14l3.5-3.5" />
        <Path d="M6 18h12" />
        <Path d="M6 18v-1.8" />
        <Path d="M18 18v-1.8" />
    </Svg>
);

// --- NEW WIDGET ICONS ---

export const ArrowRightSmallIcon = ({ color }: { color: string }) => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const DashedCircleIcon = ({ color }: { color: string }) => (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Dot in center */}
        <Circle cx="20" cy="20" r="3.5" fill={color} opacity={0.25} />
    </Svg>
);

export const ProgressRingIcon = ({ progress = 66, size = 40, strokeWidth = 3, color = yellow, trackColor = '#F0F0F0' }: { progress?: number, size?: number, strokeWidth?: number, color?: string, trackColor?: string }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
            <Circle
                cx={size / 2} cy={size / 2} r={radius}
                stroke={color} strokeWidth={strokeWidth} fill="none"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </Svg>
    );
};

export const DotPatternIcon = () => (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
            <Pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <Circle cx="2" cy="2" r="1.5" fill={yellow} opacity={0.15} />
            </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
    </Svg>
);

export const MiniCheckIcon = ({ color = yellow }: { color?: string }) => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 6L9 17l-5-5" />
    </Svg>
);