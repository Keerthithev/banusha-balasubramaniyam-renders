
class AuthService {
  private static readonly AUTH_KEY = 'moduno_admin_auth';
  
  static login(username: string, password: string): boolean {
    // In a real app, you would validate against a backend
    // This is a simple example with hardcoded credentials
    if (username === 'admin' && password === 'moduno2025') {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify({
        isAuthenticated: true,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  }
  
  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }
  
  static isAuthenticated(): boolean {
    const auth = localStorage.getItem(this.AUTH_KEY);
    if (!auth) return false;
    
    try {
      const authData = JSON.parse(auth);
      // Session expires after 24 hours
      if (Date.now() - authData.timestamp > 24 * 60 * 60 * 1000) {
        this.logout();
        return false;
      }
      return authData.isAuthenticated;
    } catch {
      return false;
    }
  }
}

export default AuthService;
