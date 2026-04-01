import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardState } from '@/types';

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
