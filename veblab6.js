const WEATHER_API_KEY = '1fb73c77f2a4575deca4228e58634be5';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORUM_API_URL = 'https://69c69fe6f272266f3eace2c5.mockapi.io';

let currentPostId = null;
let currentCommentsPostId = null;

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function getWeather(city) {
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Город не найден');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Ошибка погоды:', error);
        throw error;
    }
}

function displayWeather(data) {
    const weatherContent = document.getElementById('weatherContent');
    const detailedWeather = document.getElementById('detailedWeather');
    
    const weatherHtml = `
        <div class="weather-info">
            <div class="weather-main">
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                <div>${data.weather[0].description}</div>
                <div>${data.name}, ${data.sys.country}</div>
            </div>
            <div class="weather-details">
                <div>Влажность: ${data.main.humidity}%</div>
                <div>Ветер: ${Math.round(data.wind.speed)} м/с</div>
                <div>Давление: ${data.main.pressure} гПа</div>
            </div>
        </div>
    `;
    
    weatherContent.innerHTML = weatherHtml;
    
    const detailedHtml = `
        <div class="weather-info">
            <div>
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Температура: ${Math.round(data.main.temp)}°C (ощущается как ${Math.round(data.main.feels_like)}°C)</p>
                <p>Минимум: ${Math.round(data.main.temp_min)}°C / Максимум: ${Math.round(data.main.temp_max)}°C</p>
                <p>Влажность: ${data.main.humidity}%</p>
                <p>Ветер: ${Math.round(data.wind.speed)} м/с</p>
                <p>Давление: ${data.main.pressure} гПа</p>
                <p>${data.weather[0].description}</p>
            </div>
        </div>
    `;
    
    if (detailedWeather) {
        detailedWeather.innerHTML = detailedHtml;
    }
}

async function handleWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showToast('Введите название города', 'error');
        return;
    }
    
    const weatherContent = document.getElementById('weatherContent');
    weatherContent.innerHTML = '<div class="loading-spinner"></div><p>Загрузка погоды...</p>';
    
    try {
        const weatherData = await getWeather(city);
        displayWeather(weatherData);
        showToast(`Погода в ${city}`, 'success');
    } catch (error) {
        weatherContent.innerHTML = `<p style="color: #ef4444;">Ошибка: ${error.message}</p>`;
        showToast(error.message, 'error');
    }
}

async function getPosts() {
    const response = await fetch(`${FORUM_API_URL}/posts`);
    if (!response.ok) throw new Error('Ошибка загрузки постов');
    return await response.json();
}

async function createPost(title, body) {
    const response = await fetch(`${FORUM_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })
    });
    if (!response.ok) throw new Error('Ошибка создания поста');
    return await response.json();
}

async function updatePost(id, title, body) {
    const response = await fetch(`${FORUM_API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })
    });
    if (!response.ok) throw new Error('Ошибка обновления поста');
    return await response.json();
}

async function deletePost(id) {
    const response = await fetch(`${FORUM_API_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Ошибка удаления поста');
    return true;
}

async function getComments(postId) {
    try {
        const response = await fetch(`${FORUM_API_URL}/comments?postId=${postId}`);

        if (response.status === 404) {
            return [];
        }

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}`);
        }
        
        const data = await response.json();

        return Array.isArray(data) ? data : [];
        
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error);
        return [];
    }
}

