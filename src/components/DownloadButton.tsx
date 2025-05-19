
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DownloadController } from '@/controllers/DownloadController';
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
      await DownloadController.downloadPortfolio();
      toast({
        title: "Download Started",
        description: "Your portfolio download has begun.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error preparing your download. Please try again.",
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
      className={`bg-moduno-yellow text-moduno-navy hover:bg-white transition-colors ${className}`}
      disabled={isDownloading}
    >
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? 'Preparing...' : 'Download Portfolio'}
    </Button>
  );
};

export default DownloadButton;
