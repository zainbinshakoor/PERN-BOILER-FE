import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { postService } from '@/services/postService';
import { userService } from '@/services/userService';
import { Post, User } from '@/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', published: false });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const postsResponse = await postService.getAllPosts(1, 50);
      setPosts(postsResponse.data || []);

      if (user?.role === 'ADMIN') {
        const usersResponse = await userService.getAllUsers();
        setUsers(usersResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postService.createPost(newPost);
      toast.success('Post created successfully!');
      setNewPost({ title: '', content: '', published: false });
      setShowCreateForm(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postService.deletePost(postId);
      toast.success('Post deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Posts',
      value: posts.length,
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Published Posts',
      value: posts.filter(p => p.published).length,
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      color: 'bg-green-50',
    },
    ...(user?.role === 'ADMIN' ? [{
      title: 'Total Users',
      value: users.length,
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-50',
    }] : []),
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name || user?.email}!
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>New Post</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`card p-6 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex-shrink-0">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Form */}
      {showCreateForm && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="input"
                required
                placeholder="Enter post title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="input h-32 resize-none"
                placeholder="Enter post content"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={newPost.published}
                onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="published" className="text-sm text-gray-700">
                Publish immediately
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Create Post
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
        </div>
        
        <div className="divide-y">
          {posts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No posts found. Create your first post!
            </div>
          ) : (
            posts.slice(0, 10).map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/posts/${post.id}`}
                      className="font-medium text-gray-900 hover:text-primary-600"
                    >
                      {post.title}
                    </Link>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    By {post.author.name || post.author.email} • {' '}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {(user?.id === post.author.id || user?.role === 'ADMIN') && (
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Users List (Admin only) */}
      {user?.role === 'ADMIN' && users.length > 0 && (
        <div className="card">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
          </div>
          
          <div className="divide-y">
            {users.map((userData) => (
              <div key={userData.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {userData.name || 'No name'}
                  </p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      userData.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {userData.role}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};