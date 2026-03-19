const API_URL = "http://localhost:3000/api/comments";

export const commentService = {
  async delete(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
  },

  async update(id, text, user) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ commentText: text, userId: user.id })
    });
    return response.ok;
  }
};
