import React from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';

const color = randomColor({ luminosity: 'light' });

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    height: 100%;
    flex-wrap: wrap;
`;

interface StoryWrapperProps {
    children: any;
}

const StoryWrapper = ({ children }: StoryWrapperProps) => <Wrapper>{children}</Wrapper>;

interface StoryColumnProps {
    children: any;
    maxWidth?: number;
    minWidth?: number;
}

const Col = styled.div<StoryColumnProps>`
    padding: 10px;
    flex: 1;
    border-radius: 10px;
    border: 1px dashed ${color};
    margin: 5px;
    min-width: ${props => props.minWidth}px;
    max-width: ${props => props.minWidth}px;

    > * {
        margin-bottom: 20px;
    }
`;

const StoryColumn = ({ minWidth, maxWidth, children }: StoryColumnProps) => (
    <Col minWidth={minWidth || 200} maxWidth={maxWidth || 200}>
        {children}
    </Col>
);

export { StoryWrapper, StoryColumn };
