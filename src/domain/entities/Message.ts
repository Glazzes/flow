type VideoOptions = {
  width: number;
  height: number;
  localThumbnailUrl: string;
};

type MessageMedia = {
  localUrl: string;
  contentType: string;
  size: number;
  videoOptions: VideoOptions;
};

type MessageOptions = {
  id: string;
  temporaryBackwardsId: string;
  senderId: string;
  recieverId: string;
  textContent: string;
  hasBeenSeen: boolean;
  media: MessageMedia[];
  previewHyperLink: string;
  hyperLinks: string[];
  localTimeStamp: string;
};

export default class Message {
  id: string;
  senderId: string;
  recieverId: string;
  textContent: string;
  hasBeenSeen: boolean;

  constructor(options: MessageOptions) {
    this.id = options.id;
    this.senderId = options.senderId;
    this.recieverId = options.recieverId;
    this.textContent = options.textContent;
    this.hasBeenSeen = options.hasBeenSeen;
  }

  equalsByTemporaryBackwardsId(id: string): boolean {
    return true;
  }
}
