// controllers/DownloadController.ts
import html2pdf from 'html2pdf.js';

export const DownloadController = {
  async downloadPortfolio() {
    const element = document.getElementById("portfolio-download"); 
    // Wrap the about + portfolio in a container with this ID
    if (!element) throw new Error("Downloadable content not found.");

    const opt = {
      margin:       0,
      filename:     'Banusha-Balasubramaniyam-Portfolio.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(element).save();
  }
};
