import { LearnerGender } from "./gender-enum";

export interface LearnerPayload {
    id: string;
    name: string | null;
    email: string;
    phone: string;
    gender: LearnerGender | null;
    imageUrl: string | null;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
}