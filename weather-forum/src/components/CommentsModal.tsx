import { useState, useEffect } from 'react';
import type { Comment } from '../types';
import { usePosts } from '../contexts/PostsContext';

interface Props {
  postId: number;
  onClose: () => void;
}

export default function CommentsModal({ postId, onClose }: Props) {
  const { addComment, deleteComment, loadComments } = usePosts();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('Гость');
  const [body, setBody] = useState('');

  useEffect(() => {
    loadComments(postId).then(data => {
      setComments(data);
      setLoading(false);
    });
  }, [postId]);

  const handleAddComment = async () => {
    if (!name || !body) {
      alert('Заполните имя и комментарий');
      return;
    }
    const newComment = await addComment(postId, name, body);
    setComments([...comments, newComment as unknown as Comment]);
    setBody('');
  };

  const handleDeleteComment = async (id: string) => {
    if (confirm('Удалить комментарий?')) {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content modal-large">
        <h3>Комментарии</h3>
        <div className="comments-list">
          {loading ? (
            <p>Загрузка...</p>
          ) : comments.length === 0 ? (
            <p>Нет комментариев.</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <button className="comment-delete" onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
                <div className="comment-author">{comment.name}</div>
                <div className="comment-text">{comment.body}</div>
              </div>
            ))
          )}
        </div>
        <h4>Добавить комментарий</h4>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ваше имя" 
        />
        <textarea 
          rows={3} 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Ваш комментарий" 
        />
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
          <button className="btn btn-primary" onClick={handleAddComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
}