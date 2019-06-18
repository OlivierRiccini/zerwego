export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {
    if (!countryCode || !phoneNumber) {
        return;
    }
    return `${countryCode}${phoneNumber.replace(/\W/g, '')}`;
}