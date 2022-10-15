import {render, fireEvent} from '@testing-library/react';
import {UsersComponent} from '.';
import React from 'react';

it('calls onClick on change language', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<UsersComponent toggleLanguage={onClick} />);
    const button = getByTestId(/change language/i);
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
});
