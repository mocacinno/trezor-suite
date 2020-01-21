import React, { useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    WORD_REQUEST_MATRIX6,
    WORD_REQUEST_MATRIX9,
    WORD_REQUEST_PLAIN,
} from '@onboarding-actions/constants/events';
import { RECOVER_DEVICE } from '@onboarding-actions/constants/calls';
import * as connectActions from '@onboarding-actions/connectActions';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import * as recoveryActions from '@settings-actions/recoveryActions';
import { OnboardingButton, Option, Text, Wrapper } from '@onboarding-components';
import { RECOVERY_MODEL_ONE_URL } from '@suite-constants/urls';
import { Translation, WordInput, WordInputAdvanced } from '@suite-components';
import { AppState, Dispatch } from '@suite-types';
import messages from '@suite/support/messages';
import { Link, P } from '@trezor/components-v2';

const mapStateToProps = (state: AppState) => ({
    device: state.suite.device,
    deviceCall: state.onboarding.deviceCall,
    uiInteraction: state.onboarding.uiInteraction,
    recovery: state.settings.recovery,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onboardingActions: {
        goToNextStep: bindActionCreators(onboardingActions.goToNextStep, dispatch),
        goToSubStep: bindActionCreators(onboardingActions.goToSubStep, dispatch),
        goToPreviousStep: bindActionCreators(onboardingActions.goToPreviousStep, dispatch),
    },
    recoveryActions: {
        setWordsCount: bindActionCreators(recoveryActions.setWordsCount, dispatch),
        submit: bindActionCreators(recoveryActions.submit, dispatch),
        setAdvancedRecovery: bindActionCreators(recoveryActions.setAdvancedRecovery, dispatch),
        recoverDevice: bindActionCreators(recoveryActions.recoverDevice, dispatch),
    },
    connectActions: {
        resetCall: bindActionCreators(connectActions.resetCall, dispatch),
    },
});

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    WrappedComponentProps;

type Status = null | 'select-advanced-recovery';

