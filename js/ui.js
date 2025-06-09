export function renderPosts(posts) {
    const container = document.getElementById('post-list');
    container.innerHTML = '';
    container.setAttribute('role', 'list'); // ✅ ADD THIS LINE

    if (!posts || posts.length === 0) {
        container.innerHTML = '<p>No posts available.</p>';
        return;
    }

    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card slide-in-left';
        article.setAttribute('role', 'listitem');

        article.innerHTML = `
            <div class="post-icon"><i class="fas fa-book"></i></div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.body}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <p><em>${post.created_at}</em></p>
        `;

        container.appendChild(article);
    });
}
