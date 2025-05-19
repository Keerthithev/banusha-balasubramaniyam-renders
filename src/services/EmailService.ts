
// Note: This service is meant for frontend simulation
// In a production app, this would call a backend API

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

class EmailService {
  static async sendContactEmail(data: ContactFormData): Promise<boolean> {
    // In a real application, this would call a backend API endpoint
    // that would use nodemailer to send the email
    console.log('Sending email to keerthiganthevarasa@gmail.com', data);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success
        resolve(true);
      }, 1000);
    });
  }
}

export default EmailService;
