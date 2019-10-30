import React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

interface Props {
    message: MessageDescriptor;
    values?: {
        [key: string]: string | number | React.ReactElement | MessageDescriptor;
    };
}

/**
 * Util component that helps with rendering react-intl messages.
 */
const Intl = ({ message, values }: Props) => {
    return <FormattedMessage {...message} values={values} />;
};

export { Intl as Translation };
