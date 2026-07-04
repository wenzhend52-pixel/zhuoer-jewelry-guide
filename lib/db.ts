import { jewelries } from "@/lib/jewelries";

export async function listJewelries() {
  return jewelries;
}

export async function findJewelry(slug: string) {
  return jewelries.find((jewelry) => jewelry.slug === slug || jewelry.id === slug);
}
