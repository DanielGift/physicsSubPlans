import type { ComponentType } from 'react';
import type { ActivityId } from '../types';
import { AlienPhysics } from './alienPhysics';
import { ExperimentalDesign } from './experimentalDesign';
import { PhysicsCourt } from './physicsCourt';

export interface ActivityDefinition {
  id: ActivityId;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  Component: ComponentType;
}

// The home page renders from this list.
export const activityRegistry: ActivityDefinition[] = [
  {
    id: 'physics-court',
    title: 'Physics Court',
    shortDescription: 'Students argue whether a physics claim is always, sometimes, or never true.',
    estimatedMinutes: 80,
    Component: PhysicsCourt,
  },
  {
    id: 'alien-physics',
    title: 'Alien Physics',
    shortDescription: 'Students apply made-up laws from an alien world using reasoning skills they already have.',
    estimatedMinutes: 80,
    Component: AlienPhysics,
  },
  {
    id: 'experimental-design',
    title: 'Experimental Design',
    shortDescription: 'Students design — but never run — an experiment to measure something, under real restrictions.',
    estimatedMinutes: 80,
    Component: ExperimentalDesign,
  },
];

export function getActivity(id: string): ActivityDefinition | undefined {
  return activityRegistry.find((a) => a.id === id);
}
