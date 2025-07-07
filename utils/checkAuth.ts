export const checkAuth = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    const data = await response.json();
    if (!data?.success) {
      return false; // Not authenticated
    }
    return data; // Authenticated
  } catch (error) {
    console.error('Auth check failed:', error);
    return false; // Error during auth check
  }
}