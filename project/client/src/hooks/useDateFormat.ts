type DateFormat = 'short' | 'medium' | 'long';

// Ajustement pour accepter une chaîne de date et la convertir en Date
const formatDateString = (dateString: string, format: DateFormat): string => {
    const date = new Date(dateString);
    switch (format) {
        case 'short':
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        case 'medium':
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        case 'long':
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        default:
            throw new Error(`Invalid date format: ${format}`);
    }
};
export default formatDateString;
