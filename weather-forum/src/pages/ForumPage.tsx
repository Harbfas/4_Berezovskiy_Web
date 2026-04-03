import { useState } from 'react';
import { usePosts } from '../contexts/PostsContext';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import Spinner from '../components/Spinner';

export default function ForumPage() {
  const { posts, loading } = usePosts();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="forum-header">
        <h2>Обсуждения</h2>
        <button className="btn btn-success" onClick={() => setShowCreateModal(true)}>Создать пост</button>
      </div>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>Нет постов.</p>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
      {showCreateModal && <PostModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
