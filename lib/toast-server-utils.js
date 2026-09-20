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
