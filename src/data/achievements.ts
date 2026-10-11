import { certificates } from './certificates';

// Recognition is a view of the canonical credential data, not a second record set.
export const achievements = certificates.filter(credential =>
  credential.category === 'Academic Commendations' || credential.category === 'Organisational Recognition',
);

export type AchievementRecord = (typeof achievements)[number];
