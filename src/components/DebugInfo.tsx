import React from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const DebugInfo: React.FC = () => {
  const { projects, internships, certifications, achievements, loading, error } = useDatabase();
  const { user, isAuthenticated } = useAuth();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Error: {error || 'None'}</div>
        <div>Auth: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>User: {user?.email || 'None'}</div>
        <div>Projects: {projects.length}</div>
        <div>Internships: {internships.length}</div>
        <div>Certifications: {certifications.length}</div>
        <div>Achievements: {achievements.length}</div>
      </div>
    </div>
  );
};

export default DebugInfo;