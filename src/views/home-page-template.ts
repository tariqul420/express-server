import { EndpointGroup } from "../utils/api-documentation";

export const generateHomePage = (endpoints: EndpointGroup[]): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vehicle Rental API - Express Server</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, hsl(222.2 84% 4.9%) 0%, hsl(217.2 32.6% 17.5%) 100%);
            min-height: 100vh;
            padding: 24px;
            color: hsl(0 0% 98%);
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, hsl(217.2 91.2% 59.8% / 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, hsl(142.1 76.2% 36.3% / 0.06) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        
        .header {
            margin-bottom: 48px;
            padding-bottom: 32px;
            border-bottom: 1px solid hsl(0 0% 14.9% / 0.5);
            backdrop-filter: blur(10px);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 24px;
        }
        
        .title-section {
            flex: 1;
            min-width: 300px;
        }
        
        .title-section h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 12px;
            background: linear-gradient(135deg, hsl(0 0% 98%) 0%, hsl(217.2 91.2% 59.8%) 50%, hsl(142.1 76.2% 36.3%) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.02em;
            animation: shimmer 3s infinite;
            background-size: 200% auto;
        }
        
        @keyframes shimmer {
            0%, 100% { background-position: 0% center; }
            50% { background-position: 100% center; }
        }
        
        .title-section p {
            color: hsl(0 0% 70%);
            font-size: 1.125rem;
            font-weight: 400;
        }
        
        .subtitle {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
            color: hsl(0 0% 55%);
            font-size: 0.875rem;
        }
        
        .tech-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            background: hsl(217.2 91.2% 59.8% / 0.15);
            border: 1px solid hsl(217.2 91.2% 59.8% / 0.3);
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            color: hsl(217.2 91.2% 59.8%);
        }
        
        .status {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, hsl(142.1 76.2% 36.3%) 0%, hsl(142.1 70.6% 45.3%) 100%);
            color: hsl(0 0% 98%);
            padding: 12px 20px;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 4px 20px hsl(142.1 76.2% 36.3% / 0.4),
                        0 0 0 1px hsl(142.1 76.2% 36.3% / 0.1);
            animation: pulse 2s infinite;
            position: relative;
            overflow: hidden;
        }
        
        .status::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .status-dot {
            width: 10px;
            height: 10px;
            background: hsl(0 0% 98%);
            border-radius: 50%;
            animation: blink 2s infinite;
            box-shadow: 0 0 10px hsl(0 0% 98%);
        }
        
        @keyframes pulse {
            0%, 100% { 
                opacity: 1;
                transform: scale(1);
            }
            50% { 
                opacity: 0.9;
                transform: scale(1.02);
            }
        }
        
        @keyframes blink {
            0%, 100% { 
                opacity: 1;
                transform: scale(1);
            }
            50% { 
                opacity: 0.4;
                transform: scale(0.8);
            }
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            margin-bottom: 48px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, hsl(0 0% 14.9% / 0.6) 0%, hsl(0 0% 10% / 0.4) 100%);
            border: 1px solid hsl(0 0% 20% / 0.5);
            border-radius: 16px;
            padding: 28px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                hsl(217.2 91.2% 59.8% / 0.5), 
                hsl(142.1 76.2% 36.3% / 0.5));
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .stat-card:hover {
            border-color: hsl(217.2 91.2% 59.8% / 0.5);
            background: linear-gradient(135deg, hsl(0 0% 16% / 0.8) 0%, hsl(0 0% 12% / 0.6) 100%);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px hsl(0 0% 0% / 0.4);
        }
        
        .stat-card:hover::before {
            opacity: 1;
        }
        
        .stat-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, hsl(217.2 91.2% 59.8% / 0.15), hsl(142.1 76.2% 36.3% / 0.15));
            border: 1px solid hsl(217.2 91.2% 59.8% / 0.3);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 16px;
        }
        
        .stat-number {
            font-size: 2.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, hsl(0 0% 98%), hsl(217.2 91.2% 59.8%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
        }
        
        .stat-label {
            color: hsl(0 0% 63.9%);
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .endpoint-group {
            margin-bottom: 56px;
            animation: fadeInUp 0.6s ease-out backwards;
        }
        
        .endpoint-group:nth-child(1) { animation-delay: 0.1s; }
        .endpoint-group:nth-child(2) { animation-delay: 0.2s; }
        .endpoint-group:nth-child(3) { animation-delay: 0.3s; }
        .endpoint-group:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .group-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding: 20px;
            background: linear-gradient(135deg, hsl(0 0% 14.9% / 0.4) 0%, hsl(0 0% 10% / 0.2) 100%);
            border: 1px solid hsl(0 0% 20% / 0.5);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }
        
        .group-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, hsl(217.2 91.2% 59.8%), hsl(142.1 76.2% 36.3%));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: hsl(0 0% 98%);
            font-weight: 700;
            font-size: 1.25rem;
            box-shadow: 0 4px 16px hsl(217.2 91.2% 59.8% / 0.3);
        }
        
        .group-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: hsl(0 0% 98%);
            letter-spacing: -0.01em;
        }
        
        .group-count {
            margin-left: auto;
            padding: 6px 12px;
            background: hsl(0 0% 20% / 0.5);
            border: 1px solid hsl(0 0% 25% / 0.5);
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            color: hsl(0 0% 70%);
        }
        
        .endpoints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
            gap: 16px;
        }
        
        .endpoint {
            background: linear-gradient(135deg, hsl(0 0% 14.9% / 0.6) 0%, hsl(0 0% 10% / 0.4) 100%);
            border: 1px solid hsl(0 0% 20% / 0.5);
            border-radius: 12px;
            padding: 24px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .endpoint::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, hsl(217.2 91.2% 59.8% / 0.05), hsl(142.1 76.2% 36.3% / 0.05));
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .endpoint:hover {
            border-color: hsl(217.2 91.2% 59.8% / 0.6);
            background: linear-gradient(135deg, hsl(0 0% 16% / 0.8) 0%, hsl(0 0% 12% / 0.6) 100%);
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 32px hsl(0 0% 0% / 0.3),
                        0 0 0 1px hsl(217.2 91.2% 59.8% / 0.2);
        }
        
        .endpoint:hover::before {
            opacity: 1;
        }
        
        .endpoint-header {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 12px;
        }
        
        .method {
            display: inline-flex;
            align-items: center;
            padding: 6px 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
            min-width: 70px;
            justify-content: center;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .method.get {
            background: linear-gradient(135deg, hsl(142.1 70.6% 45.3% / 0.2), hsl(142.1 76.2% 36.3% / 0.15));
            color: hsl(142.1 76.2% 36.3%);
            border: 1px solid hsl(142.1 76.2% 36.3% / 0.4);
        }
        
        .method.get:hover {
            background: linear-gradient(135deg, hsl(142.1 70.6% 45.3% / 0.3), hsl(142.1 76.2% 36.3% / 0.25));
            box-shadow: 0 0 16px hsl(142.1 76.2% 36.3% / 0.4);
        }
        
        .method.post {
            background: linear-gradient(135deg, hsl(221.2 83.2% 53.3% / 0.2), hsl(217.2 91.2% 59.8% / 0.15));
            color: hsl(217.2 91.2% 59.8%);
            border: 1px solid hsl(217.2 91.2% 59.8% / 0.4);
        }
        
        .method.post:hover {
            background: linear-gradient(135deg, hsl(221.2 83.2% 53.3% / 0.3), hsl(217.2 91.2% 59.8% / 0.25));
            box-shadow: 0 0 16px hsl(217.2 91.2% 59.8% / 0.4);
        }
        
        .method.put {
            background: linear-gradient(135deg, hsl(24.6 95% 53.1% / 0.2), hsl(20.5 90.2% 48.2% / 0.15));
            color: hsl(20.5 90.2% 48.2%);
            border: 1px solid hsl(20.5 90.2% 48.2% / 0.4);
        }
        
        .method.put:hover {
            background: linear-gradient(135deg, hsl(24.6 95% 53.1% / 0.3), hsl(20.5 90.2% 48.2% / 0.25));
            box-shadow: 0 0 16px hsl(20.5 90.2% 48.2% / 0.4);
        }
        
        .method.delete {
            background: linear-gradient(135deg, hsl(0 72.2% 50.6% / 0.2), hsl(0 84.2% 60.2% / 0.15));
            color: hsl(0 84.2% 60.2%);
            border: 1px solid hsl(0 84.2% 60.2% / 0.4);
        }
        
        .method.delete:hover {
            background: linear-gradient(135deg, hsl(0 72.2% 50.6% / 0.3), hsl(0 84.2% 60.2% / 0.25));
            box-shadow: 0 0 16px hsl(0 84.2% 60.2% / 0.4);
        }
        
        .path {
            font-family: 'SF Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
            font-size: 0.95rem;
            color: hsl(0 0% 98%);
            font-weight: 600;
            background: hsl(0 0% 20% / 0.4);
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid hsl(0 0% 25% / 0.5);
        }
        
        .description {
            color: hsl(0 0% 70%);
            font-size: 0.9rem;
            margin-bottom: 14px;
            line-height: 1.5;
            font-weight: 400;
        }
        
        .auth-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            background: linear-gradient(135deg, hsl(0 0% 20% / 0.6), hsl(0 0% 16% / 0.4));
            color: hsl(0 0% 80%);
            border: 1px solid hsl(0 0% 25% / 0.5);
            backdrop-filter: blur(4px);
        }
        
        .auth-badge.public {
            background: linear-gradient(135deg, hsl(142.1 70.6% 45.3% / 0.2), hsl(142.1 76.2% 36.3% / 0.15));
            color: hsl(142.1 76.2% 36.3%);
            border: 1px solid hsl(142.1 76.2% 36.3% / 0.4);
        }
        
        .footer {
            margin-top: 80px;
            padding: 40px 0 32px;
            border-top: 1px solid hsl(0 0% 14.9% / 0.5);
            text-align: center;
            color: hsl(0 0% 63.9%);
            font-size: 0.875rem;
            backdrop-filter: blur(10px);
        }
        
        .footer-brand {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: hsl(0 0% 80%);
        }
        
        .footer-description {
            margin-bottom: 20px;
            color: hsl(0 0% 55%);
        }
        
        .footer-dev {
            margin: 16px 0;
            padding: 16px;
            background: linear-gradient(135deg, hsl(0 0% 14.9% / 0.4) 0%, hsl(0 0% 10% / 0.2) 100%);
            border: 1px solid hsl(0 0% 20% / 0.5);
            border-radius: 12px;
            display: inline-block;
        }
        
        .footer-links {
            margin-top: 24px;
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
        }
        
        .footer a {
            color: hsl(217.2 91.2% 59.8%);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid transparent;
        }
        
        .footer a:hover {
            color: hsl(217.2 91.2% 69.8%);
            background: hsl(217.2 91.2% 59.8% / 0.1);
            border-color: hsl(217.2 91.2% 59.8% / 0.3);
        }
        
        .footer-separator {
            color: hsl(0 0% 32%);
            font-weight: 300;
        }
        
        .copyright {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid hsl(0 0% 14.9% / 0.3);
            color: hsl(0 0% 45%);
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 16px;
            }
            
            .title-section h1 {
                font-size: 2rem;
            }
            
            .stats {
                grid-template-columns: 1fr;
            }
            
            .endpoints-grid {
                grid-template-columns: 1fr;
            }
            
            .endpoint-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .group-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .group-count {
                margin-left: 0;
            }
        }
        
        @media (max-width: 480px) {
            .title-section h1 {
                font-size: 1.75rem;
            }
            
            .stat-number {
                font-size: 2.25rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="title-section">
                    <h1>🚀 Express API Server</h1>
                    <p>🚗 Vehicle Rental Management System</p>
                    <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                        <span class="tech-badge">Express.js</span>
                        <span class="tech-badge">TypeScript</span>
                        <span class="tech-badge">PostgreSQL</span>
                        <span class="tech-badge">REST API</span>
                    </div>
                </div>
                <div class="status">
                    <span class="status-dot"></span>
                    Server Running
                </div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-number">${endpoints.reduce(
                  (acc, group) => acc + group.routes.length,
                  0
                )}</div>
                <div class="stat-label">Total Endpoints</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🔧</div>
                <div class="stat-number">${endpoints.length}</div>
                <div class="stat-label">API Groups</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🚀</div>
                <div class="stat-number">v1</div>
                <div class="stat-label">API Version</div>
            </div>
        </div>
        
        ${endpoints
          .map(
            (group, index) => `
            <div class="endpoint-group">
                <div class="group-header">
                    <div class="group-icon">${
                      index === 0
                        ? "🔐"
                        : index === 1
                        ? "👥"
                        : index === 2
                        ? "🚗"
                        : "📅"
                    }</div>
                    <h2 class="group-title">${group.group}</h2>
                    <span class="group-count">${group.routes.length} endpoints</span>
                </div>
                <div class="endpoints-grid">
                    ${group.routes
                      .map(
                        (route) => `
                        <div class="endpoint">
                            <div class="endpoint-header">
                                <span class="method ${route.method.toLowerCase()}">${
                          route.method
                        }</span>
                                <code class="path">${route.path}</code>
                            </div>
                            <div class="description">${route.description}</div>
                            <span class="auth-badge ${
                              route.auth === "Public" ? "public" : ""
                            }">
                                ${route.auth === "Public" ? "🌐" : "🔐"} ${
                          route.auth
                        }
                            </span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
          )
          .join("")}
        
        <div class="footer">
            <div class="footer-brand">⚡ Express API Server</div>
            <p class="footer-description">A modern, secure, and scalable RESTful API built with industry best practices</p>
            <div class="footer-dev">
                <strong>👨‍💻 Developed by</strong> <a href="https://tariqul.dev" target="_blank">Tariqul Islam</a>
            </div>
            <div class="footer-links">
                <a href="https://github.com/tariqul420/express-server.git" target="_blank">📦 GitHub Repository</a>
                <span class="footer-separator">•</span>
                <a href="https://expressjs.com/" target="_blank">📚 Express Docs</a>
                <span class="footer-separator">•</span>
                <a href="https://www.typescriptlang.org/" target="_blank">📘 TypeScript Docs</a>
            </div>
            <div class="copyright">
                © ${new Date().getFullYear()} Express API Server. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
