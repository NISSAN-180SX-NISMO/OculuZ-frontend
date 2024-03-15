function formatTimeSince(date) {
    const now = new Date();
    const diff = now - date; // Разница в миллисекундах

    // Определения временных интервалов в миллисекундах
    const minute = 60 * 1000; // 60 секунд
    const hour = 60 * minute; // 60 минут
    const day = 24 * hour; // 24 часа
    const week = 7 * day; // 7 дней
    const month = 30 * day; // Приблизительно 30 дней в месяце
    const year = 365 * day; // Приблизительно 365 дней в году

    // Функция для получения значения и единицы измерения
    function getValueAndUnit(value, unit) {
        return `${value} ${unit}${value > 1 ? 's' : ''}`;
    }

    // Вычисляем, какие единицы наиболее подходят для отображения
    if (diff < hour) {
        return getValueAndUnit(Math.floor(diff / minute), 'minute') + ' ago';
    } else if (diff < day) {
        return getValueAndUnit(Math.floor(diff / hour), 'hour') + ' ago';
    } else if (diff < month) {
        return getValueAndUnit(Math.floor(diff / day), 'day') + ' ago';
    } else if (diff < year) {
        const months = Math.floor(diff / month);
        const days = Math.floor((diff % month) / day);
        return getValueAndUnit(months, 'month') + (days > 0 ? ' ' + getValueAndUnit(days, 'day') : '') + ' ago';
    } else {
        const years = Math.floor(diff / year);
        const months = Math.floor((diff % year) / month);
        return getValueAndUnit(years, 'year') + (months > 0 ? ' ' + getValueAndUnit(months, 'month') : '') + ' ago';
    }
}

export default formatTimeSince;