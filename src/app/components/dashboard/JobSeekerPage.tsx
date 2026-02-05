import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Building2, Lightbulb, Plus, Edit2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useUser } from '../../context/UserContext';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function JobSeekerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateJobSeekerSkills, updateJobSeekerResume, updateJobSeekerDetails } = useUser();
  const [newSkill, setNewSkill] = useState('');
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resumeText, setResumeText] = useState(userData.jobSeekerResume);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [details, setDetails] = useState({
    marks10th: userData.marks10th,
    marks12th: userData.marks12th,
    linkedinProfile: userData.linkedinProfile,
    githubLink: userData.githubLink,
  });

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...userData.jobSeekerSkills, newSkill.trim()];
      updateJobSeekerSkills(updatedSkills);
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const saveResume = () => {
    updateJobSeekerResume(resumeText);
    setIsEditingResume(false);
    toast.success('Resume updated!');
  };

  const saveDetails = () => {
    updateJobSeekerDetails(details);
    setIsEditingDetails(false);
    toast.success('Details updated!');
  };

  if (location.pathname === '/dashboard/job-seeker') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Job Seeker Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find the perfect job that matches your skills and aspirations
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Skills</h2>
          <div className="mb-4">
            {userData.jobSeekerSkills.length > 0 || userData.profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {[...userData.profile.skills, ...userData.jobSeekerSkills].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium shadow-sm"
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
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} className="bg-green-600 hover:bg-green-700">
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
                  setResumeText(userData.jobSeekerResume || userData.resume?.content || '');
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
                placeholder="Enter your resume summary or key achievements"
                className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={saveResume} className="bg-green-600 hover:bg-green-700">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingResume(false);
                    setResumeText(userData.jobSeekerResume);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {userData.jobSeekerResume || userData.resume ? (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {userData.jobSeekerResume || userData.resume?.content}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No resume added yet. Upload one in the Resume section or add it here.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Academic & Professional Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Academic & Professional Details</h2>
            {!isEditingDetails && (
              <Button
                onClick={() => setIsEditingDetails(true)}
                variant="outline"
                size="sm"
                className="border-2"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          {isEditingDetails ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">10th Grade Marks (%)</Label>
                  <Input
                    type="text"
                    value={details.marks10th}
                    onChange={(e) => setDetails({ ...details, marks10th: e.target.value })}
                    placeholder="e.g., 85%"
                    className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">12th Grade Marks (%)</Label>
                  <Input
                    type="text"
                    value={details.marks12th}
                    onChange={(e) => setDetails({ ...details, marks12th: e.target.value })}
                    placeholder="e.g., 90%"
                    className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300">LinkedIn Profile</Label>
                <Input
                  type="url"
                  value={details.linkedinProfile}
                  onChange={(e) => setDetails({ ...details, linkedinProfile: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300">GitHub Profile</Label>
                <Input
                  type="url"
                  value={details.githubLink}
                  onChange={(e) => setDetails({ ...details, githubLink: e.target.value })}
                  placeholder="https://github.com/yourusername"
                  className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveDetails} className="bg-green-600 hover:bg-green-700">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingDetails(false);
                    setDetails({
                      marks10th: userData.marks10th,
                      marks12th: userData.marks12th,
                      linkedinProfile: userData.linkedinProfile,
                      githubLink: userData.githubLink,
                    });
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">10th Grade Marks</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userData.marks10th || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">12th Grade Marks</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {userData.marks12th || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">LinkedIn Profile</p>
                {userData.linkedinProfile ? (
                  <a
                    href={userData.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Not provided</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GitHub Profile</p>
                {userData.githubLink ? (
                  <a
                    href={userData.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Not provided</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/dashboard/job-seeker/job-roles')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Job Roles</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover roles matching your skills
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/job-seeker/companies')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Companies</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Companies hiring for your skills
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard/job-seeker/recommendations')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group"
          >
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Skills to enhance your career
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/job-roles" element={<JobRolesPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/recommendations" element={<JobRecommendationsPage />} />
    </Routes>
  );
}

// Sub-pages
function JobRolesPage() {
  const navigate = useNavigate();

  const jobRoles = [
    {
      title: 'Full Stack Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      posted: '2 days ago',
      color: 'blue',
    },
    {
      title: 'Frontend Engineer',
      company: 'DesignHub',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $150k',
      skills: ['React', 'TypeScript', 'CSS', 'Figma'],
      posted: '1 week ago',
      color: 'purple',
    },
    {
      title: 'Backend Developer',
      company: 'DataSystems Inc',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110k - $160k',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
      posted: '3 days ago',
      color: 'green',
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudNative',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $190k',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      posted: '5 days ago',
      color: 'orange',
    },
    {
      title: 'Mobile App Developer',
      company: 'AppStudio',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$115k - $170k',
      skills: ['React Native', 'iOS', 'Android', 'JavaScript'],
      posted: '1 day ago',
      color: 'teal',
    },
    {
      title: 'Data Engineer',
      company: 'Analytics Pro',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$125k - $185k',
      skills: ['Python', 'Spark', 'SQL', 'Airflow'],
      posted: '4 days ago',
      color: 'indigo',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/job-seeker')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Job Seeker Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recommended Job Roles</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Positions that match your skill set and experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {jobRoles.map((job, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                job.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                job.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                job.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                job.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                job.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' :
                'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
              }`}>
                {job.type}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">📍 {job.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">💰 {job.salary}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Posted {job.posted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Apply Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompaniesPage() {
  const navigate = useNavigate();

  const companies = [
    {
      name: 'Google',
      openings: 156,
      industry: 'Technology',
      size: '10,000+',
      description: 'Leading technology company specializing in internet services and products',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200',
      roles: ['Software Engineer', 'Product Manager', 'UX Designer'],
    },
    {
      name: 'Amazon',
      openings: 342,
      industry: 'E-commerce & Cloud',
      size: '10,000+',
      description: 'Global e-commerce and cloud computing leader',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200',
      roles: ['Full Stack Developer', 'DevOps Engineer', 'Data Scientist'],
    },
    {
      name: 'Microsoft',
      openings: 224,
      industry: 'Software',
      size: '10,000+',
      description: 'Multinational technology corporation producing software and hardware',
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=200',
      roles: ['Cloud Engineer', 'Security Analyst', 'AI Researcher'],
    },
    {
      name: 'Meta',
      openings: 89,
      industry: 'Social Media',
      size: '10,000+',
      description: 'Social technology company focusing on connecting people',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
      roles: ['Frontend Developer', 'ML Engineer', 'Mobile Developer'],
    },
    {
      name: 'Netflix',
      openings: 67,
      industry: 'Entertainment',
      size: '5,000 - 10,000',
      description: 'Streaming service offering movies, TV shows, and original content',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200',
      roles: ['Backend Engineer', 'Content Engineer', 'Platform Engineer'],
    },
    {
      name: 'Salesforce',
      openings: 145,
      industry: 'CRM Software',
      size: '10,000+',
      description: 'Cloud-based software company specializing in customer relationship management',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
      roles: ['Solutions Architect', 'Salesforce Developer', 'Technical Consultant'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/job-seeker')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Job Seeker Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Companies Hiring</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Top companies actively recruiting for your skills
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{company.industry}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{company.size} employees</p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                {company.openings} openings
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{company.description}</p>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Popular Roles:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {company.roles.map((role, roleIndex) => (
                  <span
                    key={roleIndex}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md">
              View All Jobs
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobRecommendationsPage() {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: 'Learn Cloud Computing',
      description: 'Master AWS, Azure, or Google Cloud to become a Cloud Solutions Architect',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Terraform'],
      potentialRole: 'Cloud Solutions Architect',
      salary: '$140k - $200k',
      demand: 'Very High',
      color: 'blue',
    },
    {
      title: 'Master Machine Learning',
      description: 'Dive into AI/ML to transition into high-demand data science roles',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics'],
      potentialRole: 'Machine Learning Engineer',
      salary: '$150k - $220k',
      demand: 'Extremely High',
      color: 'purple',
    },
    {
      title: 'Specialize in Cybersecurity',
      description: 'Become a security expert with certifications like CISSP or CEH',
      skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Cryptography'],
      potentialRole: 'Security Engineer',
      salary: '$130k - $190k',
      demand: 'Very High',
      color: 'red',
    },
    {
      title: 'Master Mobile Development',
      description: 'Build cross-platform apps and become a Mobile Development Expert',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      potentialRole: 'Senior Mobile Developer',
      salary: '$120k - $180k',
      demand: 'High',
      color: 'green',
    },
    {
      title: 'Learn Blockchain Technology',
      description: 'Enter the Web3 space with blockchain and smart contract development',
      skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js'],
      potentialRole: 'Blockchain Developer',
      salary: '$140k - $210k',
      demand: 'High',
      color: 'orange',
    },
    {
      title: 'Enhance with System Design',
      description: 'Master system design to qualify for senior and principal engineering roles',
      skills: ['Distributed Systems', 'Microservices', 'Scalability', 'Architecture'],
      potentialRole: 'Principal Engineer',
      salary: '$180k - $300k',
      demand: 'Very High',
      color: 'indigo',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        onClick={() => navigate('/dashboard/job-seeker')}
        variant="ghost"
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Job Seeker Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Career Recommendations</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Skills and pathways to advance your career
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{rec.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                rec.demand === 'Extremely High' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                rec.demand === 'Very High' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
              }`}>
                {rec.demand} Demand
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{rec.description}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Skills to Learn:</p>
              <div className="flex flex-wrap gap-2">
                {rec.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Potential Role:</p>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{rec.potentialRole}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">💰 {rec.salary}</p>
            </div>
            <Button className={`w-full text-white shadow-md ${
              rec.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
              rec.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
              rec.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
              rec.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
              rec.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
              'bg-indigo-600 hover:bg-indigo-700'
            }`}>
              Start Learning
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
