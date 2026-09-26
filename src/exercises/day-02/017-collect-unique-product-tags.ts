export type Product = {
  sku: string;
  name: string;
  discontinued: boolean;
  tags: readonly string[];
};

export function collectUniqueProductTags(products: readonly Product[]): string[] {
  const data = []
  const trim = new Map()

  for (let product of products) {
    if (!product.discontinued) data.push(product)
  }

  const flatMap = data.flatMap((item) => {
    return item.tags
  })

  for (let flat of flatMap) {
    if (flat.length > 0) {
      trim.set(flat.trim(), flat.trim())
    }
  }

  const result = [... trim.values()].sort()

  return result

  throw new Error("Not implemented");
}
