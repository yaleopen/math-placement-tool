import React, {Component} from "react";
import { View, Flex } from '@instructure/ui-layout';
import { Button } from '@instructure/ui-buttons';
import { Popover, Tooltip } from '@instructure/ui-overlays';
import { IconTrashLine } from '@instructure/ui-icons';
import { Heading } from '@instructure/ui-elements';

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
            <Popover.Trigger>
              <Tooltip tip="Delete">
                <Button
                    variant="icon"
                    onClick={this.showPopover}
                    disabled={this.props.isQuizPublished}
                >
                  <IconTrashLine style={{color: '#EE0612'}}/>
                </Button>
              </Tooltip>
            </Popover.Trigger>
            <Popover.Content>
              <View padding="small" display="block">
                <Flex direction="column">
                  <Flex.Item padding="small" as="header" textAlign="center">
                    <Heading level="h4">Are you sure?</Heading>
                  </Flex.Item>
                  <Flex.Item padding="small" as="footer">
                    <Flex justifyItems="end" >
                      <Flex.Item>
                        <Button
                            onClick={this.handlePopoverSubmit.bind(this,this.props.onContentSubmit)}
                            disabled={this.props.isQuizPublished}
                        >
                          OK
                        </Button>
                      </Flex.Item>
                    </Flex>
                  </Flex.Item>
                </Flex>
              </View>
            </Popover.Content>
          </Popover>
        </View>
    )
  }
}

export default DeleteRubricPopover;
