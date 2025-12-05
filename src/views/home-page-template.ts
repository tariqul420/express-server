import { EndpointGroup } from "../utils/api-documentation";

export const generateHomePage = (endpoints: EndpointGroup[]): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express API Server</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: hsl(0 0% 3.9%);
            min-height: 100vh;
            padding: 24px;
            color: hsl(0 0% 98%);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid hsl(0 0% 14.9%);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
        }
        
        .title-section h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            background: linear-gradient(to right, hsl(0 0% 98%), hsl(0 0% 80%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .title-section p {
            color: hsl(0 0% 63.9%);
            font-size: 1rem;
        }
        
        .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: hsl(142.1 76.2% 36.3%);
            color: hsl(0 0% 98%);
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            animation: pulse 2s infinite;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: hsl(0 0% 98%);
            border-radius: 50%;
            animation: blink 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .stat-card {
            background: hsl(0 0% 14.9%);
            border: 1px solid hsl(0 0% 20%);
            border-radius: 8px;
            padding: 24px;
            transition: all 0.2s;
        }
        
        .stat-card:hover {
            border-color: hsl(0 0% 32%);
            background: hsl(0 0% 16%);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: hsl(0 0% 98%);
            margin-bottom: 8px;
        }
        
        .stat-label {
            color: hsl(0 0% 63.9%);
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .endpoint-group {
            margin-bottom: 48px;
        }
        
        .group-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .group-icon {
            width: 40px;
            height: 40px;
            background: hsl(0 0% 14.9%);
            border: 1px solid hsl(0 0% 20%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: hsl(0 0% 98%);
            font-weight: 600;
            font-size: 1.125rem;
        }
        
        .group-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: hsl(0 0% 98%);
        }
        
        .endpoints-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .endpoint {
            background: hsl(0 0% 14.9%);
            border: 1px solid hsl(0 0% 20%);
            border-radius: 8px;
            padding: 20px;
            transition: all 0.2s;
            cursor: pointer;
        }
        
        .endpoint:hover {
            border-color: hsl(0 0% 32%);
            background: hsl(0 0% 16%);
            transform: translateY(-2px);
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
            padding: 4px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
            min-width: 60px;
            justify-content: center;
            text-transform: uppercase;
        }
        
        .method.get {
            background: hsl(142.1 70.6% 45.3% / 0.15);
            color: hsl(142.1 76.2% 36.3%);
            border: 1px solid hsl(142.1 76.2% 36.3% / 0.3);
        }
        
        .method.post {
            background: hsl(221.2 83.2% 53.3% / 0.15);
            color: hsl(217.2 91.2% 59.8%);
            border: 1px solid hsl(217.2 91.2% 59.8% / 0.3);
        }
        
        .method.put {
            background: hsl(24.6 95% 53.1% / 0.15);
            color: hsl(20.5 90.2% 48.2%);
            border: 1px solid hsl(20.5 90.2% 48.2% / 0.3);
        }
        
        .method.delete {
            background: hsl(0 72.2% 50.6% / 0.15);
            color: hsl(0 84.2% 60.2%);
            border: 1px solid hsl(0 84.2% 60.2% / 0.3);
        }
        
        .path {
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.95rem;
            color: hsl(0 0% 98%);
            font-weight: 500;
        }
        
        .description {
            color: hsl(0 0% 63.9%);
            font-size: 0.875rem;
            margin-bottom: 12px;
        }
        
        .auth-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 500;
            background: hsl(0 0% 20%);
            color: hsl(0 0% 80%);
            border: 1px solid hsl(0 0% 25%);
        }
        
        .auth-badge.public {
            background: hsl(142.1 70.6% 45.3% / 0.15);
            color: hsl(142.1 76.2% 36.3%);
            border: 1px solid hsl(142.1 76.2% 36.3% / 0.3);
        }
        
        .footer {
            margin-top: 64px;
            padding-top: 32px;
            border-top: 1px solid hsl(0 0% 14.9%);
            text-align: center;
            color: hsl(0 0% 63.9%);
            font-size: 0.875rem;
        }
        
        .footer-links {
            margin-top: 16px;
            display: flex;
            gap: 24px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .footer a {
            color: hsl(0 0% 98%);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
        }
        
        .footer a:hover {
            color: hsl(0 0% 80%);
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
            
            .endpoint-header {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="title-section">
                    <h1>Express API Server</h1>
                    <p>Vehicle Rental Management System</p>
                </div>
                <div class="status">
                    <span class="status-dot"></span>
                    Server Running
                </div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${endpoints.reduce(
                  (acc, group) => acc + group.routes.length,
                  0
                )}</div>
                <div class="stat-label">Total Endpoints</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${endpoints.length}</div>
                <div class="stat-label">API Groups</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">v1</div>
                <div class="stat-label">API Version</div>
            </div>
        </div>
        
        ${endpoints
          .map(
            (group, index) => `
            <div class="endpoint-group">
                <div class="group-header">
                    <div class="group-icon">${index + 1}</div>
                    <h2 class="group-title">${group.group}</h2>
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
            <p>Built with Express.js & TypeScript</p>
            <p style="margin-top: 12px;">Developed by <a href="https://tariqul.dev" target="_blank">Tariqul Islam</a></p>
            <div class="footer-links">
                <a href="https://github.com/tariqul420/express-server.git" target="_blank">GitHub Repository</a>
                <span style="color: hsl(0 0% 32%);">•</span>
                <a href="https://expressjs.com/" target="_blank">Express Documentation</a>
                <span style="color: hsl(0 0% 32%);">•</span>
                <a href="https://www.typescriptlang.org/" target="_blank">TypeScript Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
