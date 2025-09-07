import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { postService } from '@/services/postService';
import { useAuth } from '@/contexts/AuthContext';
import { Post } from '@/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await postService.getPostById(postId);
      setPost(response.data || null);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError(error.response?.data?.error?.message || 'Post not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postService.deletePost(post.id);
      toast.success('Post deleted successfully');
      // Navigate back to posts page
      window.location.href = '/posts';
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Loading post..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">{error || 'The post you are looking for does not exist.'}</p>
        <Link to="/posts" className="btn-primary inline-flex items-center space-x-2">
          <ArrowLeft size={18} />
          <span>Back to Posts</span>
        </Link>
      </div>
    );
  }

  const canManagePost = user && (user.id === post.author.id || user.role === 'ADMIN');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/posts"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Posts</span>
        </Link>
        
        {canManagePost && (
          <div className="flex items-center space-x-2">
            <button className="btn-secondary inline-flex items-center space-x-2">
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeletePost}
              className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg font-medium transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Post Content */}
      <article className="card">
        <div className="p-8">
          {/* Header */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  post.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>{post.author.name || post.author.email}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          {post.content ? (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No content available for this post.
            </div>
          )}
        </div>
      </article>

      {/* Author Info */}
      <div className="card p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {post.author.name || 'Anonymous'}
            </h3>
            <p className="text-gray-600 text-sm">{post.author.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Author • Joined {new Date(post.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};