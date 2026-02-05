import { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  hobbies: string[];
  skills: string[];
  profilePicture: string;
}

interface UserData {
  isAuthenticated: boolean;
  userType: 'student' | 'job-seeker' | null;
  profile: UserProfile;
  syllabus: {
    fileName: string;
    content: string;
  } | null;
  resume: {
    fileName: string;
    content: string;
  } | null;
  studentSkills: string[];
  studentSyllabus: string[];
  studentResume: string;
  jobSeekerSkills: string[];
  jobSeekerResume: string;
  marks10th: string;
  marks12th: string;
  linkedinProfile: string;
  githubLink: string;
}

interface UserContextType {
  userData: UserData;
  updateProfile: (profile: Partial<UserProfile>) => void;
  login: (email: string, password: string, userType: 'student' | 'job-seeker') => void;
  signup: (email: string, password: string, name: string, userType: 'student' | 'job-seeker') => void;
  loginWithGoogle: (userType: 'student' | 'job-seeker') => void;
  logout: () => void;
  uploadSyllabus: (fileName: string, content: string) => void;
  uploadResume: (fileName: string, content: string) => void;
  updateStudentSkills: (skills: string[]) => void;
  updateStudentSyllabus: (syllabus: string[]) => void;
  updateStudentResume: (resume: string) => void;
  updateJobSeekerSkills: (skills: string[]) => void;
  updateJobSeekerResume: (resume: string) => void;
  updateJobSeekerDetails: (details: {
    marks10th?: string;
    marks12th?: string;
    linkedinProfile?: string;
    githubLink?: string;
  }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    isAuthenticated: false,
    userType: null,
    profile: {
      name: '',
      email: '',
      hobbies: [],
      skills: [],
      profilePicture: '',
    },
    syllabus: null,
    resume: null,
    studentSkills: [],
    studentSyllabus: [],
    studentResume: '',
    jobSeekerSkills: [],
    jobSeekerResume: '',
    marks10th: '',
    marks12th: '',
    linkedinProfile: '',
    githubLink: '',
  });

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile },
    }));
  };

  const login = (email: string, password: string, userType: 'student' | 'job-seeker') => {
    setUserData((prev) => ({
      ...prev,
      isAuthenticated: true,
      userType,
      profile: {
        ...prev.profile,
        email,
        name: email.split('@')[0],
      },
    }));
  };

  const signup = (email: string, password: string, name: string, userType: 'student' | 'job-seeker') => {
    setUserData((prev) => ({
      ...prev,
      isAuthenticated: true,
      userType,
      profile: {
        ...prev.profile,
        email,
        name,
      },
    }));
  };

  const loginWithGoogle = (userType: 'student' | 'job-seeker') => {
    setUserData((prev) => ({
      ...prev,
      isAuthenticated: true,
      userType,
      profile: {
        ...prev.profile,
        email: 'user@gmail.com',
        name: 'Demo User',
      },
    }));
  };

  const logout = () => {
    setUserData({
      isAuthenticated: false,
      userType: null,
      profile: {
        name: '',
        email: '',
        hobbies: [],
        skills: [],
        profilePicture: '',
      },
      syllabus: null,
      resume: null,
      studentSkills: [],
      studentSyllabus: [],
      studentResume: '',
      jobSeekerSkills: [],
      jobSeekerResume: '',
      marks10th: '',
      marks12th: '',
      linkedinProfile: '',
      githubLink: '',
    });
  };

  const uploadSyllabus = (fileName: string, content: string) => {
    setUserData((prev) => ({
      ...prev,
      syllabus: { fileName, content },
    }));
  };

  const uploadResume = (fileName: string, content: string) => {
    setUserData((prev) => ({
      ...prev,
      resume: { fileName, content },
    }));
  };

  const updateStudentSkills = (skills: string[]) => {
    setUserData((prev) => ({
      ...prev,
      studentSkills: skills,
    }));
  };

  const updateStudentSyllabus = (syllabus: string[]) => {
    setUserData((prev) => ({
      ...prev,
      studentSyllabus: syllabus,
    }));
  };

  const updateStudentResume = (resume: string) => {
    setUserData((prev) => ({
      ...prev,
      studentResume: resume,
    }));
  };

  const updateJobSeekerSkills = (skills: string[]) => {
    setUserData((prev) => ({
      ...prev,
      jobSeekerSkills: skills,
    }));
  };

  const updateJobSeekerResume = (resume: string) => {
    setUserData((prev) => ({
      ...prev,
      jobSeekerResume: resume,
    }));
  };

  const updateJobSeekerDetails = (details: {
    marks10th?: string;
    marks12th?: string;
    linkedinProfile?: string;
    githubLink?: string;
  }) => {
    setUserData((prev) => ({
      ...prev,
      ...details,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        updateProfile,
        login,
        signup,
        loginWithGoogle,
        logout,
        uploadSyllabus,
        uploadResume,
        updateStudentSkills,
        updateStudentSyllabus,
        updateStudentResume,
        updateJobSeekerSkills,
        updateJobSeekerResume,
        updateJobSeekerDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
