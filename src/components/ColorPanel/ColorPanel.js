import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

import { setColors } from '../../actions';

import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

class ColorPanel extends React.Component {
  state = {
    modal: false,
    primary: '',
    secondary: '',
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    userColors: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }
  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/colors`).off();
  };
  componentWillUnmount() {
    this.removeListener();
  }

  addListener = (userId) => {
    let userColors = [];
    this.state.usersRef.child(`${userId}/colours`).on('child_added', (snap) => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  openModal = () => this.setState({ modal: true });
  handleChangePrimary = (color) => this.setState({ primary: color.hex });
  handleChangeSecondary = (color) => this.setState({ secondary: color.hex });
  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };
  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colours`)
      .push()
      .update({ primary, secondary })
      .then(() => {
        console.log('Colours added');
        this.closeModal();
      })
      .catch((err) => console.error(err));
  };
  closeModal = () => this.setState({ modal: false });

  displayUserColors = (colors) =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className='color__container'
          onClick={() => this.props.setColors(color.primary, color.secondary)}
        >
          <div className='color__square' style={{ background: color.primary }}>
            <div
              className='color__overlay'
              style={{ background: color.secondary }}
            ></div>
          </div>
        </div>
        {/* <Icon
          name='window close'
          color='red'
          size='small'
          onClick={this.props.clearColors}
        /> */}
      </React.Fragment>
    ));

  render() {
    const { modal, primary, secondary, userColors } = this.state;

    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        vertical
        visible
        width='very thin'
      >
        <Divider />
        <Button icon='add' size='small' color='blue' onClick={this.openModal} />
        {this.displayUserColors(userColors)}

        {/* Color Picker modal */}
        <Modal basic open={modal} onClose={this.closeModal} size='mini'>
          <Modal.Header>Choose App Colours</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content='Primary Colour' />
              <SketchPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label content='Secondary Colour' />
              <SketchPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSaveColors}>
              <Icon name='checkmark' /> Save Colours
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(null, { setColors })(ColorPanel);
