import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IChildrenByMother {
  id?: number;
  motherId?: string;
  childId?: string;
  fatherId?: string | null;
  firstName?: string;
  lastName?: string;
  gender?: keyof typeof Gender | null;
  dob?: any | null;
}

export const defaultValue: Readonly<IChildrenByMother> = {};
