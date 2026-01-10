import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredExamSheet, ExamSheetPage } from '../../../types';
import { imageProcessor } from '../../answer-sheet/services/imageProcessor';

const STORAGE_KEY = '@exam_sheet';

export const examSheetStorage = {
  async save(pages: ExamSheetPage[]): Promise<void> {
    const storedPages = await Promise.all(
      pages.map(async (page) => {
        const base64 = page.base64 || await imageProcessor.processForStorage(page.uri);
        return {
          id: page.id,
          base64,
          pageNumber: page.pageNumber,
          createdAt: page.createdAt,
        };
      })
    );

    const data: StoredExamSheet = {
      pages: storedPages,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  async load(): Promise<ExamSheetPage[] | null> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return null;

    const data: StoredExamSheet = JSON.parse(json);

    return data.pages.map((page) => ({
      id: page.id,
      uri: imageProcessor.getUriFromBase64(page.base64),
      base64: page.base64,
      pageNumber: page.pageNumber,
      createdAt: page.createdAt,
    }));
  },

  async exists(): Promise<boolean> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json !== null;
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  },

  async getMetadata(): Promise<{ createdAt: number; updatedAt: number; pageCount: number } | null> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return null;

    const data: StoredExamSheet = JSON.parse(json);
    return {
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      pageCount: data.pages.length,
    };
  },
};
