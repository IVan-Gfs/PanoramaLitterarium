export function formatarData(dataISO: string) {
  return new Date(dataISO).toLocaleDateString("pt-BR");
}