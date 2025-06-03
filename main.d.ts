declare global {
  interface ImageSwitcherData {
    img_paths: string[];
    captions: {
      zh: string[];
      it: string[];
    };
    img: HTMLImageElement;
    captionP: HTMLParagraphElement;
    currentIndex: number;
  }

  interface CaptionBinding {
    p: HTMLParagraphElement;
    zhcaptions: string[];
    itcaptions: string[];
    currentIndex: number;
  }
}

export {};
