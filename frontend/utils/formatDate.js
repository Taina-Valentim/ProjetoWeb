export function formatDate(date) {
    if (!date) return null;
    const d = new Date(date);
    // Ajuste para evitar a subtração de um dia devido ao fuso horário
    const utcDay = String(d.getUTCDate()).padStart(2, '0');
    const utcMonth = String(d.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const utcYear = d.getUTCFullYear();
    return `${utcDay}/${utcMonth}/${utcYear}`;
}