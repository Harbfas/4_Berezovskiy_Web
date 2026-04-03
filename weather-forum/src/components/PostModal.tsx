import { useState } from 'react';
import type { Post } from '../types';
import { usePosts } from '../contexts/PostsContext';

interface Props {
  post?: Post;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: Props) {
  const { createPost, updatePost } = usePosts();
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');

  const handleSubmit = async () => {
    if (!title || !body) {
      alert('Заполните заголовок и содержание');
      return;
    }
    if (post) {
      await updatePost(post.id, title, body);
    } else {
      await createPost(title, body);
    }
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <h3>{post ? 'Редактировать пост' : 'Создать пост'}</h3>
        <label>Заголовок</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Введите заголовок" 
        />
        <label>Содержание</label>
        <textarea 
          rows={5} 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Введите текст поста" 
        />
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}