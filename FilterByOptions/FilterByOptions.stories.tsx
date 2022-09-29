import React from 'react';
import logger from 'loglevel';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FilterByOptions } from '.';

export default {
  title: 'components/FilterByOptions',
  component: FilterByOptions,
} as ComponentMeta<typeof FilterByOptions>;

const Template: ComponentStory<typeof FilterByOptions> = (args) => <FilterByOptions {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  attributeName: 'status',
  anchorText: 'Status',
  dialogHeaderText: 'Select status',
  options: [
    { id: 'active', display: 'Active' },
    { id: 'inactive', display: 'Inactive' },
  ],
  onApply: () => logger.debug('applying'),
};
