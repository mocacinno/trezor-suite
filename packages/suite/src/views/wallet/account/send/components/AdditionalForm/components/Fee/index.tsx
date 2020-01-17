import { Translation } from '@suite-components/Translation';
import messages from '@suite/support/messages';
import { colors, P, Select, Icon } from '@trezor/components-v2';
import { Account } from '@wallet-types';
import { FeeLevel } from '@wallet-types/sendForm';
import { formatNetworkAmount } from '@wallet-utils/accountUtils';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
// @ts-ignore
import ethUnits from 'ethereumjs-units';
import CustomFee from './components/CustomFee';

import { DispatchProps } from '../../../../Container';
import { CUSTOM_FEE } from '@suite/constants/wallet/sendForm';

const Row = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
    display: flex;
    padding-left: 5px;
    height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const Top = styled.div`
    padding: 10px 0;
    display: flex;
    width: 100%;
`;

const Column = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`;

const LabelColumn = styled(Column)`
    color: ${colors.BLACK0};
`;

const RefreshColumn = styled(Column)`
    color: ${colors.BLACK0};
    justify-content: center;
`;

const RefreshText = styled.div`
    padding-left: 5px;
    cursor: pointer;
`;

const HelpColumn = styled(Column)`
    color: ${colors.BLACK0};
    justify-content: flex-end;
`;

const OptionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OptionValue = styled(P)`
    min-width: 70px;
    margin-right: 5px;
`;

const OptionLabel = styled(P)`
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    word-break: break-all;
`;

const StyledSelect = styled(Select)``;

const CustomFeeWrapper = styled.div`
    margin-top: 10px;
`;

interface Props extends WrappedComponentProps {
    feeLevels: FeeLevel[];
    selectedFee: FeeLevel;
    symbol: Account['symbol'];
    networkType: Account['networkType'];
    onChange: DispatchProps['sendFormActions']['handleFeeValueChange'];
}

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const getValue = (
    networkType: Account['networkType'],
    value: string,
    symbol: Account['symbol'],
    label: string,
) => {
    if (networkType === 'bitcoin') {
        return `${value} sat/B`;
    }

    // fee for eth is calculated in actions
    if (networkType === 'ethereum' && label === CUSTOM_FEE) {
        return `${value} ${symbol.toUpperCase()}`;
    }

    return `${formatNetworkAmount(value, symbol)} ${symbol.toUpperCase()}`;
};

const FeeComponent = (props: Props) => (
    <Wrapper>
        <Row>
            <Top>
                <LabelColumn>
                    <Translation {...messages.TR_FEE} />
                </LabelColumn>
                <RefreshColumn>
                    <StyledIcon icon="REFRESH" color={colors.BLACK0} size={12} />
                    <RefreshText>Refresh</RefreshText>
                </RefreshColumn>
                <HelpColumn>
                    <StyledIcon icon="QUESTION" color={colors.BLACK0} size={12} />
                </HelpColumn>
            </Top>
            <StyledSelect
                display="block"
                isSearchable={false}
                isClearable={false}
                value={props.selectedFee}
                onChange={props.onChange}
                options={props.feeLevels}
                formatOptionLabel={(option: FeeLevel) => {
                    return (
                        <OptionWrapper>
                            <OptionLabel>{capitalize(option.label)}</OptionLabel>
                            {option.value !== '0' && (
                                <OptionValue>
                                    {getValue(
                                        props.networkType,
                                        option.value,
                                        props.symbol,
                                        option.label,
                                    )}
                                </OptionValue>
                            )}
                        </OptionWrapper>
                    );
                }}
            />
        </Row>
        {props.networkType !== 'ethereum' && (
            <Row>
                <CustomFeeWrapper>
                    <CustomFee symbol={props.symbol} networkType={props.networkType} />
                </CustomFeeWrapper>
            </Row>
        )}
    </Wrapper>
);

export default injectIntl(FeeComponent);
