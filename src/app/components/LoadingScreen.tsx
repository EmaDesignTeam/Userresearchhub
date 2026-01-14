import { Loader2, Database } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Database className="h-10 w-10 text-green-600" />
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading ResearchHub</h2>
        <p className="text-gray-600">Connecting to Supabase backend...</p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Powered by Supabase
        </div>
      </div>
    </div>
  );
}