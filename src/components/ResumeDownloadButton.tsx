"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ResumeDownloadButtonProps {
  className?: string
}

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ className }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      toast({
        title: "Downloading Resume",
        description: "Please wait while we prepare your resume...",
        duration: 2000,
      })

      // Create a link element to download the PDF
      const link = document.createElement('a')
      link.href = '/lovable-uploads/Banu final CV.pdf'
      link.download = 'Banusha_Balasubramaniyam_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error downloading resume:", error)
      toast({
        title: "Download Failed",
        description: "An error occurred during the download. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className={`bg-white text-moduno-navy hover:bg-gray-100 transition-colors shadow-lg border-2 border-moduno-blue ${className}`}
      disabled={isDownloading}
      size="lg"
    >
      {isDownloading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Downloading...
        </span>
      ) : (
        <span className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Download Resume
        </span>
      )}
    </Button>
  )
}

export default ResumeDownloadButton 