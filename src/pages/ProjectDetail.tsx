
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectService, { Project } from '@/services/ProjectService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const projectData = ProjectService.getProject(id);
      if (projectData) {
        setProject(projectData);
        if (projectData.images.length > 0) {
          setActiveImage(projectData.images[0]);
        }
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-moduno-navy hover:text-moduno-yellow mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            
            {/* Main Image/Video Display */}
            <div className="bg-gray-100 rounded-lg p-2 aspect-video flex items-center justify-center overflow-hidden">
              {activeImage && activeImage.startsWith('data:image') && (
                <img 
                  src={activeImage} 
                  alt={project.title}
                  className="max-w-full max-h-full object-contain rounded"
                />
              )}
              {activeImage && activeImage.startsWith('data:video') && (
                <video 
                  src={activeImage}
                  className="max-w-full max-h-full rounded"
                  controls
                  autoPlay
                  muted
                />
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {project.images.map((img, index) => (
                <div 
                  key={`img-${index}`} 
                  className={`aspect-square cursor-pointer rounded overflow-hidden ${activeImage === img ? 'ring-2 ring-moduno-yellow' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {project.videos?.map((video, index) => (
                <div 
                  key={`video-${index}`}
                  className={`aspect-square cursor-pointer rounded overflow-hidden relative ${activeImage === video.url ? 'ring-2 ring-moduno-yellow' : ''}`}
                  onClick={() => setActiveImage(video.url)}
                >
                  {/* Video thumbnail */}
                  <div className="absolute inset-0 bg-moduno-darknavy flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm text-gray-500">Date</h3>
                  <p>{new Date(project.date).toLocaleDateString()}</p>
                </div>
                
                {project.client && (
                  <div>
                    <h3 className="text-sm text-gray-500">Client</h3>
                    <p>{project.client}</p>
                  </div>
                )}
                
                {project.location && (
                  <div>
                    <h3 className="text-sm text-gray-500">Location</h3>
                    <p>{project.location}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm text-gray-500">Categories</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.category.map((cat, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-moduno-navy text-xs text-white rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>
            
            <div className="pt-4">
              <Link to="/#contact">
                <Button className="w-full bg-moduno-yellow text-moduno-navy hover:bg-yellow-500">
                  Contact Us About This Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
