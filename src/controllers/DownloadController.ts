
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Controller for handling portfolio downloads
 */
export class DownloadController {
  /**
   * Creates and downloads a ZIP file containing portfolio samples
   */
  static downloadPortfolio = async () => {
    try {
      // Create a new ZIP file
      const zip = new JSZip();
      
      // Add some sample files to the ZIP
      // In a real implementation, these would be your actual portfolio files
      zip.file("portfolio/info.txt", "Moduno PVT Ltd - 3D Rendering Portfolio\nBy Banusha Balasubramaniyam\n\nThank you for downloading our portfolio!");
      zip.file("portfolio/contact.txt", "Email: info@moduno.com\nPhone: +94 XXXXXXXX\nWebsite: www.moduno.com");
      
      // Generate the ZIP file
      const content = await zip.generateAsync({ type: "blob" });
      
      // Trigger download
      saveAs(content, "moduno-portfolio.zip");
      
      return true;
    } catch (error) {
      console.error("Error creating download:", error);
      return false;
    }
  }
}
