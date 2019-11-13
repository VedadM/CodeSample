// @flow
import * as React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import {
  Form,
  Segment,
  Modal,
  Button,
  Transition,
} from 'semantic-ui-react';

import { red } from '../../components/Colors';

import type { UserActions } from '../../actions/User';
import withUser from '../../hoc/withUser';
import SubTitle from '../../components/common/SubTitle';
import ModalCloseLink from '../../components/forms/ModalCloseLink';
import ErrorMessage from '../../components/forms/ErrorMessage';
import InputValidator from '../../utils/InputValidation';
import WithButtonStyle from '../../components/semanticOverrides/Button';
import AccountModalOverride from '../../components/semanticOverrides/Modal';
import InputBox from '../../components/semanticOverrides/InputBox';

type State = {
  modalOpen: boolean,
  modalVisible: boolean,
  animationDuration: number,
  email: string,
  firstname: string,
  lastname: string,
  errorMessage: string,
}

type PageProps = {
  userId: number,
  email: string,
  firstName: string,
  lastName: string,
};

type Props =
  & PageProps
  & UserActions

class UpdateProfileModal extends React.Component<Props, State> {
  state = {
    modalOpen: false,
    modalVisible: false,
    animationDuration: 500,
    email: '',
    firstname: '',
    lastname: '',
    errorMessage: '',
  };

  onFormSubmit = () => {
    const {
      updateProfile,
      userId,
    }: Props = this.props;

    const {
      firstname,
      lastname,
      email,
    }: State = this.state;

    const firstName: string = firstname.trim();
    const lastName: string = lastname.trim();

    if (!InputValidator.validateEmail(email)) {
      this.setState({ errorMessage: 'Make sure email is in correct format' });
      return;
    }

    updateProfile(userId, {
      email,
      firstName,
      lastName,
    });

    this.setState({
      errorMessage: '',
      email: '',
      firstname: '',
      lastname: '',
    });

    this.closeModal();
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>,
    { name, value }: { name: string, value: string }) => {
    this.setState({ [name]: value });
  };

  setEmail = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
  }

  clearMessage = () => this.setState({ errorMessage: '' });

  openModal = () => {
    const {
      email,
      firstName,
      lastName,
    }: Props = this.props;

    const {
      modalOpen,
      modalVisible,
    }: State = this.state;

    this.setState({
      modalOpen: !modalOpen,
      modalVisible: !modalVisible,
      email,
      firstname: firstName,
      lastname: lastName,
    });
  }

  closeModal = () => {
    const {
      modalOpen,
      modalVisible,
      animationDuration,
    }: State = this.state;

    this.setState({ modalVisible: !modalVisible });

    setTimeout(() => {
      this.setState({ modalOpen: !modalOpen });
    }, animationDuration);
  }

  render(): React.Node {
    const {
      modalOpen,
      modalVisible,
      email,
      firstname,
      lastname,
      errorMessage,
      animationDuration,
    }: State = this.state;

    return (
      <ModalWrapper>
        <UpdateWrapper onClick={this.openModal}>Update</UpdateWrapper>
        <Transition visible={modalVisible} animation="fade down" duration={animationDuration}>
          <AccountModalOverride
            onClose={this.closeModal}
            open={modalOpen}
            basic
            size="tiny"
            dimmer="blurring"
          >
            <Modal.Content>
              <UpdateFormWrapper>
                <SubTitle
                  borderBottom={`2px solid ${red}`}
                  text="Update Profile"
                  submessage=""
                />

                <ModalCloseLink onClick={this.closeModal} />

                <UpdateProfileForm size="large" onSubmit={this.onFormSubmit}>
                  <SegmentSubscription stacked>
                    {isEmpty(errorMessage) ? ''
                      : (
                        <ErrorMessage
                          message={errorMessage}
                          fontSize="0.7em"
                        />
                      )
                    }

                    <InputBox>
                      <span>Email</span>
                      <Form.Input
                        fluid
                        placeholder="Email"
                        name="email"
                        autoComplete="on"
                        onChange={this.setEmail}
                        onFocus={this.clearMessage}
                        value={email}
                      />
                    </InputBox>

                    <InputBox>
                      <span>First Name</span>
                      <Form.Input
                        fluid
                        placeholder="First Name"
                        name="firstname"
                        type="text"
                        autoComplete="on"
                        onChange={this.handleChange}
                        onFocus={this.clearMessage}
                        value={firstname}
                      />
                    </InputBox>

                    <InputBox>
                      <span>Last Name</span>
                      <Form.Input
                        fluid
                        placeholder="Last Name"
                        name="lastname"
                        type="text"
                        autoComplete="on"
                        onChange={this.handleChange}
                        onFocus={this.clearMessage}
                        value={lastname}
                      />
                    </InputBox>
                    <ButtonStyle
                      initialBgColor={red}
                      width="100%"
                    >
                      <Button>
                        SAVE
                      </Button>
                    </ButtonStyle>
                  </SegmentSubscription>
                </UpdateProfileForm>
              </UpdateFormWrapper>
            </Modal.Content>
          </AccountModalOverride>
        </Transition>
      </ModalWrapper>
    );
  }
}

export default withUser(UpdateProfileModal);

const ModalWrapper: React.StatelessFunctionalComponent<{}> = styled.section`
  display: block;
`;

const ButtonStyle: React.StatelessFunctionalComponent<{}> = styled(WithButtonStyle)`
  width: 100%;
  margin-top: 14px;

  && button {
    width: 100%;
    margin: 10px 0 0 0;
  }
`;

const UpdateFormWrapper: React.StatelessFunctionalComponent<{}> = styled.div`
  text-align: center;
  position: relative;
  width: 300px;
  margin: 0 auto;
`;

const SegmentSubscription: React.StatelessFunctionalComponent<{}> = styled(Segment)`
  &&& {
    text-align: left;
    border: none;
    box-shadow: none;
    width: 300px;
    padding: 1.8em 1.20em;
    margin: 0 auto;

    &:after {
      content: none;
    }
  }
`;

const UpdateProfileForm: React.StatelessFunctionalComponent<{}> = styled(Form)`
  &&& {
    text-align: left;

    input {
      border: 0;
      font-size: 1.2em;
    }
  }
`;

const UpdateWrapper: React.StatelessFunctionalComponent<{}> = styled.div`
  cursor: pointer;
  font-size: 12px;
  color: ${red};

  &:hover {
    text-decoration: underline;
  }
`;
