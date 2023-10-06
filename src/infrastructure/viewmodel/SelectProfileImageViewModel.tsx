import {inject, injectable} from 'inversify';
import {makeAutoObservable} from 'mobx';
import {Album, Asset, getAlbumsAsync, getAssetsAsync} from 'expo-media-library';
import {PermissionService} from '../../application/services';
import {ContainerTypes} from '../../configuration/containertypes';

type AlbumId = string | undefined;

type AlbumSelection = {
  [albumId: string]: {
    assets: Asset[];
    lastItemId: string | undefined;
    shouldKeepFetching: boolean;
  };
};

// A name that represents all media when selectedAlbumId is undefied, it's just a filter
const ALL_MEDIA_NAME = 'all';

@injectable()
export default class SelectProfileImageViewModel {
  private permissionService: PermissionService;

  hasMediaLibraryPermission: boolean = false;
  hasCameraPermission: boolean = false;
  selectedAlbumId: string | undefined = undefined;
  albums: Album[] = [];
  albumSelection: AlbumSelection = {};

  constructor(
    @inject(ContainerTypes.SimplePermissionService) permissionService: PermissionService,
  ) {
    makeAutoObservable(this);
    this.permissionService = permissionService;
  }

  findAndSetAlbums(): void {
    getAlbumsAsync().then(albums => (this.albums = albums));
  }

  selectAlbum(id: AlbumId) {
    this.selectedAlbumId = id;
  }

  async fetchNext(next: number, lastAssetId?: string) {
    const page = await getAssetsAsync({
      album: this.selectedAlbumId,
      first: next,
      after: lastAssetId,
    });

    const albumId: AlbumId = this.selectedAlbumId ?? ALL_MEDIA_NAME;
    const lastItemId: string = page.assets[page.assets.length - 1].id;

    this.albumSelection[albumId] = {
      assets: [...this.albumSelection[albumId].assets, ...page.assets],
      lastItemId,
      shouldKeepFetching: page.hasNextPage,
    };
  }

  async requestMediaLibraryPermission(): Promise<void> {
    const isGranted =
      await this.permissionService.requestMediaLibraryPermission();
    this.hasMediaLibraryPermission = isGranted;
  }

  async requestCameraPermission(): Promise<void> {
    const isGranted = await this.permissionService.requestCameraPermission();
    this.hasCameraPermission = isGranted;
  }
}
