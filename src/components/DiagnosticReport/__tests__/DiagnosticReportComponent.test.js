import React from 'react';
import { shallow } from 'enzyme';
import TableContainer from '@material-ui/core/TableContainer';
import DiagnosticReportComponent from '../DiagnosticReportComponent';

describe('DiagnosticReportComponent', () => {
  const mockData = [
    {
      resourceType: 'DiagnosticReport',
      status: 'final',
      code: {
        text: 'Surgical Pathology Report',
      },
      subject: {
        display: 'Shriya',
      },
      effectiveDateTime: '2019-11-03T00:00:00+00:00',
      issued: '2019-11-05T00:00:00+00:00',
      presentedForm: [
        {
          contentType: 'application/pdf',
          url: '/attachments/58d5e603-c994-4969-8199-95f7e0b0b738.pdf',
          title: 'BILATERAL DIGITAL MAMMOGRAPHY and 3D TOMOSYNTHESIS',
        },
      ],
      performer: [
        {
          display: 'text',
        },
      ],
    },
  ];
  global.BACKEND_BASE_URL = 'http://localhost:3000/';
  global.BACKEND_API_PATH = 'hiu-api';
  const wrapper = shallow(
    <DiagnosticReportComponent
      data={mockData}
      consentReqId="123"
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show report details list with correct data', () => {
    expect(wrapper.find('.report-details-list li').at(0).text()).toEqual('Date: 3/11/2019');
    expect(wrapper.find('.report-details-list li').at(1).text()).toEqual('Status: final');
    expect(wrapper.find('.report-details-list li').at(2).text()).toEqual('Performer: text');
  });

  it('should show date as - and performer as blank if data is not available', () => {
    mockData[0].effectiveDateTime = null;
    mockData[0].performer = [];
    wrapper.setProps({ data: mockData });
    expect(wrapper.find('.report-details-list li').at(0).text()).toEqual('Date: -');
    expect(wrapper.find('.report-details-list li').at(2).text()).toEqual('Performer: ');
  });

  it('should Link text if title is not available of performer', () => {
    mockData[0].presentedForm[0].title = null;
    wrapper.setProps({ data: mockData });
    expect(wrapper.find('a').at(0).text()).toEqual('Link');
  });

  it('should show empty object if data is undefined', () => {
    wrapper.setProps({ data: undefined });
    expect(wrapper.find(TableContainer).exists()).toEqual(false);
  });
});
