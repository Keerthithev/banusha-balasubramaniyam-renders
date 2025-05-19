
# Moduno Portfolio Website

This is the portfolio website for Moduno PVT Ltd, showcasing 3D renderings, interior and exterior design projects.

## Features

- Responsive design for all devices
- Project showcase with filtering by category
- Project details view with image and video gallery
- Admin panel for managing projects
- Contact form with email notifications

## Admin Access

To access the admin panel:

1. Navigate to `/admin/login`
2. Use the default credentials:
   - Username: `admin`
   - Password: `moduno2025`

## Email Functionality

The contact form currently simulates sending emails. In production, you'll need:

1. A Node.js backend with Express.js
2. Implement the email sending functionality using the provided template in `src/server/email.js`
3. Set up proper SMTP credentials for your email provider

## Project Structure

- **src/pages**: Main application pages
- **src/components**: Reusable UI components 
- **src/services**: Services for auth, projects, email, etc.
- **src/controllers**: Controllers for specific actions like downloads
- **src/server**: Backend implementation templates

## Setup for Production

For a production deployment:

1. Replace placeholder contact information with real data
2. Implement the backend email service using nodemailer
3. Set up proper authentication for admin access
4. Add your real portfolio projects through the admin interface

## Customization

The site uses a color scheme based on:
- Navy Blue: Main brand color
- Yellow: Accent color
- White: Background for contrast

You can adjust these colors in the Tailwind configuration file.
