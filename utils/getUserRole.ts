export const getUserRole = async (userId: number | string): Promise<void | string> => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET"
    });
    const data = await response.json();

    return data.role_id.name;
  } catch (e) {
    console.log(e)
  }
}
