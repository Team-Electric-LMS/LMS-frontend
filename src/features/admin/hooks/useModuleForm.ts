import { useState } from 'react';
import { IModule } from '../types/modules';
import { createCourseModule, updateCourseModule } from '../api/modules';

export function useModuleForm(courseId: string, token: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdModule, setCreatedModule] = useState<IModule | null>(null);
  const [updatedModule, setUpdatedModule] = useState<IModule | null>(null);

  async function createModule(moduleData: Partial<IModule>) {
    setLoading(true);
    setError(null);
    try {
      const module = await createCourseModule(courseId, moduleData, token);
      setCreatedModule(module);
      return module;
    } catch (err: any) {
      setError(err.message || 'Failed to create module');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateModule(moduleId: string, moduleData: Partial<IModule>) {
    setLoading(true);
    setError(null);
    try {
      const module = await updateCourseModule(moduleId, moduleData, token);
      setUpdatedModule(module);
      return module;
    } catch (err: any) {
      setError(err.message || 'Failed to update module');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createModule, updateModule, createdModule, updatedModule, loading, error };
}
