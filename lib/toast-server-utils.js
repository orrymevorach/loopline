// Toast requires an OAuth token before any other API call can be made.
async function getToastAccessToken() {
  const response = await fetch(
    `${process.env.TOAST_API_BASE_URL}/authentication/v1/authentication/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: process.env.TOAST_CLIENT_ID,
        clientSecret: process.env.TOAST_CLIENT_SECRET,
        userAccessType: process.env.TOAST_USER_ACCESS_TYPE,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to authenticate with Toast: ${response.status}`);
  }

  const { token } = await response.json();
  return token.accessToken;
}

export async function getMenuItems() {
  const accessToken = await getToastAccessToken();

  const response = await fetch(
    `${process.env.TOAST_API_BASE_URL}/menus/v2/menus`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Toast-Restaurant-External-ID': process.env.TOAST_RESTAURANT_GUID,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Toast menus: ${response.status}`);
  }

  return response.json();
}

function getItemsFromGroup(group) {
  const nestedItems = group.menuGroups?.flatMap(getItemsFromGroup) ?? [];
  return [...(group.menuItems ?? []), ...nestedItems];
}

// Staging renders pages per request, so reuse recent results instead of
// calling Toast (which rate-limits the menus endpoint) on every page view.
const PRODUCTS_CACHE_MS = 5 * 60 * 1000;
let productsCache = null;

async function fetchProducts() {
  const { menus } = await getMenuItems();

  return menus.flatMap(menu => menu.menuGroups.flatMap(getItemsFromGroup));
}

export async function getProducts() {
  if (productsCache && Date.now() - productsCache.fetchedAt < PRODUCTS_CACHE_MS) {
    return productsCache.products;
  }

  const products = fetchProducts();
  productsCache = { products, fetchedAt: Date.now() };
  // Drop failed requests so the next call retries instead of reusing the error.
  products.catch(() => {
    if (productsCache?.products === products) productsCache = null;
  });
  return products;
}
