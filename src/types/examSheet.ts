export interface ExamSheetPage {
  id: string;
  uri: string;
  base64?: string;
  pageNumber: number;
  createdAt: number;
}

export interface ExamSheet {
  id: string;
  pages: ExamSheetPage[];
  createdAt: number;
  updatedAt: number;
}

export interface StoredExamSheet {
  pages: Array<{
    id: string;
    base64: string;
    pageNumber: number;
    createdAt: number;
  }>;
  createdAt: number;
  updatedAt: number;
}
