/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        colors: {
            primary: {
                50: '#e6f4ff', // très clair pour des arrières-plans subtils
                100: '#b3daff', // clair pour des hover states
                200: '#80c0ff', // par défaut pour des éléments primaires
                300: '#4da6ff', // un peu plus sombre pour du contraste
                400: '#1a8cff', // sombre pour des éléments actifs ou importants
                500: '#006bd4', // très sombre pour des accents forts
                600: '#0052a3', // encore plus sombre pour des surbrillances
                700: '#003972', // utilisé avec parcimonie
                800: '#002041', // presque noir
                900: '#000b10', // noir pour des textes ou fonds
            },
            // Couleurs secondaires
            secondary: {
                50: '#fff8e1', // Très clair, pour des arrière-plans subtils ou des surbrillances
                100: '#ffecb3', // Clair pour des éléments de fond légèrement différents
                200: '#ffe082', // Légèrement doré pour des éléments moins dominants
                300: '#ffd54f', // Doré moyen, bonne visibilité pour des boutons ou icônes
                400: '#ffca28', // Plus saturé pour attirer l'attention
                500: '#ffc107', // La couleur secondaire standard, équilibrée et attrayante
                600: '#ffb300', // Un peu plus sombre pour des éléments actifs ou importants
                700: '#ffa000', // Encore plus sombre pour des accents forts
                800: '#ff8f00', // Sombre, utilisé avec parcimonie
                900: '#ff6f00', // Très sombre, pour un fort contraste ou des éléments spéciaux
            },
            // Couleurs pour le texte
            typo: {
                primary: '#333333', // Texte principal, foncé pour une bonne lisibilité
                secondary: '#4b5563', // Texte secondaire, un peu plus clair
                disabled: '#a0aec0', // Texte désactivé ou peu important
                accent: '#d4d4d4', // Texte pour les accents ou éléments moins importants
                reverse: '#ffffff', // Texte pour fonds sombres ou pour contraste élevé
            },
            // Nuances de gris pour l'arrière-plan (wallpaper)
            wp: {
                50: '#f9f9f9', // Très clair, presque blanc, pour les fonds subtils
                100: '#f2f2f2', // Clair pour des éléments de fond légèrement différents
                200: '#e5e5e5', // Gris standard pour des arrière-plans par défaut
                300: '#cccccc', // Un peu plus sombre pour le contraste
                400: '#a3a3a3', // Sombre pour des éléments en arrière-plan actifs ou importants

                500: '#7a7a7a', // Plus sombre pour des accents forts
                600: '#626262', // Encore plus sombre, utilisé avec parcimonie
                700: '#494949', // Très sombre, pour un fort contraste ou mode sombre
                800: '#2b2b2b', // Presque noir, pour des textes ou éléments sur un fond clair
                900: '#151515', // Noir, pour des textes ou fonds en mode sombre

                white: '#ffffff', // Blanc pur
                black: '#000000', // Noir pur
            },
            // Couleurs de nuances (utilisation spécifique)
            nuance: {
                success: '#48bb78', // Vert pour succès
                error: '#f56565', // Rouge pour erreurs
                warning: '#ed8936', // Orange pour avertissements
                info: '#4299e1', // Bleu pour informations
            },
        },
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('flowbite/plugin'),
        require('tailgrids/plugin'),
    ],
}