const RecoveryStepModelOne = (props: Props) => {
    const [status, setStatus] = useState<Status>(null);

    const {
        recoveryActions,
        recovery,
        device,
        uiInteraction,
        deviceCall,
        connectActions,
        onboardingActions,
    } = props;

    if (!device || !device.features) {
        return null;
    }

    const getStatus = () => {
        if (recovery.success) {
            return 'success';
        }
        if (recovery.error) {
            return 'error';
        }
        if (props.modal) {
            return 'recovering';
        }
        return status;
    };

    return (
        <Wrapper.Step>
            <Wrapper.StepHeading>
                {getStatus() === null && 'Recover your device from seed'}
                {getStatus() === 'recovering' && 'Entering seedwords'}
                {getStatus() === 'select-advanced-recovery' && 'Select recovery method'}
                {getStatus() === 'success' && 'Device recovered from seed'}
                {getStatus() === 'error' && 'Recovery failed'}
            </Wrapper.StepHeading>
            <Wrapper.StepBody>
                {props.modal && props.modal}

                {!props.modal && (
                    <>
                        {getStatus() === null && (
                            <>
                                <Text>
                                    <Translation {...messages.TR_RECOVER_SUBHEADING} />
                                </Text>
                                <Wrapper.Options>
                                    <Option
                                        isSelected={recovery.wordsCount === 12}
                                        onClick={() => {
                                            recoveryActions.setWordsCount(12);
                                        }}
                                    >
                                        <P>
                                            <Translation
                                                {...messages.TR_WORDS}
                                                values={{ count: '12' }}
                                            />
                                        </P>
                                    </Option>
                                    <Option
                                        isSelected={recovery.wordsCount === 18}
                                        onClick={() => {
                                            recoveryActions.setWordsCount(18);
                                        }}
                                    >
                                        <P>
                                            <Translation
                                                {...messages.TR_WORDS}
                                                values={{ count: '18' }}
                                            />
                                        </P>
                                    </Option>
                                    <Option
                                        isSelected={recovery.wordsCount === 24}
                                        onClick={() => {
                                            recoveryActions.setWordsCount(24);
                                        }}
                                    >
                                        <P>
                                            <Translation
                                                {...messages.TR_WORDS}
                                                values={{ count: '24' }}
                                            />
                                        </P>
                                    </Option>
                                </Wrapper.Options>

                                <Wrapper.Controls>
                                    <OnboardingButton.Cta
                                        isDisabled={recovery.wordsCount === null}
                                        onClick={() => {
                                            setStatus('select-advanced-recovery');
                                        }}
                                    >
                                        <Translation {...messages.TR_CONTINUE} />
                                    </OnboardingButton.Cta>
                                </Wrapper.Controls>
                            </>
                        )}
                        {getStatus() === 'select-advanced-recovery' && (
                            <>
                                <Text>
                                    <Translation
                                        {...messages.TR_RECOVERY_TYPES_DESCRIPTION}
                                        values={{
                                            TR_LEARN_MORE_LINK: (
                                                <Link href={RECOVERY_MODEL_ONE_URL}>
                                                    <Translation {...messages.TR_LEARN_MORE_LINK} />
                                                </Link>
                                            ),
                                        }}
                                    />
                                </Text>
                                <Wrapper.Options>
                                    <Option
                                        isSelected={recovery.advancedRecovery === false}
                                        onClick={() => {
                                            recoveryActions.setAdvancedRecovery(false);
                                        }}
                                    >
                                        <P>
                                            <Translation {...messages.TR_BASIC_RECOVERY_OPTION} />
                                        </P>
                                    </Option>
                                    <Option
                                        isSelected={recovery.advancedRecovery === true}
                                        onClick={() => {
                                            recoveryActions.setAdvancedRecovery(true);
                                        }}
                                    >
                                        <P>
                                            <Translation
                                                {...messages.TR_ADVANCED_RECOVERY_OPTION}
                                            />
                                        </P>
                                    </Option>
                                </Wrapper.Options>

                                <Wrapper.Controls>
                                    <OnboardingButton.Cta
                                        onClick={() => {
                                            recoveryActions.recoverDevice();
                                        }}
                                    >
                                        <Translation {...messages.TR_START_RECOVERY} />
                                    </OnboardingButton.Cta>

                                    <OnboardingButton.Alt
                                        onClick={() => {
                                            setStatus(null);
                                        }}
                                    >
                                        <Translation {...messages.TR_BACK} />
                                    </OnboardingButton.Alt>
                                </Wrapper.Controls>
                            </>
                        )}
                        {getStatus() === 'success' && (
                            <Wrapper.Controls>
                                <OnboardingButton.Cta
                                    onClick={() => onboardingActions.goToNextStep()}
                                >
                                    Continue
                                </OnboardingButton.Cta>
                            </Wrapper.Controls>
                        )}
                        {getStatus() === 'error' && (
                            <>
                                <Text>
                                    {/* TODO: device disconnected error is returned as string, other connect errors are objects */}
                                    <Translation
                                        {...messages.TR_RECOVERY_ERROR}
                                        values={{
                                            error:
                                                typeof deviceCall.error === 'string'
                                                    ? deviceCall.error
                                                    : '',
                                        }}
                                    />
                                </Text>
                                <OnboardingButton.Cta
                                    onClick={() => {
                                        props.connectActions.resetCall();
                                        setStatus(null);
                                    }}
                                >
                                    <Translation {...messages.TR_RETRY} />
                                </OnboardingButton.Cta>
                            </>
                        )}
                    </>
                )}
            </Wrapper.StepBody>

            <Wrapper.StepFooter>
                {getStatus() == null && (
                    <OnboardingButton.Back
                        onClick={() => props.onboardingActions.goToPreviousStep()}
                    >
                        Back
                    </OnboardingButton.Back>
                )}
            </Wrapper.StepFooter>
        </Wrapper.Step>
    );
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(RecoveryStepModelOne));
