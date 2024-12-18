import { locales } from "@/language/constant";
import { format, formatDistanceToNow } from "date-fns";

// type = 1: comment, type = 2: post
const formatTimeDifference = (createdAt: any, type: number) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    if (distance.includes('less than a minute')) { return 'now'; }

    const match = distance.match(/(\d+)\s(\w+)/);
    if (match) {
        const [, number, unit] = match;

        // Convert units to shorthand format
        switch (unit) {
            case 'second':
            case 'seconds':
                if (type === 1) {
                    return `${number}s`;
                }
                return `${number} seconds ago`;
            case 'minute':
            case 'minutes':
                if (type === 1) {
                    return `${number}m`;
                }
                return `${number} minutes ago`;
            case 'hour':
            case 'hours':
                if (type === 1) {
                    return `${number}h`;
                }
                return `${number} hours ago`;
            case 'day':
            case 'days':
                if (type === 1) {
                    return `${number}d`;
                }
                return `${number} days ago`;
            case 'month':
            case 'months':
                if (type === 1) {
                    return `${number}m`;
                }
                return `${number} months ago`;
            case 'year':
            case 'years':
                if (type === 1) {
                    return `${number}y`;
                }
                return `${number} years ago`;
            default:
                return distance; // fallback to the default format if no match
        }
    }

    return distance; // fallback to the default format if no match
};

const getShortTimeFormat = (createdAt: any, lang: keyof typeof locales) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    if (distance.includes('less than a minute')) { return `${locales[lang]?.time?.now}`; }
    const match = distance.match(/(\d+)\s(\w+)/);

    if (match) {
        const [, number, unit] = match;

        // Return shorthand for different units
        switch (unit) {
            case 'second':
            case 'seconds':
                return `${number}${locales[lang]?.time?.s}`; // Example: "5s"
            case 'minute':
            case 'minutes':
                return `${number}${locales[lang]?.time?.m}`; // Example: "5m"
            case 'hour':
            case 'hours':
                return `${number}${locales[lang]?.time?.h}`; // Example: "2h"
            case 'day':
            case 'days':
                return `${number}${locales[lang]?.time?.d}`; // Example: "3d"
            case 'month':
            case 'months':
                return `${number}${locales[lang]?.time?.mo}`; // Example: "1mo"
            case 'year':
            case 'years':
                return `${number}${locales[lang]?.time?.y}`; // Example: "2y"
            default:
                return distance; // fallback to the default format if no match
        }
    }

    return distance; // fallback to the default format if no match
};

const formatFullDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM dd, yyyy HH:mm');
};
const formatTimeMessage = (time: string) => {
    const date = new Date(time);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${('0' + date.getDate()).slice(-2)}-${months[date.getMonth()]}-${date.getFullYear()}`;
    const formattedTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    return (`${formattedDate}, ${formattedTime}`);
}

function removeTimeFromISOString(dateString: string): string { return dateString.split('T')[0]; }

export { formatTimeDifference, formatFullDate, formatTimeMessage, removeTimeFromISOString, getShortTimeFormat };
