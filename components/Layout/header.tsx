import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Container, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';

import deleteSessionFromLocalStorage from '@/feature/utils/session/deleteSessionFromLocalStorage';

import {
  AppBarRestyled,
  HeaderWrapper,
  MenuButtonRestyled,
  MenuIconButtonRestyled,
  NavigationListItem,
  NavigationUlItem,
  SignInButtonRestyled,
  ToolbarRestyled,
} from './Header-style';
import { selectAccessKey, setAccessKey } from '../../store/slices/sessionSlice';
import { NextLinkComposed } from '../CommonComponents/Link';
import LintuIcon from '../img/icon';

interface Props {
  handleOpenSignInModal: () => void;
}

// 22.10.2023 перестал работать старый подход к работе со ссылками
// В этом компоненте внедрил новый подход из документации
// https://mui.com/material-ui/guides/routing/#next-js-pages-router
// Старый вариант оставил в комментариях, чтобы было проще влиться в контест при последующем рефакторинге ссылок во всем приложении

function Header({ handleOpenSignInModal }: Props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const accessKey = useSelector(selectAccessKey);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    deleteSessionFromLocalStorage();
    dispatch(setAccessKey(null));
  };

  if (isDesktop) {
    return (
      <AppBarRestyled>
        <Container maxWidth="xl">
          <ToolbarRestyled>
            <div>
              {/* <Button href="/"> */}
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: '/',
                }}
              >
                <LintuIcon />
              </Button>
            </div>

            <HeaderWrapper>
              <Box component="nav">
                <NavigationUlItem>
                  <NavigationListItem key={'portfolios'}>
                    {/* <MenuButtonRestyled href={`/portfolios`}> */}
                    <MenuButtonRestyled
                      href={{
                        pathname: '/portfolios',
                      }}
                    >
                      Portfolios
                    </MenuButtonRestyled>
                  </NavigationListItem>
                  <NavigationListItem key={'settings'}>
                    {/* <MenuButtonRestyled href={`/settings`}> */}
                    <MenuButtonRestyled
                      href={{
                        pathname: '/settings',
                      }}
                    >
                      Settings
                    </MenuButtonRestyled>
                  </NavigationListItem>
                </NavigationUlItem>
              </Box>

              {accessKey && (
                <SignInButtonRestyled onClick={handleSignOut}>
                  Sign Out
                </SignInButtonRestyled>
              )}
              {!accessKey && (
                <SignInButtonRestyled onClick={handleOpenSignInModal}>
                  Sign In
                </SignInButtonRestyled>
              )}
            </HeaderWrapper>
          </ToolbarRestyled>
        </Container>
      </AppBarRestyled>
    );
  }

  return (
    <AppBarRestyled>
      <Container maxWidth="md">
        <ToolbarRestyled>
          {/* <Button href="/"> */}
          <Button
            component={NextLinkComposed}
            to={{
              pathname: '/',
            }}
          >
            <LintuIcon />
          </Button>
          <div>
            {accessKey && (
              <SignInButtonRestyled onClick={handleSignOut}>
                Sign Out
              </SignInButtonRestyled>
            )}
            {!accessKey && (
              <SignInButtonRestyled onClick={handleOpenSignInModal}>
                Sign In
              </SignInButtonRestyled>
            )}
            <MenuIconButtonRestyled
              id="menu-button"
              aria-controls={open ? 'menu-button' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </MenuIconButtonRestyled>
            <Menu
              id="item-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'item-button',
              }}
            >
              {/* <MenuItem key={'portfolios'} href="/portfolios">
                Portfolios
              </MenuItem>
              <MenuItem key={'settings'} href="/settings">
                Settings
              </MenuItem> */}
              <MenuItem key={'portfolios'}>
                <Button
                  component={NextLinkComposed}
                  to={{
                    pathname: '/portfolios',
                  }}
                >
                  Portfolios
                </Button>
              </MenuItem>
              <MenuItem key={'settings'}>
                <Button
                  component={NextLinkComposed}
                  to={{
                    pathname: '/settings',
                  }}
                >
                  Settings
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </ToolbarRestyled>
      </Container>
    </AppBarRestyled>
  );
}

export default Header;
