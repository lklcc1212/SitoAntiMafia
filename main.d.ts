declare global {
  interface ImageSwitcherData {
    img_paths: string[];
    zh_captions: string[];
    it_captions: string[];
    img: HTMLImageElement;
    captionP: HTMLParagraphElement;
  }

  interface CaptionBinding {
    p: HTMLParagraphElement;
    zhcaptions: string[];
    itcaptions: string[];
    currentIndex: number;
  }
}

export {};
