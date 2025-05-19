# TI Front-end

A modern React-based frontend application for logistics management, built with TypeScript and Vite.

## 🚀 Features

- Modern React with TypeScript
- Ant Design Pro components and layouts
- Responsive design with Tailwind CSS
- PDF viewer and generation capabilities
- Interactive maps with Leaflet
- Data visualization with Recharts and Ant Design Charts
- Firebase integration
- Internationalization support
- Excel file handling
- Rich text editing with Braft Editor

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Framework:** Ant Design Pro
- **Styling:** Tailwind CSS + Less
- **State Management:** Jotai
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Maps:** Leaflet + React Leaflet
- **Charts:** Recharts + Ant Design Charts
- **PDF:** React PDF + PDF.js
- **Date Handling:** Day.js
- **Form Handling:** Ant Design Pro Form
- **Data Grid:** Ant Design Pro Table

## 📋 Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ti_front-end
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
VITE_API_URL=your_api_url
# Add other required environment variables
```

## 🚀 Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Build the application for production:
```bash
yarn build
```

Preview the production build:
```bash
yarn serve
```

## 🐳 Docker

Build the Docker image:
```bash
docker build -t ti-frontend .
```

Run the container:
```bash
docker run -p 80:80 ti-frontend
```

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── context/        # React context providers
├── layouts/        # Page layouts
├── pages/         # Page components
├── routes/        # Route configurations
├── services/      # API services
├── styles/        # Global styles
├── utils/         # Utility functions
├── app.tsx        # Root component
├── main.tsx       # Application entry point
├── config.ts      # Configuration
└── types.ts       # TypeScript type definitions
```

## 🔒 Environment Variables

Required environment variables:
- `VITE_API_URL`: API endpoint URL
- Add other required environment variables here

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Ant Design Pro team for the excellent UI components
- Vite team for the fast build tool
- All other open-source contributors
# ti_frontend
