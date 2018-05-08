import React from 'react';
import Badge from '@instructure/ui-elements/lib/components/Badge';
import Button from '@instructure/ui-buttons/lib/components/Button';
import IconUser from '@instructure/ui-icons/lib/Line/IconUser';

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
          <IconUser />
        </Button>
      </Badge>
  );
}

export default UserSubmissionBadge;