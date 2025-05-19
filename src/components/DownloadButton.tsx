import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ className }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Replace with the actual public URL or endpoint
      const fileUrl = "/lovable-uploads/Moduno_Portfolio_2025.pdf";

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = "Moduno_Portfolio_2025.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: "Your portfolio is being downloaded.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "An error occurred during the download.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className={`bg-moduno-blue text-moduno-navy hover:bg-white transition-colors ${className}`}
      disabled={isDownloading}
    >
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? 'Preparing...' : 'Download Portfolio'}
    </Button>
  );
};

export default DownloadButton;
