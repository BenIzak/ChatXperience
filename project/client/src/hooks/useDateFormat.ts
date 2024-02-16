type DateFormat = 'short' | 'medium' | 'long';

// Ajustement pour accepter une chaîne de date et la convertir en Date
const formatDateString = (dateString: string, format: DateFormat): string => {
    const date = new Date(dateString);
    switch (format) {
        case 'short':
            return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
        case 'medium':
            return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' });
        case 'long':
            return date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
        default:
            throw new Error(`Invalid date format: ${format}`);
    }
};
export default formatDateString;
