import React from 'react';
import { Button } from '@instructure/ui-buttons';
import { IconUserLine } from '@instructure/ui-icons';
import { Badge } from '@instructure/ui-elements';

function UserSubmissionBadge(props) {
  return (
      <Badge
          count={props.count}
          pulse={props.count > 0}
          margin="small 0 0 0"
      >
        <Button
            variant="icon"
            disabled={props.count === 0}
        >
          <IconUserLine />
        </Button>
      </Badge>
  );
}

export default UserSubmissionBadge;