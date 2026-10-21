import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IMember {
  id?: string;
  firstName?: string;
  lastName?: string;
  description?: string | null;
  gender?: keyof typeof Gender | null;
  dob?: any | null;
  imageUrl?: string | null;
}

export const defaultValue: Readonly<IMember> = {};
