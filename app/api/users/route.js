// http://localhost:3010/api/users

export async function GET(request) {
  // Handle GET request for /api/users
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ];

  // Send the users as a response
  return new Response(JSON.stringify(users));
}
