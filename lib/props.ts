export type AppliedStatus = "applying" | "success" | "already" | "resume_missing" | "error";


export interface ApplicationCardProps {
  application: {
    id: string;
    jobId: string;
    userId: string;
    coverLetter: string;
    phoneNumber: string;
    status?: string | null;
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
    resumeUrl?: string | null;
    resumeFileName?: string | null;
    resumeFileType?: string | null;
    isDeletedByUser: boolean;
    isDeletedByEmployer: boolean;
    appliedAt: string | Date;
    updatedAt: string | Date;

    job: {
      id: string;
      title: string;
      description: string;
      company: string;
      location: string;
      type: string;
      salary?: number | null;
      postedAt: string | Date;
      postedBy: {
        id: string;
        name?: string | null;
        image?: string | null;
      };
    };

    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    } ;
  };
}


export interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: number | null;
    description: string;
    postedAt: string | Date;
    postedById: string;
    isBlocked?: boolean;
    blockedAt?: Date | string | null;
    blockedReason?: string | null;
    postedBy?: {
      id?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    } | null;
  };
}

export interface User {
  name?: string | null,
  email?: string | null,
  image?: string | null,
}
