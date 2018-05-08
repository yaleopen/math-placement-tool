import React, {Component} from "react";
import View from '@instructure/ui-layout/lib/components/View';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Popover, {PopoverTrigger,PopoverContent} from '@instructure/ui-overlays/lib/components/Popover';
import IconTrash from '@instructure/ui-icons/lib/Line/IconTrash';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Flex,{FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import Heading from '@instructure/ui-elements/lib/components/Heading';

class DeleteRubricPopover extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showPopover: false
    }
  }

  showPopover = () => {
    this.setState({
      showPopover: true
    })
  };

  hidePopover = () => {
    this.setState({
      showPopover: false
    })
  };

  handlePopoverSubmit = (onContentSubmit) => {
    onContentSubmit();
    this.hidePopover();
  };

  render () {
    return (
        <View padding="0">
          <Popover
              on="click"
              show={this.state.showPopover}
              onDismiss={this.hidePopover}
              shouldContainFocus
              shouldReturnFocus
              shouldCloseOnDocumentClick
              label="Popover Dialog Example"
          >
            <PopoverTrigger>
              <Tooltip tip="Delete">
                <Button
                    variant="icon"
                    onClick={this.showPopover}
                    disabled={sessionStorage.isCoursePublished === 'true'}
                >
                  <IconTrash style={{color: '#EE0612'}}/>
                </Button>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
              <View padding="small" display="block">
                <Flex direction="column">
                  <FlexItem padding="small" as="header" textAlign="center">
                    <Heading level="h4">Are you sure?</Heading>
                  </FlexItem>
                  <FlexItem padding="small" as="footer">
                    <Flex justifyItems="end" >
                      <FlexItem>
                        <Button
                            onClick={this.handlePopoverSubmit.bind(this,this.props.onContentSubmit)}
                            disabled={sessionStorage.isCoursePublished === 'true'}
                        >
                          OK
                        </Button>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
              </View>
            </PopoverContent>
          </Popover>
        </View>
    )
  }
}

export default DeleteRubricPopover;
