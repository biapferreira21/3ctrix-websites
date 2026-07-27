/**
 * Pequeno utilitário para juntar classes condicionalmente,
 * evitando uma dependência externa.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
