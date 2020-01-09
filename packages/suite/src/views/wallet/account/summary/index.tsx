import React from 'react';
import Content from '@wallet-components/Content';
import LayoutAccount from '@wallet-components/LayoutAccount';
import AccountHeader from './components/AccountHeader';
import Tokens from './components/Tokens';
import { Props } from './Container';

const AccountSummary = (props: Props) => {
    if (props.wallet.selectedAccount.status !== 'loaded') {
        const { loader, exceptionPage } = props.wallet.selectedAccount;
        return (
            <LayoutAccount title="Summary">
                <Content loader={loader} exceptionPage={exceptionPage} isLoading />
            </LayoutAccount>
        );
    }
    const { account, network } = props.wallet.selectedAccount;

    return (
        <LayoutAccount title="Summary">
            <AccountHeader
                account={account}
                network={network}
                fiatRates={props.fiat}
                localCurrency={props.wallet.settings.localCurrency}
                isHidden={props.wallet.settings.discreetMode}
            />
            {account.networkType === 'ethereum' && (
                <Tokens
                    tokens={account.tokens || []}
                    discreetMode={props.wallet.settings.discreetMode}
                />
            )}
        </LayoutAccount>
    );
};

export default AccountSummary;
