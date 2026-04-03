import { useState } from 'react';
import type { Post } from '../types';
import { usePosts } from '../contexts/PostsContext';
import PostModal from './PostModal';
import CommentsModal from './CommentsModal';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { deletePost } = usePosts();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleDelete = () => {
    if (confirm('Удалить этот пост?')) {
      deletePost(post.id);
    }
  };

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-actions">
            <button className="btn btn-warning btn-sm" onClick={() => setShowEditModal(true)}>
              Редактировать
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </div>
        <div className="post-body">{post.body}</div>
        <div className="post-footer">
          <span className="comment-count" onClick={() => setShowCommentsModal(true)}>
            Комментарии
          </span>
        </div>
      </div>

      {showEditModal && (
        <PostModal post={post} onClose={() => setShowEditModal(false)} />
      )}

      {showCommentsModal && (
        <CommentsModal postId={Number(post.id)} onClose={() => setShowCommentsModal(false)} />
      )}
    </>
  );
}