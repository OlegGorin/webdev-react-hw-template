export const FormatTime = (seconds: number): string => {
    const roundedSeconds = Math.floor(seconds);
    const minutesString = Math.floor(roundedSeconds / 60).toString();
    const secondsString = (roundedSeconds % 60).toString().padStart(2, "0");

    return `${minutesString}:${secondsString}`;
}