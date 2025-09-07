import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Code, Database } from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with role-based access control and protected routes.',
    },
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, Node.js, Express, and PostgreSQL for scalability.',
    },
    {
      icon: <Database className="h-8 w-8 text-primary-600" />,
      title: 'Database Integration',
      description: 'Prisma ORM with PostgreSQL for robust data management and type safety.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Full-Stack TypeScript
            <span className="block text-primary-600">Boilerplate</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A production-ready boilerplate with React frontend and Node.js backend,
            featuring authentication, API documentation, and best practices.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/posts"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Explore Posts</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/register"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Production
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build scalable, maintainable applications
            with modern development practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-8 text-center space-y-4">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gray-100 -mx-4 px-4 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Tech Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React with TypeScript</li>
                <li>• Vite for fast development</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Router for navigation</li>
                <li>• Axios for API calls</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js with TypeScript</li>
                <li>• Express.js framework</li>
                <li>• PostgreSQL database</li>
                <li>• Prisma ORM</li>
                <li>• JWT authentication</li>
                <li>• Swagger documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your account and start exploring the features of this
            full-stack application boilerplate.
          </p>
        </div>
        
        <Link
          to="/register"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span>Sign Up Now</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};