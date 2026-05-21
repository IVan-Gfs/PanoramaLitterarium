/**
 * phoneMask.ts
 * Máscara de telefone brasileiro.
 *
 * Formatos suportados:
 *   (99) 9999-9999   — fixo (8 dígitos)
 *   (99) 99999-9999  — celular (9 dígitos)
 *
 * Uso:
 *   import { applyPhoneMask, stripPhoneMask } from '@/utils/phoneMask';
 *
 *   // Em um handler de input:
 *   onChange={(e) => {
 *     const masked = applyPhoneMask(e.target.value);
 *     setValue('telefone', masked);
 *   }}
 *
 *   // Antes de enviar ao backend (só dígitos):
 *   const raw = stripPhoneMask(formValues.telefone); // "11999998888"
 */

/**
 * Remove tudo que não for dígito.
 */
export function stripPhoneMask(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Aplica a máscara de telefone brasileiro ao valor digitado.
 * Aceita tanto fixo (8 dígitos) quanto celular (9 dígitos).
 */
export function applyPhoneMask(value: string): string {
  // Mantém só dígitos e limita a 11 caracteres (DDD + 9 dígitos)
  const digits = stripPhoneMask(value).slice(0, 11);

  if (digits.length === 0) return '';

  // (99
  if (digits.length <= 2) {
    return `(${digits}`;
  }

  // (99) 9...
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  // Celular: (99) 99999-9999 — 9º dígito existe
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  // Fixo: (99) 9999-9999
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
}

/**
 * Handler pronto para usar diretamente no onChange do input.
 * Retorna o valor mascarado para você setar no estado.
 *
 * Exemplo:
 *   <input
 *     value={tel}
 *     onChange={(e) => setTel(handlePhoneChange(e))}
 *   />
 */
export function handlePhoneChange(
  e: React.ChangeEvent<HTMLInputElement>
): string {
  return applyPhoneMask(e.target.value);
}