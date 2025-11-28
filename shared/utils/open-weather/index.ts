export const getIconUrl = (weatherIcon: string = '') => {
    return `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
};

export const parseTemperature = (temp: number = 0) => {
    return parseFloat((temp - 273.15).toFixed(1));
};