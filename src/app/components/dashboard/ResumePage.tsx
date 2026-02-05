import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useUser } from '../../context/UserContext';
import { toast } from 'sonner';

export default function ResumePage() {
  const { userData, uploadResume } = useUser();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      uploadResume(file.name, content);
      toast.success('Resume uploaded successfully!');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Resume</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload your resume to get personalized job recommendations and career insights
        </p>
      </div>

      {userData.resume ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resume Uploaded</h2>
              <p className="text-gray-600 dark:text-gray-300">{userData.resume.fileName}</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono text-sm">
              {userData.resume.content}
            </p>
          </div>
          <Button
            onClick={() => document.getElementById('resume-upload')?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload New Resume
          </Button>
          <input
            id="resume-upload"
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          <div className="text-center">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mx-auto mb-6">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Upload Your Resume</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Drag and drop your file here, or click to browse
            </p>
            <Button
              onClick={() => document.getElementById('resume-upload')?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            <input
              id="resume-upload"
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Supported formats: TXT, PDF, DOC, DOCX
            </p>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-colors duration-300">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Why upload your resume?
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
            <span>Get matched with job roles that fit your experience and skills</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
            <span>Discover companies actively hiring for your skill set</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
            <span>Receive personalized recommendations for career advancement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
            <span>Identify skill gaps and get suggestions for improvement</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
