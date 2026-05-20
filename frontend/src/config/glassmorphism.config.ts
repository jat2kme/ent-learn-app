"use client";

/**
 * Glassmorphism Configuration
 */
export const GLASS_EFFECTS = {
    enabled: true,
    classes: {
        base: 'backdrop-blur-md',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
        '2xl': 'backdrop-blur-2xl',
        '3xl': 'backdrop-blur-3xl',
    },
    styles: {
        blur: 'blur(20px)',
        blurSm: 'blur(4px)',
        blurMd: 'blur(12px)',
        blurLg: 'blur(24px)',
        blurXl: 'blur(40px)',
    }
} as const;

export const GLASSMORPHISM_CONFIG = {
    transparency: {
        full: 'transparent',
        light: 'transparent',
        medium: 'transparent',
        heavy: 'transparent',
    },
    blur: {
        none: '0',
        light: 'blur(5px)',
        medium: 'blur(15px)',
        heavy: 'blur(30px)',
    },
    borders: {
        light: {
            subtle: '1px solid rgba(0, 0, 0, 0.05)',
            normal: '1px solid rgba(0, 0, 0, 0.1)',
            strong: '1px solid rgba(0, 0, 0, 0.2)',
        },
        dark: {
            subtle: '1px solid rgba(255, 255, 255, 0.05)',
            normal: '1px solid rgba(255, 255, 255, 0.1)',
            strong: '1px solid rgba(255, 255, 255, 0.2)',
        },
    },
    saturation: 'saturate(180%)',
} as const;
