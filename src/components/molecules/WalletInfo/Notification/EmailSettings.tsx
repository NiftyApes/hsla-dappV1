import React from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const EmailSettings: React.FC = () => {
  return (
    <Box fontSize="sm">
      <Text mb="35px" mt="20px">
        Add an email to receive email notifications and reminders about your loans.
      </Text>

      <Flex alignItems="center">
        <Input
          variant="secondary"
          placeholder="ex. johndoe@disposablemail.com"
          p="12px 30px"
          mr="8px"
        />
        <Button variant="neutral">SAVE</Button>
      </Flex>

      <Text color="solid.gray0" fontWeight="bold" mt="46px" mb="10px">
        ✅ Updates from NiftyApes
      </Text>
      <Text color="solid.gray0">
        NiftyApes, Inc. will send you updates about new features, platform activity, and tktk. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus sapien vel leo faucibus
        porttitor.
      </Text>
      <Text color="solid.gray0" mt="35px">
        <strong>How is this email address used?</strong>
        <br />
        <br /> The email provided will be saved in an internal, private database, associating the
        wallet connected connected wallet with the email address. <br />
        <br />
        We will send the email address provided will receive platform activity notifications.
      </Text>
    </Box>
  );
};

export default EmailSettings;
