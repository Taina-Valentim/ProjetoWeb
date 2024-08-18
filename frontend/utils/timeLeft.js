export function timeLeft(dataEntrega) {
    const now = new Date();
    const entrega = new Date(dataEntrega);
    const diff = entrega - now;
  
    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  
    return `${dias} dias, ${meses} meses e ${anos} anos restantes`;
}
  