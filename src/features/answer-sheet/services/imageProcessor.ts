import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

interface ResizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'JPEG' | 'PNG';
}

const DEFAULT_OPTIONS: ResizeOptions = {
  maxWidth: 1200,
  maxHeight: 1600,
  quality: 80,
  format: 'JPEG',
};

export const imageProcessor = {
  async resize(
    uri: string,
    options: ResizeOptions = {}
  ): Promise<{ uri: string; width: number; height: number }> {
    const { maxWidth, maxHeight, quality, format } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    const result = await ImageResizer.createResizedImage(
      uri,
      maxWidth!,
      maxHeight!,
      format!,
      quality!,
      0,
      undefined,
      false,
      { mode: 'contain', onlyScaleDown: true }
    );

    return {
      uri: result.uri,
      width: result.width,
      height: result.height,
    };
  },

  async toBase64(uri: string): Promise<string> {
    try {
      const filePath = Platform.OS === 'android'
        ? uri.replace('file://', '')
        : uri;

      const base64 = await RNFS.readFile(filePath, 'base64');
      return base64;
    } catch (error) {
      console.error('Base64 변환 실패:', uri, error);
      throw error;
    }
  },

  async processForStorage(uri: string): Promise<string> {
    try {
      const resized = await this.resize(uri);
      const base64 = await this.toBase64(resized.uri);
      return base64;
    } catch (error) {
      console.error('이미지 처리 실패:', uri, error);
      throw error;
    }
  },

  getUriFromBase64(base64: string, format: 'jpeg' | 'png' = 'jpeg'): string {
    return `data:image/${format};base64,${base64}`;
  },
};
