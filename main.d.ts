declare global
{
    interface ImageSwitcherData
    {
        img_paths : string[],
        zh_captions: string[]
        it_captions: string[]
        img : HTMLImageElement,
        captionP: HTMLParagraphElement
    }
}

export {}