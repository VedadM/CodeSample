// @flow
import * as React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode';

import {
  Form,
  Segment,
  Button,
} from 'semantic-ui-react';

import { red } from '../../components/Colors';

import withUser from '../../hoc/withUser';
import type { JWT, UserActions } from '../../actions/User';
import ErrorMessage from '../../components/forms/ErrorMessage';
import WithButtonStyle from '../../components/semanticOverrides/Button';
import InputValidator from '../../utils/InputValidation';
import InputBox from '../../components/semanticOverrides/InputBox';
import PasswordRules from '../../components/common/PasswordRules';

type State = {
  newpassword: string,
  confirmpassword: string,
  errorMessage: string,
}

type PageProps = {
  token: string,
}

type Props =
  & PageProps
  & UserActions

class ResetPasswordForm extends React.Component<Props, State> {
  state = {
    newpassword: '',
    confirmpassword: '',
    errorMessage: '',
  };

  onSubmitForm = () => {
    const { token }: Props = this.props;
    const { updateForgottenPassword }: UserActions = this.props;

    const decoded: JWT = jwtDecode(token);

    const {
      newpassword,
      confirmpassword,
    }: State = this.state;

    if (isEmpty(newpassword) || isEmpty(confirmpassword)) {
      this.setState({ errorMessage: 'Please make sure that fields are not empty' });
      return;
    }

    if (newpassword !== confirmpassword) {
      this.setState({ errorMessage: 'Passwords do not match' });
      return;
    }

    if (newpassword.length < 8) {
      this.setState({ errorMessage: 'Your password must be at least 8 characters long' });
      return;
    }

    if (!InputValidator.validateNewPassword(newpassword)) {
      this.setState({ errorMessage: 'Password is too simple' });
      return;
    }

    updateForgottenPassword(decoded.sub, {
      newPassword: newpassword,
      jwt: token,
    });
  };

  setNewPassword = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ newpassword: event.target.value.trim() });
  };

  setConfirmNewPassword = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ confirmpassword: event.target.value.trim() });
  };

  clearMessage = () => {
    this.setState({ errorMessage: '' });
  };

  render(): React.Node {
    const {
      newpassword,
      confirmpassword,
      errorMessage,
    }: State = this.state;

    return (
      <Form size="large" onSubmit={this.onSubmitForm}>
        <SegmentReset stacked>
          {isEmpty(errorMessage) ? ''
            : (
              <ErrorMessage
                message={errorMessage}
                fontSize="0.7em"
              />
            )
          }

          <InputBox>
            <Form.Input
              fluid
              placeholder="New Password"
              name="newpassword"
              type="password"
              onChange={this.setNewPassword}
              onFocus={this.clearMessage}
              autoComplete="on"
              value={newpassword}
            />
          </InputBox>

          <InputBox>
            <Form.Input
              fluid
              placeholder="Confirm Password"
              name="confirmpassword"
              type="password"
              onChange={this.setConfirmNewPassword}
              onFocus={this.clearMessage}
              autoComplete="on"
              value={confirmpassword}
            />
          </InputBox>

          <PasswordRules />

          <ButtonStyle
            initialBgColor={red}
            width="100%"
          >
            <Button>
              RESET PASSWORD
            </Button>
          </ButtonStyle>
        </SegmentReset>
      </Form>
    );
  }
}

export default withUser(ResetPasswordForm);

const ButtonStyle: React.StatelessFunctionalComponent<{}> = styled(WithButtonStyle)`
  width: 100%;
  margin-top: 14px;

  && button {
    width: 100%;
    margin: 10px 0 0 0;
  }
`;

const SegmentReset: React.StatelessFunctionalComponent<{}> = styled(Segment)`
  &&& {
    border: none;
    box-shadow: none;
    padding: 1.8em 1.20em;

    &:after {
      content: none;
    }
  }
`;
