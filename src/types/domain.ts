export type UserRole = 'customer' | 'fashioneer';

export type JobStatus =
  | 'pending'
  | 'in_progress'
  | 'ready_for_fitting'
  | 'completed';

export type SewRequestStatus = 'open' | 'matched' | 'closed';

export interface UserProfile {
  id: string;
  name: string;
  location: string;
  avatarUrl?: string;
  rating?: number;
}

export interface CustomerProfile extends UserProfile {
  measurementCode?: string;
}

export interface FashioneerProfile extends UserProfile {
  specialties?: string[];
  serviceInfo?: string;
  verified?: boolean;
}

export interface MeasurementRecord {
  id: string;
  label: string;
  values: Record<string, string | number>;
  updatedAt: string;
  code?: string;
  photoUrl?: string;
}

export interface DesignItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  sewedCount?: number;
  audience?: 'men' | 'women' | 'kids' | 'unisex';
  location?: string;
  category?: string;
  sizes?: string[];
  tag?: string;
  description?: string;
  images?: string[];
  isBookmarked?: boolean;
  designerName?: string;
}

export interface SewRequest {
  id: string;
  title: string;
  notes?: string;
  images?: string[];
  attachedDesignIds?: string[];
  attachedFabricId?: string;
  attachedFabricTag?: string;
  attachedFabricImage?: string;
  fabricIntent?: 'market_purchase' | 'fashioneer_source' | 'customer_upload' | 'none';
  fabric?: string;
  color?: string;
  occasion?: string;
  budgetMin?: number;
  budgetMax?: number;
  status: SewRequestStatus;
  createdAt: string;
  location?: string;
}

export interface Job {
  id: string;
  title: string;
  status: JobStatus;
  startDate?: string;
  dueDate?: string;
  hardStopDate?: string;
  progress?: number;
  customerName?: string;
  fashioneerName?: string;
  selectedBidId?: string;
  seweeId?: string;
  fashioneerId?: string;
  durationDays?: number;
  endDate?: string;
  progressUpdates?: ProgressUpdate[];
}

export interface MeasurementCodeLookup {
  code: string;
  values: Record<string, string | number>;
  photoUrl?: string;
}

export interface FabricItem {
  id: string;
  name: string;
  tag: string;
  imageUrl?: string;
  pricePerUnit?: number;
  tags?: string[];
  description?: string;
}

export interface Bid {
  id: string;
  requestId: string;
  fashioneerId: string;
  fashioneerName: string;
  amount: number;
  durationDays: number;
  message?: string;
  createdAt: string;
  viewedBySewee?: boolean;
}

export type NotificationType =
  | 'BID_VIEWED'
  | 'BID_ACCEPTED'
  | 'JOB_STATUS_UPDATED'
  | 'EXTENSION_REQUESTED';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
  meta?: Record<string, string>;
}

export type ActivityType =
  | 'REQUEST_CREATED'
  | 'DESIGN_ATTACHED'
  | 'DESIGN_REMOVED'
  | 'FABRIC_ATTACHED'
  | 'BID_RECEIVED'
  | 'BID_VIEWED'
  | 'BID_ACCEPTED'
  | 'JOB_PROGRESS_UPDATED'
  | 'JOB_COMPLETED';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  createdAt: string;
  icon?: string;
  meta?: Record<string, string>;
}

export interface ProgressUpdate {
  id: string;
  jobId: string;
  preset: string;
  note?: string;
  photos?: string[];
  createdAt: string;
}
