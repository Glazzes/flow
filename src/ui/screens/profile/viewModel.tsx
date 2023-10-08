import {inject, injectable} from 'inversify';
import {makeAutoObservable, observable, runInAction} from 'mobx';
import {Album, Asset, getAlbumsAsync, getAssetsAsync} from 'expo-media-library';
import {PermissionService} from '@domain/services';

type AlbumId = string | undefined;

type AlbumSelection = {
  [albumId: string]: {
    assets: Asset[];
    lastItemId: string | undefined;
    shouldKeepFetching: boolean;
  };
};

@injectable()
export default class SelectProfileImageViewModel {
  private permissionService: PermissionService;

  private readonly ALL_MEDIA_NAME = 'all';

  @observable hasMediaLibraryPermission: boolean = false;
  @observable hasCameraPermission: boolean = false;
  @observable selectedAlbumId: string | undefined = undefined;
  @observable albums: Album[] = [];
  @observable albumSelection: AlbumSelection = {};

  constructor(
    @inject('PermissionService') permissionService: PermissionService,
  ) {
    makeAutoObservable(this);
    this.permissionService = permissionService;
  }

  async findAlbums(): Promise<void> {
    const albums = await getAlbumsAsync();
    runInAction(() => (this.albums = albums));
  }

  selectAlbum(id: AlbumId) {
    runInAction(() => (this.selectedAlbumId = id));
  }

  async fetchNext(next: number, lastAssetId?: string) {
    const page = await getAssetsAsync({
      album: this.selectedAlbumId,
      first: next,
      after: lastAssetId,
    });

    const albumId: AlbumId = this.selectedAlbumId ?? this.ALL_MEDIA_NAME;
    const lastItemId: string = page.assets[page.assets.length - 1].id;

    runInAction(() => {
      this.albumSelection[albumId] = {
        assets: [...this.albumSelection[albumId].assets, ...page.assets],
        lastItemId,
        shouldKeepFetching: page.hasNextPage,
      };
    });
  }

  async requestMediaLibraryPermission(): Promise<void> {
    const isGranted =
      await this.permissionService.requestMediaLibraryPermission();
    runInAction(() => (this.hasMediaLibraryPermission = isGranted));
  }

  async requestCameraPermission(): Promise<void> {
    const isGranted = await this.permissionService.requestCameraPermission();
    runInAction(() => (this.hasCameraPermission = isGranted));
  }
}
