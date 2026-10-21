import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IChildrenByFather {
  id?: number;
  fatherId?: string;
  childId?: string;
  motherId?: string | null;
  firstName?: string;
  lastName?: string;
  gender?: keyof typeof Gender | null;
  dob?: any | null;
}

export const defaultValue: Readonly<IChildrenByFather> = {};
