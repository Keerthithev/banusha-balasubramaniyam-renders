
class FileService {
  static async uploadFile(file: File): Promise<string> {
    // In a production app, this would upload to a server/cloud storage
    // For this demo, we'll convert to base64 and store locally
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  static isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }
  
  static isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }
}

export default FileService;
