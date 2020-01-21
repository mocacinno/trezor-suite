/* eslint-disable react-hooks/exhaustive-deps */
import messages from '@suite/support/messages';
import { colors, Icon } from '@trezor/components-v2';
import { Content, LayoutAccount } from '@wallet-components';
import AccountName from '@wallet-components/AccountName';
import { Output } from '@wallet-types/sendForm';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import Add from './components/Add/Container';
import Address from './components/Address';
import AdditionalForm from './components/AdvancedForm';
import Amount from './components/Amount';
import ButtonToggleAdditional from './components/ButtonToggleAdditional';
import Clear from './components/Clear';
import SendButtonSection from './components/SendButtonSection/Container';
import { Props } from './Container';

const Row = styled.div`
    display: flex;
    flex-direction: ${(props: { isColumn?: boolean }) => (props.isColumn ? 'column' : 'row')};
    padding: 0 0 30px 0;

    &:last-child {
        padding: 0;
    }
`;

const SlimRow = styled.div`
    display: flex;
    justify-content: flex-end;
    min-height: 10px;
    align-items: flex-end;

    ${(props: { isOnlyOne: boolean }) =>
        props.isOnlyOne &&
        css`
            display: none;
        `}
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
`;

const OutputWrapper = styled.div`
    padding: 23px 40px 60px 40px;
    border-radius: 6px;
    background: ${colors.BLACK96};
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const AdditionalInfoWrapper = styled.div`
    margin-top: 20px;
`;

const AdditionalFormHeader = styled.div`
    padding: 5px 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const Send = ({
    device,
    devices,
    send,
    fees,
    fiat,
    openModal,
    selectedAccount,
    sendFormActions,
    sendFormActionsBitcoin,
    accounts,
}: Props) => {
    useEffect(() => {
        sendFormActions.init();
    }, [selectedAccount]);

    if (!device || !send || !fees || selectedAccount.status !== 'loaded') {
        const { loader, exceptionPage } = selectedAccount;
        return (
            <LayoutAccount title="Send">
                <Content loader={loader} exceptionPage={exceptionPage} isLoading />
            </LayoutAccount>
        );
    }

    const { account, network } = selectedAccount;
    const accountNameMessage =
        account.networkType === 'ethereum'
            ? messages.TR_SEND_NETWORK_AND_TOKENS
            : messages.TR_SEND_NETWORK;

    return (
        <LayoutAccount title="Send">
            <AccountName account={account} message={accountNameMessage} />
            {send.outputs.map((output: Output) => (
                <OutputWrapper key={output.id}>
                    {output.id === 0 && <Clear sendFormActions={sendFormActions} />}
                    {output.id !== 0 && (
                        <SlimRow isOnlyOne={send.outputs.length === 1}>
                            <StyledIcon
                                onClick={() => sendFormActionsBitcoin.removeRecipient(output.id)}
                                size={10}
                                color={colors.BLACK50}
                                icon="CROSS"
                            />
                        </SlimRow>
                    )}
                    <Row>
                        <Address
                            accounts={accounts}
                            devices={devices}
                            networkType={account.networkType}
                            outputId={output.id}
                            address={output.address.value}
                            error={output.address.error}
                            sendFormActions={sendFormActions}
                            openModal={openModal}
                        />
                    </Row>
                    <Row>
                        <Amount
                            outputId={output.id}
                            amount={output.amount.value}
                            canSetMax={(output.amount.value || 0) >= account.availableBalance}
                            symbol={account.symbol}
                            error={output.amount.error}
                            fiatValue={output.fiatValue.value}
                            fiat={fiat}
                            decimals={network.decimals}
                            localCurrency={output.localCurrency.value}
                            sendFormActions={sendFormActions}
                        />
                    </Row>
                </OutputWrapper>
            ))}
            <AdditionalInfoWrapper>
                <Row isColumn={send.isAdditionalFormVisible}>
                    <AdditionalFormHeader>
                        <ButtonToggleAdditional
                            isActive={send.isAdditionalFormVisible}
                            sendFormActions={sendFormActions}
                        />
                        <Add />
                    </AdditionalFormHeader>
                    {send.isAdditionalFormVisible && (
                        <AdditionalForm networkType={network.networkType} />
                    )}
                </Row>
            </AdditionalInfoWrapper>
            <SendButtonSection />
        </LayoutAccount>
    );
};

export default Send;
