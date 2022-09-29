import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageTable } from '.';

function createData(
  id: number,
  lastname: string,
  firstname: string,
  mrn: string,
  gender: string,
  birthdate: string,
  email: string,
  phoneNumber: string,
  active: string,
  organization: string,
  futureApptCount: number,
  pathwaysCount: number
) {
  return {
    id,
    lastname,
    firstname,
    mrn,
    gender,
    birthdate,
    email,
    phoneNumber,
    active,
    organization,
    futureApptCount,
    pathwaysCount,
  };
}

const rows = [
  createData(
    1,
    'Doe',
    'John',
    '2564758478679',
    'M',
    '08/17/2006',
    'john.doe@mobilesmith.com',
    '99999999999',
    'active',
    'none',
    0,
    0
  ),
  createData(
    2,
    'Doe',
    'Jane',
    '1234567g',
    'F',
    '04/26/2019',
    'jane.doe@mobilesmith.com',
    '8888888888',
    'active',
    'none',
    0,
    0
  ),
  createData(
    3,
    'Doe',
    'John',
    '2564758478679',
    'M',
    '08/17/2006',
    'john.doe@mobilesmith.com',
    '99999999999',
    'active',
    'none',
    0,
    0
  ),
  createData(
    4,
    'Doe',
    'Jane',
    '1234567g',
    'F',
    '04/26/2019',
    'jane.doe@mobilesmith.com',
    '8888888888',
    'active',
    'none',
    0,
    0
  ),
  createData(
    5,
    'Doe',
    'John',
    '2564758478679',
    'M',
    '08/17/2006',
    'john.doe@mobilesmith.com',
    '99999999999',
    'active',
    'none',
    0,
    0
  ),
  createData(
    6,
    'Doe',
    'Jane',
    '1234567g',
    'F',
    '04/26/2019',
    'jane.doe@mobilesmith.com',
    '8888888888',
    'active',
    'none',
    0,
    0
  ),
  createData(
    7,
    'Doe',
    'John',
    '2564758478679',
    'M',
    '08/17/2006',
    'john.doe@mobilesmith.com',
    '99999999999',
    'active',
    'none',
    0,
    0
  ),
  createData(
    8,
    'Doe',
    'Jane',
    '1234567g',
    'F',
    '04/26/2019',
    'jane.doe@mobilesmith.com',
    '8888888888',
    'active',
    'none',
    0,
    0
  ),
];

export default {
  title: 'components/PageTable',
  component: PageTable,
} as ComponentMeta<typeof PageTable>;

const Template: ComponentStory<typeof PageTable> = (args) => <PageTable {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  idField: 'id',
  rows,
  columns: [
    {
      id: 'gender',
      label: 'Gender',
      align: 'right',
      width: 60,
    },
    {
      id: 'birthdate',
      label: 'Birthdate',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'phoneNumber',
      label: 'Mobile Phone Number',
    },
    {
      id: 'active',
      label: 'Active',
    },
    {
      id: 'organization',
      label: 'Organizations & Providers',
      ellipsis: true,
    },
  ],
  hasCheckbox: true,
  leftStickyColumns: [
    {
      id: 'lastname',
      label: 'Last Name',
    },
    {
      id: 'firstname',
      label: 'First Name',
    },
    {
      id: 'mrn',
      label: 'MRN',
    },
  ],
  rightStickyColumns: [
    {
      id: 'futureApptCount',
      label: 'Future Appt Placeholders',
    },
    {
      id: 'pathwaysCount',
      label: 'Pathways',
    },
  ],
};
