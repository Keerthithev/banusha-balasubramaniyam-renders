
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/AuthService';
import ProjectService, { Project } from '@/services/ProjectService';
import FileService from '@/services/FileService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(() => ProjectService.getProjects());
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    client: '',
    location: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const imageFiles = fileList.filter(file => FileService.isImage(file));
      setImages(prev => [...prev, ...imageFiles]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const videoFiles = fileList.filter(file => FileService.isVideo(file));
      setVideos(prev => [...prev, ...videoFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images
      const imageUrls = await Promise.all(
        images.map(image => FileService.uploadFile(image))
      );

      // Upload videos
      const videoObjects = await Promise.all(
        videos.map(async (video) => {
          const videoUrl = await FileService.uploadFile(video);
          return {
            url: videoUrl,
            thumbnail: '' // In a real app, we'd generate a thumbnail
          };
        })
      );

      // Process categories
      const categories = formData.category.split(',').map(cat => cat.trim());

      // Create project
      const newProject = ProjectService.addProject({
        title: formData.title,
        description: formData.description,
        category: categories,
        images: imageUrls,
        videos: videoObjects,
        date: formData.date,
        client: formData.client || undefined,
        location: formData.location || undefined
      });

      // Update state
      setProjects(ProjectService.getProjects());
      toast.success('Project added successfully');

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        client: '',
        location: '',
      });
      setImages([]);
      setVideos([]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const success = ProjectService.deleteProject(id);
      if (success) {
        setProjects(ProjectService.getProjects());
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-moduno-navy text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Moduno Admin Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-moduno-navy"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-moduno-yellow text-moduno-navy font-semibold hover:bg-yellow-400"
          >
            {showForm ? 'Cancel' : 'Add New Project'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moduno-yellow"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categories * (comma separated)
                </label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="3d, interior, exterior"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                    Client (optional)
                  </label>
                  <Input
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location (optional)
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images *
                </label>
                <Input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  required={images.length === 0}
                  className="border border-gray-300 rounded-md p-2"
                />
                {images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="text-xs bg-gray-100 rounded p-1">
                        {image.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="videos" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Videos (optional)
                </label>
                <Input
                  type="file"
                  id="videos"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="border border-gray-300 rounded-md p-2"
                />
                {videos.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {videos.map((video, index) => (
                      <div key={index} className="text-xs bg-gray-100 rounded p-1">
                        {video.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-moduno-navy text-white hover:bg-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No projects found. Add your first project.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.category.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(project.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.images.length} images, {project.videos?.length || 0} videos
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button
                          onClick={() => navigate(`/project/${project.id}`)}
                          variant="outline"
                          className="mr-2 text-xs"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project.id)}
                          variant="destructive"
                          className="text-xs"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
