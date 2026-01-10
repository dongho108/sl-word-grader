import { create } from 'zustand';
import { ExamSheetPage } from '../types';
import { examSheetStorage } from '../features/exam-sheet/services';

interface ExamSheetState {
  pages: ExamSheetPage[];
  selectedPageId: string | null;
  isLoading: boolean;
  hasExistingData: boolean;

  // Actions
  addPage: (page: ExamSheetPage) => void;
  removePage: (id: string) => void;
  replacePage: (id: string, newPage: ExamSheetPage) => void;
  selectPage: (id: string | null) => void;
  reorderPages: () => void;

  // Async actions
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  checkExistingData: () => Promise<boolean>;
  clearAll: () => void;
}

const generateId = () => `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useExamSheetStore = create<ExamSheetState>((set, get) => ({
  pages: [],
  selectedPageId: null,
  isLoading: false,
  hasExistingData: false,

  addPage: (page) => {
    const { pages } = get();
    const newPage: ExamSheetPage = {
      ...page,
      id: page.id || generateId(),
      pageNumber: pages.length + 1,
      createdAt: page.createdAt || Date.now(),
    };

    set((state) => ({
      pages: [...state.pages, newPage],
      selectedPageId: newPage.id,
    }));
  },

  removePage: (id) => {
    set((state) => {
      const newPages = state.pages
        .filter((p) => p.id !== id)
        .map((p, index) => ({ ...p, pageNumber: index + 1 }));

      const newSelectedId =
        state.selectedPageId === id
          ? newPages[newPages.length - 1]?.id || null
          : state.selectedPageId;

      return {
        pages: newPages,
        selectedPageId: newSelectedId,
      };
    });
  },

  replacePage: (id, newPage) => {
    set((state) => ({
      pages: state.pages.map((p) =>
        p.id === id
          ? { ...newPage, id, pageNumber: p.pageNumber, createdAt: Date.now() }
          : p
      ),
    }));
  },

  selectPage: (id) => {
    set({ selectedPageId: id });
  },

  reorderPages: () => {
    set((state) => ({
      pages: state.pages.map((p, index) => ({
        ...p,
        pageNumber: index + 1,
      })),
    }));
  },

  loadFromStorage: async () => {
    set({ isLoading: true });
    try {
      const pages = await examSheetStorage.load();
      if (pages && pages.length > 0) {
        set({
          pages,
          selectedPageId: pages[0].id,
          hasExistingData: true,
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  saveToStorage: async () => {
    const { pages } = get();
    if (pages.length > 0) {
      await examSheetStorage.save(pages);
    }
  },

  checkExistingData: async () => {
    const exists = await examSheetStorage.exists();
    set({ hasExistingData: exists });
    return exists;
  },

  clearAll: () => {
    set({
      pages: [],
      selectedPageId: null,
      hasExistingData: false,
    });
  },
}));
