export function HashCode(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    if(hash<0) hash = Math.abs(hash)
    return hash.toString();
}