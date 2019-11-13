// @flow
import * as React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import type { Location } from 'react-router-dom';

import {
  Transition,
  Grid,
} from 'semantic-ui-react';

import config from '../../../config';
import { red } from '../../components/Colors';

import withAuthRedirect from '../../hoc/withAuthRedirect';
import SubscriptionForm from './SubscriptionForm';
import Meta from '../../components/common/Meta';
import SubTitle from '../../components/common/SubTitle';
import SignupProgress from '../../components/subscription/SignupProgress';

type State = {
  visible: boolean,
};

type Props = {
  location: Location,
}

class Subscription extends React.Component<Props, State> {
  state = {
    visible: false,
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render(): React.Node {
    const { visible }: State = this.state;
    const { location }: Props = this.props;

    return (
      <React.Fragment>
        <Meta
          title={`${config.siteName } - Subscription`}
        />
        <SignupProgress path={location.pathname} />
        <Transition transitionOnMount={visible} animation="scale" duration={500}>
          <div>
            <SubscriptionWrapper>
              <SubTitle
                borderBottom={`2px solid ${red}`}
                text="Create an Account"
              />

              <Grid textAlign="center" verticalAlign="top">
                <Grid.Column>
                  <SubscriptionForm />
                </Grid.Column>
              </Grid>
            </SubscriptionWrapper>
          </div>
        </Transition>
      </React.Fragment>
    );
  }
}

export default withAuthRedirect(Subscription);

const SubscriptionWrapper: React.StatelessFunctionalComponent<{}> = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 40px;
  position: relative;
  height: auto;
`;
