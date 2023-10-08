import React, {useEffect} from 'react';
import {Box, Text} from '../../components';
import {Button, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import SelectProfileImageViewModel from './viewModel';
import useContainer from '../../hooks/usecontainer';

const Profile = observer(() => {
  const viewModel = useContainer<SelectProfileImageViewModel>(
    'SelectProfileImageViewModel',
  );

  const {width, height} = useWindowDimensions();
  const COLUM_NUMBER = width > height ? 4 : 3;

  useEffect(() => {
    if (viewModel.hasMediaLibraryPermission && viewModel.albums.length === 0) {
      viewModel.findAlbums();
    }
  }, [viewModel]);

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Button
        title="Ask permission"
        onPress={() => viewModel.requestMediaLibraryPermission()}
      />
      <Text variant={'body'}>
        {viewModel.hasMediaLibraryPermission ? 'has' : 'has not'}
      </Text>
    </Box>
  );
});

export default Profile;
