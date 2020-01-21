import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sendFormActions from '@wallet-actions/sendFormActions';
import * as sendFormActionsRipple from '@wallet-actions/sendFormSpecific/rippleActions';

import { AppState, Dispatch } from '@suite-types';
import AdditionalFormXrp from './index';

const mapStateToProps = (state: AppState) => ({
    account: state.wallet.selectedAccount.account,
    send: state.wallet.send,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    sendFormActions: bindActionCreators(sendFormActions, dispatch),
    sendFormActionsRipple: bindActionCreators(sendFormActionsRipple, dispatch),
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export type Props = StateProps & DispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalFormXrp);
