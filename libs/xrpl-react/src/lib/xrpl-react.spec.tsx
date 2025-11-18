import { render } from '@testing-library/react';

import XrplReact from './xrpl-react';

describe('XrplReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<XrplReact />);
    expect(baseElement).toBeTruthy();
  });
});
