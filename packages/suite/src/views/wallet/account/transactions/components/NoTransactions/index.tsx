import React from 'react';
import styled from 'styled-components';
import { colors, variables, H2, Button } from '@trezor/components-v2';
import { Account } from '@wallet-types';
import PricePanel from '../PricePanel';
import { resolveStaticPath } from '@suite-utils/nextjs';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 520px;
`;

const Title = styled(H2)`
    display: flex;
    text-align: center;
    color: #000000;
`;

const Description = styled.div`
    display: flex;
    font-size: ${variables.FONT_SIZE.TINY};
    text-align: center;
    color: ${colors.BLACK50};
    margin-bottom: 10px;
`;

const Image = styled.img`
    width: 340px;
    height: 280px;
    margin-bottom: 40px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ActionButton = styled(Button)`
    min-width: 160px;
`;

interface Props {
    account: Account;
}

const NoTransactions = (props: Props) => {
    return (
        <Wrapper>
            <PricePanel account={props.account} />
            <Content>
                <Title>The account is empty</Title>
                <Description>
                    Once you send or receive your first transaction it will show up here. Until
                    then, wanna buy some crypto? Click the button below to begin your shopping
                    spree!
                </Description>
                <Image src={resolveStaticPath(`images/wallet/wallet-empty.svg`)} />
                <Actions>
                    <ActionButton variant="secondary">Receive BTC</ActionButton>
                    <ActionButton variant="primary">Buy BTC</ActionButton>
                </Actions>
            </Content>
        </Wrapper>
    );
};

export default NoTransactions;
