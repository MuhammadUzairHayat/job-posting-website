// Shared types for Admin Panel
export interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  role?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  isBlocked: boolean;
  isHidden: boolean;
  blockedReason?: string | null;
  postedBy: {
    id: string;
    name: string | null;
    email: string;
  };
  _count: {
    applications: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  jobTitle: string | null;
  location: string | null;
  emailVerified: Date | null;
  isBlocked: boolean;
  blockedAt: Date | null;
  blockedReason: string | null;
  role: string;
  _count: {
    jobs: number;
    applications: number;
  };
  jobs?: Array<{
    id: string;
    title: string;
    company: string;
    postedAt: Date;
    isBlocked: boolean;
    isHidden: boolean;
    _count: {
      applications: number;
    };
  }>;
  applications?: Array<{
    id: string;
    appliedAt: Date;
    job: {
      id: string;
      title: string;
      company: string;
    };
  }>;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface PaginationResult<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
