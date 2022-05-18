import React from 'react';
import {
  Badge,
  BadgeProps,
  Box,
  BoxProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import NotificationTable from './NotificationTable';
import EmailSettings from './EmailSettings';

interface Props extends BoxProps {
  onClose(): void;
}

const styles = {
  tab: {
    w: '100%',
    alignItems: 'center',
    borderRadius: '10px',
    fontSize: 'sm',
    color: 'solid.gray0',
    _selected: {
      backgroundColor: '#f8f8f8',
    },
    _focus: {
      boxShadow: 'none',
    },
  } as TabProps,

  badge: {
    color: 'solid.white',
    borderRadius: '6px',
    d: 'flex',
    alignItems: 'center',
    p: '5px',
  } as BadgeProps,
};

const Notification: React.FC<Props> = ({ ...rest }) => {
  return (
    <Box
      w="640px"
      boxShadow="0px 4px 24px 0px rgba(73, 16, 146, 0.1)"
      borderLeftRadius="12px"
      backgroundColor="solid.white"
      {...rest}
    >
      <Tabs variant="solid-rounded">
        <TabList p="26px 20px 0px 20px">
          <Tab mr="20px" {...styles.tab}>
            <Icon name="notification" mr="7px" />
            NOTIFICATIONS
            <Badge bgColor="notification.info" {...styles.badge} mx="7px">
              <Icon name="update" size={12} color="solid.white" mr="3px" />2
            </Badge>
            <Badge bgColor="notification.alert" {...styles.badge}>
              <Icon name="alert" size={12} color="solid.white" mr="3px" />2
            </Badge>
          </Tab>
          <Tab {...styles.tab}>
            <Icon name="mail" mr="7px" />
            EMAIL SETTINGS
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <NotificationTable />
          </TabPanel>
          <TabPanel>
            <EmailSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Notification;
