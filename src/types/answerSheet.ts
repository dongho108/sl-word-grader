export interface AnswerSheetPage {
  id: string;
  uri: string;
  base64?: string;
  pageNumber: number;
  createdAt: number;
}

export interface AnswerSheet {
  id: string;
  pages: AnswerSheetPage[];
  createdAt: number;
  updatedAt: number;
}

export interface StoredAnswerSheet {
  pages: Array<{
    id: string;
    base64: string;
    pageNumber: number;
    createdAt: number;
  }>;
  createdAt: number;
  updatedAt: number;
}
