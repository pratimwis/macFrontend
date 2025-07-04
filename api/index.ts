// utils/api.js or wherever you handle API calls

export async function signUp({
  email,
  fullName,
  password,

}: {
  email: string;
  fullName: string;
  password: string;
}) {
  
  try {
    const response = await fetch('https://macbackend.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important if you're setting cookies like JWT
      body: JSON.stringify({
        email,
        fullName,
        password,
      }),
    });

    const data = await response.json();

    if (!data?.success) {
      window.alert(data?.message || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function logout(){

}



