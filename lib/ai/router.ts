// lib/ai/router.ts — Task-Specific AI Routing and Model Resolution

import 'server-only';
import { prisma } from '@/lib/prisma';
import type { AITaskId, AITaskRouteConfig } from './types';

const DEFAULT_ROUTES: Record<AITaskId, AITaskRouteConfig> = {
  'ask-kunwar': {
    taskKey: 'ask-kunwar',
    name: 'Ask Kunwar Platform Assistant',
    description: 'General intelligence, navigation, and contextual Q&A across the terminal',
    primaryProvider: 'gemini',
    primaryModel: 'gemini-2.0-flash',
    fallbackProvider: 'groq',
    fallbackModel: 'llama-3.3-70b-versatile',
    enabled: true,
    temperature: 0.2,
    maxTokens: 800,
  },
  'company-intelligence': {
    taskKey: 'company-intelligence',
    name: 'Company Intelligence & Fundamental Analyst',
    description: 'Financial statement analysis, ratios, valuation commentary and health scoring',
    primaryProvider: 'gemini',
    primaryModel: 'gemini-2.0-flash',
    fallbackProvider: 'groq',
    fallbackModel: 'llama-3.3-70b-versatile',
    enabled: true,
    temperature: 0.1,
    maxTokens: 1200,
  },
  'placement': {
    taskKey: 'placement',
    name: 'Placement Day War Room Evaluator & Coach',
    description: 'Rubric-based interview scoring, mock interviewer dialogue, career coach guidance',
    primaryProvider: 'gemini',
    primaryModel: 'gemini-2.0-flash',
    fallbackProvider: 'groq',
    fallbackModel: 'llama-3.3-70b-versatile',
    enabled: true,
    temperature: 0.2,
    maxTokens: 1000,
  },
  'research': {
    taskKey: 'research',
    name: 'Research Intelligence Synthesis',
    description: 'Deep financial research report summaries, macro analysis, case study synthesis',
    primaryProvider: 'gemini',
    primaryModel: 'gemini-2.0-flash',
    fallbackProvider: 'groq',
    fallbackModel: 'llama-3.3-70b-versatile',
    enabled: true,
    temperature: 0.2,
    maxTokens: 1500,
  },
  'learning': {
    taskKey: 'learning',
    name: 'Finance Learning & PGDM Assistant',
    description: 'Concept explanations, formula walk-throughs, study guides, and quiz feedback',
    primaryProvider: 'gemini',
    primaryModel: 'gemini-2.0-flash',
    fallbackProvider: 'groq',
    fallbackModel: 'llama-3.3-70b-versatile',
    enabled: true,
    temperature: 0.2,
    maxTokens: 900,
  },
};

export class AIRouter {
  async getRoute(taskKey: AITaskId): Promise<AITaskRouteConfig> {
    try {
      const dbRoute = await prisma.aITaskRoute.findUnique({
        where: { taskKey },
      });

      if (dbRoute) {
        return {
          taskKey: dbRoute.taskKey as AITaskId,
          name: dbRoute.name,
          description: dbRoute.description || undefined,
          primaryProvider: dbRoute.primaryProvider as 'gemini' | 'groq',
          primaryModel: dbRoute.primaryModel,
          fallbackProvider: (dbRoute.fallbackProvider as 'gemini' | 'groq') || null,
          fallbackModel: dbRoute.fallbackModel || null,
          enabled: dbRoute.enabled,
          temperature: dbRoute.temperature,
          maxTokens: dbRoute.maxTokens,
        };
      }
    } catch {
      // If table query fails, use memory default
    }

    return DEFAULT_ROUTES[taskKey] || DEFAULT_ROUTES['ask-kunwar'];
  }

  async getAllRoutes(): Promise<AITaskRouteConfig[]> {
    try {
      const dbRoutes = await prisma.aITaskRoute.findMany();
      if (dbRoutes.length > 0) {
        return dbRoutes.map((r) => ({
          taskKey: r.taskKey as AITaskId,
          name: r.name,
          description: r.description || undefined,
          primaryProvider: r.primaryProvider as 'gemini' | 'groq',
          primaryModel: r.primaryModel,
          fallbackProvider: (r.fallbackProvider as 'gemini' | 'groq') || null,
          fallbackModel: r.fallbackModel || null,
          enabled: r.enabled,
          temperature: r.temperature,
          maxTokens: r.maxTokens,
        }));
      }
    } catch {
      // ignore
    }

    return Object.values(DEFAULT_ROUTES);
  }

  async updateRoute(
    taskKey: AITaskId,
    updates: Partial<AITaskRouteConfig>
  ): Promise<AITaskRouteConfig> {
    const defaultRoute = DEFAULT_ROUTES[taskKey] || DEFAULT_ROUTES['ask-kunwar'];

    const upserted = await prisma.aITaskRoute.upsert({
      where: { taskKey },
      create: {
        taskKey,
        name: updates.name || defaultRoute.name,
        description: updates.description || defaultRoute.description,
        primaryProvider: updates.primaryProvider || defaultRoute.primaryProvider,
        primaryModel: updates.primaryModel || defaultRoute.primaryModel,
        fallbackProvider: updates.fallbackProvider !== undefined ? updates.fallbackProvider : defaultRoute.fallbackProvider,
        fallbackModel: updates.fallbackModel !== undefined ? updates.fallbackModel : defaultRoute.fallbackModel,
        enabled: updates.enabled !== undefined ? updates.enabled : defaultRoute.enabled,
        temperature: updates.temperature ?? defaultRoute.temperature,
        maxTokens: updates.maxTokens ?? defaultRoute.maxTokens,
      },
      update: {
        ...(updates.primaryProvider ? { primaryProvider: updates.primaryProvider } : {}),
        ...(updates.primaryModel ? { primaryModel: updates.primaryModel } : {}),
        ...(updates.fallbackProvider !== undefined ? { fallbackProvider: updates.fallbackProvider } : {}),
        ...(updates.fallbackModel !== undefined ? { fallbackModel: updates.fallbackModel } : {}),
        ...(updates.enabled !== undefined ? { enabled: updates.enabled } : {}),
        ...(updates.temperature !== undefined ? { temperature: updates.temperature } : {}),
        ...(updates.maxTokens !== undefined ? { maxTokens: updates.maxTokens } : {}),
      },
    });

    return {
      taskKey: upserted.taskKey as AITaskId,
      name: upserted.name,
      description: upserted.description || undefined,
      primaryProvider: upserted.primaryProvider as 'gemini' | 'groq',
      primaryModel: upserted.primaryModel,
      fallbackProvider: (upserted.fallbackProvider as 'gemini' | 'groq') || null,
      fallbackModel: upserted.fallbackModel || null,
      enabled: upserted.enabled,
      temperature: upserted.temperature,
      maxTokens: upserted.maxTokens,
    };
  }
}

export const aiRouter = new AIRouter();

