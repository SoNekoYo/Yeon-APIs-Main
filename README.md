# 🌟 Yeon UI - Beautiful API Documentation

A stunning, modern API documentation interface with beautiful gradients, creative animations, and an intuitive user experience.

## ✨ Features

- 🎨 **Beautiful Gradients**: Eye-catching color schemes and smooth transitions
- 🌙 **Dark/Light Mode**: Toggle between themes with smooth animations
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔍 **Smart Search**: Find APIs quickly with real-time filtering
- 🎭 **Creative Animations**: Engaging hover effects and loading animations
- 🚀 **Fast Performance**: Optimized for speed and smooth user experience
- 🎯 **Category Filtering**: Organize APIs by categories with slide navigation
- 💫 **Interactive Testing**: Test APIs directly in the browser
- 🔄 **Real-time Updates**: Live API status monitoring
- 🎪 **FontAwesome Icons**: Beautiful icons throughout the interface

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sonekoyo/Yeon-APIs-Main.git
   cd Yeon-APIs-Main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your APIs**
   - Edit `src/settings.json` to add your API endpoints
   - Add your API scraper files in `src/api/` folders

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
yeon-ui/
├── api-page/           # Frontend assets
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styling
│   ├── script.js       # JavaScript functionality
│   ├── 404.html        # 404 error page
│   └── 500.html        # 500 error page
├── src/
│   ├── api/            # API scraper files
│   │   └── ai/         # AI category APIs
│   │       └── luminai.js
│   └── settings.json   # API configuration
├── index.js            # Express server
├── package.json        # Dependencies
├── vercel.json         # Vercel deployment config
└── README.md
```

## ⚙️ Configuration

### API Settings (`src/settings.json`)

```json
{
  "name": "Your API Name",
  "version": "v1.0.0",
  "description": "Your API description",
  "bannerImage": "/src/your-banner.jpg",
  "header": {
    "status": "Online!"
  },
  "apiSettings": {
    "creator": "Your Name",
    "apikey": ["your-api-key"]
  },
  "categories": [
    {
      "name": "Category Name",
      "icon": "fas fa-icon",
      "color": "#hexcolor",
      "items": [
        {
          "name": "API Name",
          "desc": "API Description",
          "path": "/api/endpoint?param=",
          "status": "ready",
          "params": {
            "param": "Parameter description"
          }
        }
      ]
    }
  ]
}
```

### Adding New APIs

1. Create a new JavaScript file in `src/api/category/`
2. Follow the module pattern:

```javascript
module.exports = function(app) {
    app.get('/api/endpoint', async (req, res) => {
        try {
            // Your API logic here
            res.json({ status: true, data: result });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
```

3. Add the API to your `settings.json` configuration

## 🎨 Customization

### Colors and Themes

Edit CSS variables in `api-page/styles.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  /* ... more variables */
}
```

### Adding Custom Categories

1. Add category to `settings.json`
2. Create corresponding folder in `src/api/`
3. Add API files to the folder

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with `vercel.json` configuration

### Manual Deployment

1. Build the project: `npm start`
2. Upload files to your hosting provider
3. Ensure Node.js environment is available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Features in Detail

### 🎨 Visual Design
- Modern gradient backgrounds
- Smooth animations and transitions
- Responsive grid layouts
- Interactive hover effects
- Creative loading animations

### 🔧 Functionality
- Real-time API testing
- Parameter validation
- JSON syntax highlighting
- Copy to clipboard functionality
- Search and filter system
- Category-based navigation

### 📱 Responsive
- Mobile-first design
- Touch-friendly interface
- Collapsible sidebar
- Adaptive layouts
- Optimized for all screen sizes

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Support

For support, email yeonelle0@gmail.com

## 🙏 Acknowledgments

- FontAwesome for beautiful icons
- Bootstrap for responsive components
- Poppins & JetBrains Mono fonts
- All contributors and users

---

Made with ❤️ by [YeonElle](https://github.com/SoNekoYo)
```

MIT License

Copyright (c) 2025 YeonElle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
