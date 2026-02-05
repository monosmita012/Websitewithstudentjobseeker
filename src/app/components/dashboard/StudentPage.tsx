import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Map, Lightbulb, Video, Briefcase, Plus, Edit2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useUser } from '../../context/UserContext';
import { toast } from 'sonner';

export default function StudentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateStudentSkills, updateStudentSyllabus, updateStudentResume } = useUser();
  const [newSkill, setNewSkill] = useState('');
  const [newSyllabusItem, setNewSyllabusItem] = useState('');
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resumeText, setResumeText] = useState(userData.studentResume);

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...userData.studentSkills, newSkill.trim()];
      updateStudentSkills(updatedSkills);
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const addSyllabusItem = () => {
    if (newSyllabusItem.trim()) {
      const updatedSyllabus = [...userData.studentSyllabus, newSyllabusItem.trim()];
      updateStudentSyllabus(updatedSyllabus);
      setNewSyllabusItem('');
      toast.success('Syllabus item added!');
    }
  };

  const saveResume = () => {
    updateStudentResume(resumeText);
    setIsEditingResume(false);
    toast.success('Resume updated!');
  };

  // Show overview if on main student page
  if (location.pathname === '/dashboard/student') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your learning journey and career preparation
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Skills</h2>
          <div className="mb-4">
            {userData.studentSkills.length > 0 || userData.profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {[...userData.profile.skills, ...userData.studentSkills].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-4">No skills added yet</p>
            )}
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., Python, React, Data Analysis)"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Syllabus Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Syllabus Topics</h2>
          <div className="mb-4">
            {userData.studentSyllabus.length > 0 ? (
              <div className="space-y-2 mb-4">
                {userData.studentSyllabus.map((topic, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <p className="text-gray-900 dark:text-white">{topic}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {userData.syllabus
                  ? 'Click "Add" to extract topics from your uploaded syllabus'
                  : 'Upload a syllabus in the Syllabus section first'}
              </p>
            )}
            <div className="flex gap-2">
              <Input
                value={newSyllabusItem}
                onChange={(e) => setNewSyllabusItem(e.target.value)}
                placeholder="Add a syllabus topic (e.g., Machine Learning, Database Systems)"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && addSyllabusItem()}
              />
              <Button onClick={addSyllabusItem} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resume Summary</h2>
            {!isEditingResume && (
              <Button
                onClick={() => {
                  setIsEditingResume(true);
                  setResumeText(userData.studentResume || userData.resume?.content || '');
                }}
                variant="outline"
                size="sm"
                className="border-2"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          {isEditingResume ? (
            <div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Enter your resume summary or key points"
                className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={saveResume} className="bg-green-600 hover:bg-green-700">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingResume(false);
                    setResumeText(userData.studentResume);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {userData.studentResume || userData.resume ? (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {userData.studentResume || userData.resume?.content}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No resume added yet. Upload one in the Resume section or add it here.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/dashboard/student/roadmap')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Map className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Roadmap</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get your personalized learning path
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/student/recommendations')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Technology and skill suggestions
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/student/videos')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Learning Videos</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Curated educational content
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/student/internships')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Internships</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Find relevant opportunities
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/internships" element={<InternshipsPage />} />
    </Routes>
  );
}

// Sub-pages
function RoadmapPage() {
  const navigate = useNavigate();
  const { userData } = useUser();

  const roadmapSteps = [
    {
      phase: 'Phase 1: Foundation',
      duration: '2-3 months',
      topics: ['Core Programming Fundamentals', 'Data Structures & Algorithms', 'Version Control (Git)'],
      color: 'blue',
    },
    {
      phase: 'Phase 2: Web Development',
      duration: '3-4 months',
      topics: ['HTML, CSS, JavaScript', 'React.js', 'RESTful APIs', 'Database Basics'],
      color: 'purple',
    },
    {
      phase: 'Phase 3: Backend Development',
      duration: '2-3 months',
      topics: ['Java/Python Backend', 'Spring Boot/Django', 'Database Design', 'Authentication & Security'],
      color: 'green',
    },
    {
      phase: 'Phase 4: Advanced Topics',
      duration: '2-3 months',
      topics: ['Cloud Services (AWS/Azure)', 'Docker & CI/CD', 'System Design', 'Testing & Debugging'],
      color: 'orange',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/student')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Student Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Learning Roadmap</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Based on your skills: {userData.profile.skills.join(', ') || 'No skills added yet'}
        </p>
      </div>

      <div className="space-y-6">
        {roadmapSteps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-gray-200 dark:border-gray-700 transition-colors duration-300"
            style={{
              borderLeftColor: step.color === 'blue' ? '#3b82f6' : 
                               step.color === 'purple' ? '#9333ea' :
                               step.color === 'green' ? '#10b981' : '#f97316'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{step.phase}</h2>
                <p className="text-gray-600 dark:text-gray-300">Duration: {step.duration}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                step.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                step.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                step.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
              }`}>
                Step {index + 1}
              </span>
            </div>
            <ul className="space-y-2">
              {step.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    step.color === 'blue' ? 'bg-blue-600' :
                    step.color === 'purple' ? 'bg-purple-600' :
                    step.color === 'green' ? 'bg-green-600' : 'bg-orange-600'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsPage() {
  const navigate = useNavigate();

  const recommendations = [
    {
      category: 'Frontend Development',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      reason: 'Essential for modern web development',
      color: 'blue',
    },
    {
      category: 'Backend Development',
      technologies: ['Node.js', 'Express.js', 'Spring Boot', 'Django'],
      reason: 'Build robust server-side applications',
      color: 'green',
    },
    {
      category: 'Databases',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
      reason: 'Master data storage and retrieval',
      color: 'purple',
    },
    {
      category: 'DevOps & Cloud',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      reason: 'Deploy and scale applications',
      color: 'orange',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/student')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Student Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Technology Recommendations</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Technologies you should learn to enhance your skill set
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{rec.category}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{rec.reason}</p>
            <div className="flex flex-wrap gap-2">
              {rec.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rec.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                    rec.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                    rec.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                    'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosPage() {
  const navigate = useNavigate();

  const videos = [
    {
      title: 'React.js Complete Course for Beginners',
      channel: 'freeCodeCamp',
      duration: '11:48:24',
      views: '2.3M views',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      topic: 'React',
    },
    {
      title: 'Java Full Course',
      channel: 'Programming with Mosh',
      duration: '8:45:12',
      views: '1.8M views',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      topic: 'Java',
    },
    {
      title: 'Python for Everybody',
      channel: 'freeCodeCamp',
      duration: '13:24:16',
      views: '3.2M views',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      topic: 'Python',
    },
    {
      title: 'Node.js and Express.js Course',
      channel: 'Traversy Media',
      duration: '6:18:21',
      views: '985K views',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      topic: 'Backend',
    },
    {
      title: 'Database Design Tutorial',
      channel: 'freeCodeCamp',
      duration: '4:32:11',
      views: '756K views',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
      topic: 'Database',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      channel: 'freeCodeCamp',
      duration: '12:14:38',
      views: '1.1M views',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      topic: 'Cloud',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/student')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Student Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Videos</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Curated educational videos from top YouTube channels
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <ImageWithFallback
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{video.channel}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{video.views}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                {video.topic}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InternshipsPage() {
  const navigate = useNavigate();

  const internships = [
    {
      company: 'Google',
      role: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      duration: 'Summer 2026',
      stipend: '$8,000/month',
      skills: ['Python', 'Java', 'Data Structures'],
      color: 'blue',
    },
    {
      company: 'Microsoft',
      role: 'Product Management Intern',
      location: 'Redmond, WA',
      duration: '3-6 months',
      stipend: '$7,500/month',
      skills: ['Product Strategy', 'Analytics', 'Communication'],
      color: 'green',
    },
    {
      company: 'Amazon',
      role: 'Full Stack Developer Intern',
      location: 'Seattle, WA',
      duration: 'Summer 2026',
      stipend: '$7,800/month',
      skills: ['React', 'Node.js', 'AWS'],
      color: 'orange',
    },
    {
      company: 'Meta',
      role: 'Data Science Intern',
      location: 'Menlo Park, CA',
      duration: '12 weeks',
      stipend: '$8,200/month',
      skills: ['Python', 'Machine Learning', 'Statistics'],
      color: 'purple',
    },
    {
      company: 'Netflix',
      role: 'UI/UX Design Intern',
      location: 'Los Gatos, CA',
      duration: 'Summer 2026',
      stipend: '$7,000/month',
      skills: ['Figma', 'User Research', 'Prototyping'],
      color: 'red',
    },
    {
      company: 'Salesforce',
      role: 'Cloud Engineering Intern',
      location: 'San Francisco, CA',
      duration: '3 months',
      stipend: '$7,200/month',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      color: 'teal',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/student')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Student Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Internship Opportunities</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Internships matching your skills and interests
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {internships.map((internship, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{internship.company}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">{internship.role}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                internship.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                internship.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                internship.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                internship.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                internship.color === 'red' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300'
              }`}>
                {internship.duration}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">📍 {internship.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">💰 {internship.stipend}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Apply Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
