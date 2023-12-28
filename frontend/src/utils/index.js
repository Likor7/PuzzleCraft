export const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }

    const extIndex = str.lastIndexOf('.');
    const ext = extIndex !== -1 ? str.substring(extIndex) : '';
    const nameWithoutExt = extIndex !== -1 ? str.slice(0, extIndex) : str;

    const start = nameWithoutExt.slice(0, Math.ceil((num - ext.length) / 2));
    const end = nameWithoutExt.slice(-Math.floor((num - ext.length) / 2));

    return `${start}...${end}${ext}`;
};