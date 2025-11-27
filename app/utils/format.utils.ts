import dayjs from 'dayjs'

export const formatDateToYYYYMMDD = (date: Date | string) => {
    return dayjs(date).format('YYYY-MM-DD')
}