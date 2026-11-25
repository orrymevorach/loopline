import { SHOP_ORDER_URL } from '@/utils/constants';

// Builds the Toast Online Ordering product page URL, e.g.
// "GLS Stratus White 2023" → .../item-gls-stratus-white-2023_<guid>.
export function getShopProductUrl(product) {
  const slug = product.name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${SHOP_ORDER_URL}/item-${slug}_${product.guid}`;
}

const priceFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 2,
});

function getProductDetails(product, price) {
  const details = {};
  const vintage = product.name?.match(/\b((?:19|20)\d{2}|NV)$/i)?.[1];
  const tags = (product.itemTags || [])
    .map(tag => tag.name)
    .filter(Boolean);

  if (product.salesCategory?.name) {
    details.Category = product.salesCategory.name;
  }
  if (vintage) details.Vintage = vintage;
  if (price) details.Price = price;
  if (tags.length) details.Tags = tags.join(', ');
  if (product.description) details.Description = product.description;

  return details;
}

export function formatStaffPicks(staffMembers, products) {
  const productsByGuid = new Map(products.map(product => [product.guid, product]));

  return staffMembers.flatMap(member => {
    if (!member.staffPick) return [];

    const product = productsByGuid.get(member.staffPick);

    if (!product) {
      console.warn(
        `Toast product "${member.staffPick}" for staff member "${member.id}" was not found.`,
      );
      return [];
    }

    const price =
      typeof product.price === 'number'
        ? priceFormatter.format(product.price)
        : null;

    return [
      {
        id: member.id,
        name: product.name,
        price,
        pickedBy: `${member.name}'s Pick`,
        staffHref: `/about#${member.anchor}`,
        shopHref: getShopProductUrl(product),
        image: product.image || null,
        details: getProductDetails(product, price),
      },
    ];
  });
}
