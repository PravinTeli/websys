import { getPosts } from './api.js';
import { renderPosts } from './ui.js';
import { attachFormValidation, attachPostFormValidation } from './validation.js';

document.addEventListener('DOMContentLoaded', async () => {
  const postList = document.getElementById('post-list');

  if (postList) {
    const posts = await getPosts();
    renderPosts(posts);
  }

  attachFormValidation(); // for contact page
  attachPostFormValidation(); // for create-post page
});
