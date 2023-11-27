export const convertNumberToPrice = (num: number) => {
    // Ensure that the numiber is actually a number before using .toFixed
    return `$${(+num).toFixed(2)}`;
}