 export function appDelay(milliseconds:any) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
 
 export function getDate(date: string) {
    let d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}
