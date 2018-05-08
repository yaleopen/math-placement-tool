import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import Popover, {PopoverContent,PopoverTrigger} from '@instructure/ui-overlays/lib/components/Popover';
import Text from '@instructure/ui-elements/lib/components/Text';
import Pill from '@instructure/ui-elements/lib/components/Pill';

function FeedbackPopover(props){
  return(
      <Popover>
        <PopoverTrigger>
          <Pill text={props.feedback}/>
        </PopoverTrigger>
        <PopoverContent>
          <View padding="small" display="inline-block">
            <Text>{props.feedback}</Text>
          </View>
        </PopoverContent>
      </Popover>
  )
}

export default FeedbackPopover;