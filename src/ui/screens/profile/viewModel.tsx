import {inject, injectable} from 'inversify';
import {makeAutoObservable, observable, action, runInAction} from 'mobx';
import {Asset, getAlbumsAsync, getAssetsAsync} from 'expo-media-library';
import {PermissionService} from '@domain/services';
import {ConsoleLogger} from '@domain/log';

type AlbumReference = {
  assets: Asset[];
  lastItemId: string | undefined;
  hasNextPage: boolean;
};

type AlbumSelection = {
  [albumId: string]: AlbumReference;
};

type Album = {
  id: string;
  title: string;
  assetCount: number;
  thumbnailUrl: string;
};

@injectable()
export default class SelectProfileImageViewModel {
  private readonly logger = new ConsoleLogger(SelectProfileImageViewModel.name);
  private readonly ALL_MEDIA_NAME: string = 'all-media';
  private readonly FETCH_NEXT_ITEMS: number = 20;

  @observable hasMediaLibraryPermission: boolean = false;
  @observable hasCameraPermission: boolean = false;
  @observable selectedAlbumId: string | undefined = undefined;
  @observable previewAlbums: Album[] = [];
  @observable albumSelection: AlbumSelection = {};

  constructor(
    @inject('PermissionService') private permissionService: PermissionService,
  ) {
    makeAutoObservable(this);
  }

  @action
  async findAlbums(): Promise<void> {
    const previewAlbums: Album[] = [];
    const albums = await getAlbumsAsync();
    for (let album of albums) {
      const assets = await getAssetsAsync({
        album: album.id,
        first: 1,
      });

      previewAlbums.push({
        id: album.id,
        title: album.title,
        assetCount: album.assetCount,
        thumbnailUrl: assets.assets[0].uri,
      });
    }

    this.previewAlbums = previewAlbums;
  }

  @action
  selectAlbum(id?: string) {
    this.selectedAlbumId = id;
  }

  @action
  async findNextAssets() {
    const albumId: string = this.selectedAlbumId ?? this.ALL_MEDIA_NAME;
    const wontFetch = !(this.albumSelection[albumId]?.hasNextPage ?? true);
    if (wontFetch) {
      this.logger.warn(`All assets have been fetched for album "${albumId}"`);
    }

    const after = this.albumSelection[albumId]?.lastItemId;
    const page = await getAssetsAsync({
      album: this.selectedAlbumId,
      first: this.FETCH_NEXT_ITEMS,
      after: after,
    });

    const lastItemId: string = page.assets[page.assets.length - 1].id;
    const previousAssets = this.albumSelection[albumId]?.assets ?? [];
    this.albumSelection[albumId] ?? {
      assets: [...page.assets, ...previousAssets],
      lastItemId,
      hasNextPage: page.hasNextPage,
    };
  }

  @action
  async validatePermissionStatus(): Promise<void> {
    const cameraPermissionStatus =
      await this.permissionService.checkCameraPermission();
    const mediaLibraryPermissionStatus =
      await this.permissionService.checkMediaLibraryPermission();

    this.hasCameraPermission = cameraPermissionStatus;
    this.hasMediaLibraryPermission = mediaLibraryPermissionStatus;
  }

  @action
  async requestMediaLibraryPermission(): Promise<void> {
    const isGranted =
      await this.permissionService.requestMediaLibraryPermission();
    this.hasMediaLibraryPermission = isGranted;
  }

  @action
  async requestCameraPermission(): Promise<void> {
    const isGranted = await this.permissionService.requestCameraPermission();
    this.hasCameraPermission = isGranted;
  }
}
