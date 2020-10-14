export const timestampToDate = timestamp => {
    const date = new Date ( timestamp * 1000 );
    const localeDate = date.toLocaleString ( 'he-IL' ).split ( ',' );
    return localeDate.length > 1 ? localeDate[0] : 'error';
}