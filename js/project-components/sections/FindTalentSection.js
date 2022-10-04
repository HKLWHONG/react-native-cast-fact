/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  FindTalentSectionAction,
} from '../../redux';

import {
  SingleTouch,
  TextInput,
} from '../../components';

import {
  Section,
  CollapsibleSection,
  GroupFrame,
  Tag,
  RangeTag,
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_search_gray = require('../../../assets/images/ic_search_gray/ic_search_gray.png');

class FindTalentSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <Section
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            iconSource={ic_search_gray}
            label={props.label}>
            <CollapsibleSection text={'Gender'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Female'} />
                <Tag text={'Gender-Noconforming'} />
                <Tag text={'Non-Binary'} />
                <Tag text={'Trans Female'} />
                <Tag text={'Agender'} />
                <Tag text={'Androgyne'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Ethnicities'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Option A'} />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Body Type'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Option A'} />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Eye Color'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.amber }}
                  text={'Amber'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.brown }}
                  text={'Brown'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.gray }}
                  text={'Gray'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.green }}
                  text={'Green'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.hazel }}
                  text={'Hazel'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.red }}
                  text={'Red'}
                  leftAccessoryType="dot"
                />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Height'}>
              <GroupFrame
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType="check">
                <Tag
                  type="input"
                  value={'170'}
                  text={'CM'}
                />
                <Tag
                  text={'Deviation'}
                  leftAccessoryType="check"
                />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Age'}>
              <GroupFrame
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType="check">
                <RangeTag fromValue={'18'} toValue={'25'} />
              </GroupFrame>
            </CollapsibleSection>
          </Section>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
});

FindTalentSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
};

FindTalentSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(FindTalentSectionAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTalentSection);
