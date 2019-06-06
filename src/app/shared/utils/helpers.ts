export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {
    return `${countryCode}${phoneNumber.replace(/\W/g, '')}`;
}