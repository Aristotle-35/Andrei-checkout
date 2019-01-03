import React from 'react';
import Time from './Time.jsx';
import {mount} from 'enzyme';

test('Time component calls doneChange when item is clicked', () => {
    const doneChange = jest.fn();
    const item = '7:00 AM';
    const wrapper = mount (
        <Time item={item} doneChange={doneChange} />
    );
    const p = wrapper.find('.dd-list-item');
    p.simulate('click');
    expect(doneChange).toBeCalledWith('7:00 AM');
});
