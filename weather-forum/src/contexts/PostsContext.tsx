import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Post, Comment } from '../types';

const API_URL = 'https://69c69fe6f272266f3eace2c5.mockapi.io';

interface PostsContextType {
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  createPost: (title: string, body: string) => Promise<void>;
  updatePost: (id: string, title: string, body: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addComment: (postId: number, name: string, body: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  loadComments: (postId: number) => Promise<Comment[]>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, body: string) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });
    const newPost = await res.json();
    setPosts([newPost, ...posts]);
  };

  const updatePost = async (id: string, title: string, body: string) => {
    await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });
    setPosts(posts.map(p => p.id === id ? { ...p, title, body } : p));
  };

  const deletePost = async (id: string) => {
    await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  const addComment = async (postId: number, name: string, body: string) => {
    const res = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, name, body })
    });
    const newComment = await res.json();
    setComments([...comments, newComment]);
  };

  const deleteComment = async (id: string) => {
    await fetch(`${API_URL}/comments/${id}`, { method: 'DELETE' });
    setComments(comments.filter(c => c.id !== id));
  };

  const loadComments = async (postId: number) => {
    const res = await fetch(`${API_URL}/comments?postId=${postId}`);
    const data = await res.json();
    return data;
  };

  return (
    <PostsContext.Provider value={{
      posts, comments, loading,
      createPost, updatePost, deletePost,
      addComment, deleteComment, loadComments
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider');
  return context;
}