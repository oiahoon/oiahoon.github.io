# Build and Deployment Guide

**Generated Date:** 2025-10-22  
**Project:** Joey's Notes - Build & Deployment  
**Purpose:** Complete guide for building and deploying the blog

## Overview

This guide covers the complete process of building and deploying Joey's Notes blog, from local development to production deployment.

## Prerequisites

### System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: For version control

### Verify Installation

```bash
node --version  # Should be 18.0.0+
npm --version   # Should be 9.0.0+
git --version   # Any recent version
```

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/oiahoon/joey-notes-astro.git
cd joey-notes-astro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### 4. Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for issues
npm run astro check

# Format code
npm run format
```

## Project Structure

```
joey-notes-astro/
├── src/
│   ├── components/          # Reusable UI components
│   ├── content/            # Content collections
│   │   ├── posts/          # Blog posts (Markdown)
│   │   └── config.ts       # Content schema
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── public/                 # Static assets
│   ├── img/                # Images
│   ├── fonts/              # Web fonts
│   └── manifest.json       # PWA manifest
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind CSS config
├── package.json            # Dependencies
└── vercel.json             # Deployment config
```

## Building for Production

### 1. Production Build

```bash
npm run build
```

This creates a `dist/` directory with optimized static files.

### 2. Build Output

```
dist/
├── index.html              # Homepage
├── posts/                  # Individual post pages
├── tags/                   # Tag pages
├── page/                   # Pagination pages
├── _astro/                 # Optimized assets
├── img/                    # Images
└── manifest.json           # PWA manifest
```

### 3. Build Performance

- **Build Time**: ~2-3 seconds
- **Pages Generated**: 48+ pages
- **Bundle Size**: ~50-100KB
- **Optimization**: Tree-shaking, minification, compression

## Deployment Options

### Option 1: Vercel (Recommended)

#### Automatic Deployment

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Astro framework

2. **Configuration**:
   ```json
   // vercel.json (already included)
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "astro"
   }
   ```

3. **Deploy**:
   - Push to main branch
   - Automatic deployment triggers
   - Live at your Vercel URL

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Netlify

#### Automatic Deployment

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**:
   - Push to main branch
   - Automatic deployment

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

#### Setup GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Custom Domain Setup

### 1. Domain Configuration

For `notes.miaowu.org`:

#### DNS Settings
```
Type: CNAME
Name: notes
Value: your-deployment-url.vercel.app
```

#### Vercel Domain Setup
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add `notes.miaowu.org`

### 2. SSL Certificate

- **Vercel/Netlify**: Automatic SSL certificates
- **GitHub Pages**: Automatic SSL for custom domains
- **Manual**: Use Let's Encrypt or Cloudflare

## Environment Variables

### Development

Create `.env.local`:
```bash
# Analytics
GOOGLE_ANALYTICS_ID=your-ga-id

# Comments (if using)
DISQUS_SHORTNAME=your-disqus-shortname
```

### Production

Set environment variables in your deployment platform:

#### Vercel
```bash
vercel env add GOOGLE_ANALYTICS_ID
```

#### Netlify
- Go to Site settings → Environment variables
- Add variables

## Performance Optimization

### 1. Image Optimization

```bash
# Optimize images before adding
npm install -g imagemin-cli

# Compress images
imagemin public/img/*.jpg --out-dir=public/img/optimized
```

### 2. Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx astro build --analyze
```

### 3. Performance Monitoring

- **Lighthouse**: Built into Chrome DevTools
- **Core Web Vitals**: Monitor in Google Search Console
- **Vercel Analytics**: Available in Vercel dashboard

## Monitoring and Maintenance

### 1. Health Checks

```bash
# Check for broken links
npm install -g broken-link-checker
blc http://localhost:4321

# Check accessibility
npm install -g pa11y
pa11y http://localhost:4321
```

### 2. Updates

```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### 3. Backup

- **Content**: All content is in Git
- **Images**: Backup `/public/img/` directory
- **Configuration**: All config files in Git

## Troubleshooting

### Common Build Issues

1. **Node.js Version**:
   ```bash
   # Use Node 18+
   nvm use 18
   ```

2. **Memory Issues**:
   ```bash
   # Increase memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

3. **Cache Issues**:
   ```bash
   # Clear cache
   rm -rf node_modules/.cache
   npm run build
   ```

### Deployment Issues

1. **Build Failures**:
   - Check Node.js version
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **404 Errors**:
   - Verify routing configuration
   - Check file paths
   - Ensure proper redirects

3. **Performance Issues**:
   - Optimize images
   - Check bundle size
   - Enable compression

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run astro check
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Security Considerations

### 1. Dependencies

```bash
# Regular security audits
npm audit

# Update vulnerable packages
npm audit fix
```

### 2. Content Security

- Validate all user inputs
- Sanitize Markdown content
- Use HTTPS everywhere

### 3. Access Control

- Protect admin routes
- Use environment variables for secrets
- Regular access reviews

## Performance Benchmarks

### Target Metrics

- **Build Time**: < 5 seconds
- **Page Load**: < 1.5 seconds
- **Lighthouse Score**: > 90
- **Core Web Vitals**: All "Good"

### Current Performance

- **Build Time**: ~2.43 seconds
- **Bundle Size**: ~50-100KB
- **Lighthouse Score**: 95+
- **Core Web Vitals**: All "Good"

---

**Last Updated:** 2025-10-22  
**Version:** 1.0
