export const getSerialNumber = (url: string) => {
    const urlObj = new URL(url);
    const serialNumber = urlObj.searchParams.get('serial_number');
    return serialNumber;
}
