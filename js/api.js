export async function getPosts() {
    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) throw new Error('Failed to load posts');
        return await response.json();
    } catch (err) {
        console.error('Error fetching posts:', err);
        return [];
    }
}
