import React, {useEffect} from 'react';
import {Box} from '../../components';
import {useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import SelectProfileImageViewModel from '../../../infrastructure/viewmodel/SelectProfileImageViewModel';
import useContainer from '../../hooks/usecontainer';
import { ContainerTypes } from '../../../configuration/containertypes';

const Profile = observer(() => {
  const viewModel = useContainer<SelectProfileImageViewModel>(
    ContainerTypes.SelectProfileImageViewModel
  );

  const {width, height} = useWindowDimensions();
  const COLUM_NUMBER = width > height ? 4 : 3;

  useEffect(() => {
    if (viewModel.hasMediaLibraryPermission && viewModel.albums.length === 0) {
      viewModel.findAndSetAlbums();
    }
  }, [viewModel]);

  return <Box flex={1} />;
});

export default Profile;