async function addComment(postId, name, body) {
    const response = await fetch(`${FORUM_API_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: Number(postId),
            name: name,
            body: body
        })
    });
    if (!response.ok) throw new Error('Ошибка добавления комментария');
    return await response.json();
}

async function deleteComment(id) {
    const response = await fetch(`${FORUM_API_URL}/comments/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Ошибка удаления комментария');
    return true;
}

async function renderPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '<div class="loading-spinner"></div><p>Загрузка постов...</p>';
    
    try {
        const posts = await getPosts();
        
        if (posts.length === 0) {
            postsList.innerHTML = '<p>Нет постов.</p>';
            return;
        }
        
        postsList.innerHTML = posts.map(post => `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <h3 class="post-title">${escapeHtml(post.title)}</h3>
                    <div class="post-actions">
                        <button class="btn btn-warning btn-sm edit-post" data-id="${post.id}" data-title="${escapeHtml(post.title)}" data-body="${escapeHtml(post.body)}">Редактировать</button>
                        <button class="btn btn-danger btn-sm delete-post" data-id="${post.id}">Удалить</button>
                    </div>
                </div>
                <div class="post-body">${escapeHtml(post.body)}</div>
                <div class="post-footer">
                    <span class="comment-count" data-post-id="${post.id}">Комментарии</span>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.edit-post').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id, btn.dataset.title, btn.dataset.body));
        });
        
        document.querySelectorAll('.delete-post').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Удалить этот пост?')) {
                    try {
                        await deletePost(btn.dataset.id);
                        showToast(`Пост удалён`, 'success');
                        await renderPosts();
                    } catch (error) {
                        showToast(error.message, 'error');
                    }
                }
            });
        });
        
        document.querySelectorAll('.comment-count').forEach(btn => {
            btn.addEventListener('click', () => openCommentsModal(btn.dataset.postId));
        });
        
    } catch (error) {
        postsList.innerHTML = `<p style="color: #ef4444;">${error.message}</p>`;
        showToast(error.message, 'error');
    }
}

function openEditModal(id = null, title = '', body = '') {
    const modal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modalTitle');
    const postTitle = document.getElementById('postTitle');
    const postBody = document.getElementById('postBody');
    
    currentPostId = id;
    
    if (id) {
        modalTitle.textContent = 'Редактировать пост';
        postTitle.value = title;
        postBody.value = body;
    } else {
        modalTitle.textContent = 'Создать пост';
        postTitle.value = '';
        postBody.value = '';
    }
    
    modal.style.display = 'flex';
}

async function openCommentsModal(postId) {
    const modal = document.getElementById('commentsModal');
    const commentsList = document.getElementById('commentsList');
    
    currentCommentsPostId = postId;
    modal.style.display = 'flex';
    commentsList.innerHTML = '<div class="loading-spinner"></div><p>Загрузка комментариев...</p>';
    
    try {
        const comments = await getComments(postId);
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p>Нет комментариев.</p>';
        } else {
            commentsList.innerHTML = comments.map(comment => `
                <div class="comment-item" data-comment-id="${comment.id}">
                    <button class="comment-delete" data-id="${comment.id}">Удалить</button>
                    <div class="comment-author">${escapeHtml(comment.name)}</div>
                    <div class="comment-text">${escapeHtml(comment.body)}</div>
                </div>
            `).join('');
            
            document.querySelectorAll('.comment-delete').forEach(btn => {
                btn.addEventListener('click', async () => {
                    if (confirm('Удалить комментарий?')) {
                        try {
                            await deleteComment(btn.dataset.id);
                            showToast(`Комментарий удалён`, 'success');
                            await openCommentsModal(currentCommentsPostId);
                        } catch (error) {
                            showToast(error.message, 'error');
                        }
                    }
                });
            });
        }
    } catch (error) {
        commentsList.innerHTML = `<p style="color: #ef4444;">${error.message}</p>`;
        showToast(error.message, 'error');
    }
}

async function savePost() {
    const title = document.getElementById('postTitle').value.trim();
    const body = document.getElementById('postBody').value.trim();
    
    if (!title || !body) {
        showToast('Заполните заголовок и содержание', 'error');
        return;
    }
    
    try {
        if (currentPostId) {
            await updatePost(currentPostId, title, body);
            showToast(`Пост обновлён`, 'success');
        } else {
            await createPost(title, body);
            showToast(`Пост создан`, 'success');
        }
        
        closePostModal();
        await renderPosts();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function saveComment() {
    const author = document.getElementById('commentAuthor').value.trim();
    const body = document.getElementById('commentBody').value.trim();
    
    if (!author || !body) {
        showToast('Заполните имя и комментарий', 'error');
        return;
    }
    
    try {
        await addComment(currentCommentsPostId, author, body);
        showToast(`Комментарий добавлен`, 'success');
        document.getElementById('commentBody').value = '';
        await openCommentsModal(currentCommentsPostId);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function closePostModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = 'none';
    currentPostId = null;
}

function closeCommentsModal() {
    const modal = document.getElementById('commentsModal');
    modal.style.display = 'none';
    currentCommentsPostId = null;
}

function switchTab(tabId) {
    const forumTab = document.getElementById('forumTab');
    const weatherPageTab = document.getElementById('weatherPageTab');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (tabId === 'forum') {
        forumTab.classList.add('active');
        weatherPageTab.classList.remove('active');
    } else if (tabId === 'weather-page') {
        forumTab.classList.remove('active');
        weatherPageTab.classList.add('active');
    }
}

async function init() {
    await renderPosts();
    
    const defaultCity = 'Moscow';
    document.getElementById('cityInput').value = defaultCity;
    await handleWeather();
    
    document.getElementById('getWeatherBtn').addEventListener('click', handleWeather);
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleWeather();
    });
    
    document.getElementById('createPostBtn').addEventListener('click', () => openEditModal());
    document.getElementById('savePostBtn').addEventListener('click', savePost);
    document.getElementById('closeModalBtn').addEventListener('click', closePostModal);
    document.getElementById('addCommentBtn').addEventListener('click', saveComment);
    document.getElementById('closeCommentsBtn').addEventListener('click', closeCommentsModal);
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    window.addEventListener('click', (e) => {
        const postModal = document.getElementById('postModal');
        const commentsModal = document.getElementById('commentsModal');
        if (e.target === postModal) closePostModal();
        if (e.target === commentsModal) closeCommentsModal();
    });
    
}

init();